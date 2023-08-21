import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';
// import { uploadWhiteList } from '@midwayjs/upload';
import { join } from 'path';

export default (appInfo: MidwayAppInfo): MidwayConfig => {
  return {
    // use for cookie sign key, should change to your own and keep security
    keys: '1672467069450_1111',
    koa: {
      port: 7001,
      globalPrefix: '/api',
    },
    prisma: { url: 'mysql://root:123456@localhost:3306/sail' },
    // jwt 密钥
    jwt: {
      secret: 'mYserverUser230966Checked',
    },
    redis: {
      clients: {
        admin: {
          host: '127.0.0.1',
          port: 6379,
          password: '123456',
          db: 0,
        },
        gamer: {
          host: '127.0.0.1',
          port: 6379,
          password: '123456',
          db: 1,
        },
        user: {
          host: '127.0.0.1',
          port: 6379,
          password: '123456',
          db: 2,
        },
      },
    },
    cors: {
      allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'], //默认跨域的方法
      exposeHeaders: ['www-Authenticate', 'Server-Authorization'],
      credentials: true,
      origin: (req) => {
        const whiteList = ['http://127.0.0.1:8080'];
        // console.log('origin', req.headers.origin);
        if (req.headers.origin) {
          if (whiteList.includes(req.headers.origin)) {
            return req.headers.origin;
          }
          return 'http://localhost:8080';
        } else {
          return '*';
        }
      },
    },
    upload: {
      // mode: UploadMode, 默认为file，即上传到服务器临时目录，可以配置为 stream
      mode: 'file',
      // fileSize: string, 最大上传文件大小，默认为 10mb
      fileSize: '10mb',
      // whitelist: string[]，文件扩展名白名单uploadWhiteList,
      whitelist: ['.jpg', '.jpeg', '.png', '.pdf', '.zip'],
      // tmpdir: string，上传的文件临时存储路径
      tmpdir: join(appInfo.appDir, 'public'),
      // cleanTimeout: number，上传的文件在临时目录中多久之后自动删除，默认为 5 分钟
      cleanTimeout: 5 * 60 * 1000,
      // base64: boolean，设置原始body是否是base64格式，默认为false，一般用于腾讯云的兼容
      base64: false,
      // 仅在匹配路径到 /files/submitFile 的时候去解析 body 中的文件信息
      match: /\/files\/*/,
    },
    staticFile: {
      dirs: {
        default: {
          prefix: '/public/upload/',
          dir: join(appInfo.baseDir, '../public/upload'),
        },
      },
    },
  };
};
