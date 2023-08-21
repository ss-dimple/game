import { Inject, Post, Provide, Controller, Body, ALL } from '@midwayjs/decorator';
// import { Validate } from '@midwayjs/validate';
import { BaseController, USER_PREFIX_URL, NOAUTH_PREFIX_URL } from '../base';
import { UserVerifyService } from '../../service/user/user.verify.service';
import { UserManageService } from '../../service/user/user.manage.service';
import { LoginInfoDto } from '../../dto/user/login';
import { ResOp } from '../../interface';
import { res } from '../../common/utils';

@Provide()
@Controller(`${USER_PREFIX_URL}${NOAUTH_PREFIX_URL}/`)
export class UserLoginController extends BaseController {
  @Inject()
  userVerifyService: UserVerifyService;

  @Inject()
  userManageService: UserManageService;

  @Post('/login')
  // @Validate()
  async login(@Body(ALL) loginInfo: LoginInfoDto): Promise<ResOp> {
    console.log(loginInfo, '登录信息');
    const userInfo = await this.userManageService.getUserManageByUsername(loginInfo.username);
    console.log(userInfo, 'userInfo');
    if (userInfo) {
      // if (userInfo.status === 0) {
      //   return res({ code: 10004 });
      // } else {
      const sign = await this.userVerifyService.getUserLoginSign(loginInfo.username, loginInfo.password);
      console.log(sign, 'sign');
      if (sign) {
        return res({
          data: {
            token: sign,
          },
        });
      }
      // }
    }
    return res({ code: 10003 });
  }

  @Post('/getEmailCode')
  async getEmailCode(@Body(ALL) emailInfo): Promise<ResOp> {
    console.log(emailInfo, '邮箱姓名');
    const code = await this.userVerifyService.getEmailCode(emailInfo);
    console.log(code);
    if (code) {
      return res({
        data: {
          code: '200',
        },
      });
    } else {
      return res({ code: 10017 });
    }
  }

  @Post('/register')
  async register(@Body(ALL) registerInfo): Promise<ResOp> {
    // console.log(registerInfo, 'registerInfo');
    const result = await this.userVerifyService.register(registerInfo);
    console.log(result, 'result');
    return res({ code: 10018 });
  }
}
