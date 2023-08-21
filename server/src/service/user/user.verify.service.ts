import { Provide, Inject } from '@midwayjs/decorator';
import { BaseService } from '../base';
import { Utils } from '../../common/utils';
// import nodemailer from 'nodemailer';
// import nodeMailer from 'nodemailer';
import { randomSixCode } from '../../common/utils';

@Provide()
export class UserVerifyService extends BaseService {
  @Inject()
  utils: Utils;

  async getUserLoginSign(username: string, password: string): Promise<string> {
    const user = await this.prisma.user.findFirst({
      where: {
        username: username,
        // status: 1,
      },
    });
    if (user) {
      const comparePassword = this.utils.getMd5Password(password, user!.salt);
      console.log(comparePassword, 'comparePassword');
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
      await this.getUserRedis().set(`user:passwordVersion:${user!.id}`, 1);
      await this.getUserRedis().set(`user:token:${user!.id}`, jwtSign);

      return 'Bearer ' + jwtSign;
    } else {
      return null;
    }
  }

  async getEmailCode(emailInfo: any): Promise<string> {
    console.log('lai service');
    //获取随机6位数
    const sixCode = randomSixCode();
    console.log(sixCode, 'sixcode');
    //SMTP客户端配置
    const config = {
      host: 'smtp.qq.com',
      post: 465, //端口
      auth: {
        user: '2571627530@qq.com', // 邮箱账号
        pass: 'hoycgigqtzqrebia',
      },
    };
    //创建一个SMTP客户端对象
    // eslint-disable-next-line node/no-unpublished-require
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport(config);
    console.log(transporter, 'transporter');
    console.log(emailInfo[1], 'emailInfo.email');
    //创建收件人
    const mail = {
      from: '2571627530<2571627530@qq.com>',
      subject: '验证码',
      text:
        '亲爱的用户：\n' +
        '您此次的验证码为：\n\n' +
        sixCode +
        '\n\n' +
        '此验证码5分钟内有效，请立即进行下一步操作。 如非你本人操作，请忽略此邮件。\n' +
        '感谢您的使用！',
      to: emailInfo[1],
    };
    const result = transporter.sendMail(mail);
    await this.getUserRedis().set(`user:sixCode:${emailInfo[0]}`, sixCode);
    // const redisCode = await this.getUserRedis().get(`user:sixCode:${emailInfo[0]}`);
    // console.log(redisCode, 'redisCode');
    console.log(result);
    if (result) {
      const code = '200';
      return code;
    }
  }

  async getUserByUsername(username: string) {
    const result = await this.prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    return result;
  }

  async register(registerInfo: any): Promise<string> {
    console.log(registerInfo, 'register');
    const username: string = registerInfo.username;
    const existUser = await this.getUserByUsername(username);
    if (existUser) {
      const msg = '用户已注册';
      return msg;
    }
    // console.log('验证码验证');
    const redisCode = await this.getUserRedis().get(`user:sixCode:${username}`);
    console.log(redisCode, 'redisCode');
    console.log(registerInfo.code);
    if (redisCode === registerInfo.code) {
      console.log('验证码正确');
      //密码加密
      const salt = this.utils.generateUUID();
      const password = this.utils.getMd5Password(registerInfo.password, salt);
      const addRuslt = await this.prisma.user.create({
        data: {
          username: registerInfo.username,
          password: password,
          sex: registerInfo.sex,
          salt: salt,
          // email: registerInfo.email,
        },
      });
      await this.getUserRedis().del(`user:sixCode:${username}`);
      if (addRuslt) {
        console.log('注册成功');
      }
    } else {
      return null;
    }
  }

  async clearLoginStatus(uid: number): Promise<void> {
    await this.getUserRedis().del(`user:passwordVersion:${uid}`);
    await this.getUserRedis().del(`user:token:${uid}`);
  }

  async getRedisPasswordVersionById(id: number): Promise<string> {
    return this.getUserRedis().get(`user:passwordVersion:${id}`);
  }

  async getRedisTokenById(id: number): Promise<string> {
    return this.getUserRedis().get(`user:token:${id}`);
  }
}
