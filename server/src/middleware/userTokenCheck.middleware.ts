import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';
import { USER_PREFIX_URL, NOAUTH_PREFIX_URL, VERIFY_PREFIX_URL } from '../controller/base';
import { ResOp } from '../interface';
import { res, Utils } from '../common/utils';
// import { AdminVerifyService } from '../service/admin/admin.verify.service';
import { UserVerifyService } from '../service/user/user.verify.service';

@Middleware()
export class UserTokenCheckMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const url = ctx.url;
      console.log('token check:', url);
      //startsWith() 方法用于检测字符串是否以指定的子字符串开始。如果是以指定的子字符串开头返回 true，否则 false。
      if (url.startsWith(`/api${USER_PREFIX_URL}`)) {
        if (url.startsWith(`/api${USER_PREFIX_URL}${NOAUTH_PREFIX_URL}/`)) {
          await next();
          return;
        }
        if (url.startsWith(`/api${USER_PREFIX_URL}${VERIFY_PREFIX_URL}/`)) {
          const { authorization = '' } = ctx.request.header;
          const token = authorization.replace('Bearer ', '');
          if (!token) {
            // 无法通过token校验
            this.reject(ctx, { code: 11001 });
            return;
          }
          const utils = await ctx.requestContext.getAsync(Utils);
          try {
            // ctx.state.admin = utils.jwtVerify(token);
            ctx.state.user = utils.jwtVerify(token);
            console.log(ctx.state.user, 'state');
          } catch (e) {
            this.reject(ctx, { code: 11001 });
            return;
          }

          if (!ctx.state.user) {
            this.reject(ctx, { code: 11001 });
            return;
          }

          const verifyService = await ctx.requestContext.getAsync(UserVerifyService);
          const pv = await verifyService.getRedisPasswordVersionById(ctx.state.user.uid);
          // console.log('new pv:', pv);
          // console.log('old pv:', ctx.state.admin.pv);
          if (pv !== `${ctx.state.user.pv}`) {
            // 密码版本不一致，登录期间已更改过密码
            this.reject(ctx, { code: 11002 });
            return;
          }

          const redisToken = await verifyService.getRedisTokenById(ctx.state.user.uid);
          if (token !== redisToken) {
            // 与redis保存不一致
            this.reject(ctx, { code: 11002 });
            return;
          }

          await next();
          return;
        }
      }
      // if (url.startsWith(`/api${ADMIN_PREFIX_URL}`)) {
      //   const { authorization = '' } = ctx.request.header;
      //   const token = authorization.replace('Bearer ', '');
      //   const utils = await ctx.requestContext.getAsync(Utils);
      //   ctx.state.admin = utils.jwtVerify(token);
      //   console.log(ctx.state.admin, 'state');
      //   await next();
      //   return;
      // }
      await next();
    };
  }

  reject(ctx: Context, op: ResOp): void {
    ctx.status = 200;
    ctx.body = res(op);
  }
}
