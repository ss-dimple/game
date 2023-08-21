import { Provide, Inject } from '@midwayjs/decorator';
import { BaseService } from '../base';
import { Utils } from '../../common/utils';

@Provide()
export class AdminVerifyService extends BaseService {
  @Inject()
  utils: Utils;

  async getAdminLoginSign(username: string, password: string): Promise<string> {
    const user = await this.prisma.admin_info.findFirst({
      where: {
        nick_name: username,
        status: 1,
      },
    });
    if (user) {
      const comparePassword = this.utils.getMd5Password(password, user!.salt);
      console.log(comparePassword, '密码');
      if (user!.password !== comparePassword) {
        return null;
      }
      const jwtSign = this.utils.jwtSign(
        {
          uid: user!.id,
          pv: 1,
        },
        {
          expiresIn: '6h',
        },
      );
      //Redis
      await this.getAdminRedis().set(`admin:passwordVersion:${user!.id}`, 1);
      await this.getAdminRedis().set(`admin:token:${user!.id}`, jwtSign);

      return 'Bearer ' + jwtSign;
    } else {
      return null;
    }
  }

  async clearLoginStatus(uid: number): Promise<void> {
    await this.getAdminRedis().del(`admin:passwordVersion:${uid}`);
    await this.getAdminRedis().del(`admin:token:${uid}`);
  }

  async getRedisPasswordVersionById(id: number): Promise<string> {
    return this.getAdminRedis().get(`admin:passwordVersion:${id}`);
  }

  async getRedisTokenById(id: number): Promise<string> {
    return this.getAdminRedis().get(`admin:token:${id}`);
  }
}
