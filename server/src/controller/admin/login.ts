import { Inject, Post, Provide, Controller, Body, ALL } from '@midwayjs/decorator';
// import { Validate } from '@midwayjs/validate';
import { BaseController, ADMIN_PREFIX_URL, NOAUTH_PREFIX_URL } from '../base';
import { AdminVerifyService } from '../../service/admin/admin.verify.service';
import { AdminUserService } from '../../service/admin/admin.user.service';
import { LoginInfoDto } from '../../dto/admin/verify';
import { ResOp } from '../../interface';
import { res } from '../../common/utils';

@Provide()
@Controller(`${ADMIN_PREFIX_URL}${NOAUTH_PREFIX_URL}/`)
export class AdminLoginController extends BaseController {
  @Inject()
  adminVerifyService: AdminVerifyService;

  @Inject()
  adminUserService: AdminUserService;

  @Post('/login')
  // @Validate()
  async login(@Body(ALL) loginInfo: LoginInfoDto): Promise<ResOp> {
    console.log(loginInfo, '到后端了');
    const adminInfo = await this.adminUserService.getAdminUserByNickName(loginInfo.username);
    console.log(adminInfo, '找到用户信息了');
    if (adminInfo) {
      if (adminInfo.status === 0) {
        return res({ code: 10004 });
      } else {
        const sign = await this.adminVerifyService.getAdminLoginSign(loginInfo.username, loginInfo.password);
        if (sign) {
          return res({
            data: {
              token: sign,
            },
          });
        }
      }
    }
    return res({ code: 10003 });
  }
}
