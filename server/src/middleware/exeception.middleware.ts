import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';
import { ValidationError } from 'joi';
import { res } from '../common/utils';

@Middleware()
export class ExeceptionMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      try {
        await next();
      } catch (err) {
        console.log('错误:', err);
        ctx.set('Content-Type', 'application/json');
        // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
        const status = (err instanceof ValidationError ? 422 : err.status) || 500;
        const message = status === 500 && ctx.app.env === 'prod' ? '服务器好像出了点问题...稍后再试试' : err.message;
        ctx.status = status;
        ctx.body = res({ message, code: status });
      }
    };
  }
}
