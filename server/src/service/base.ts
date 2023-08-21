import { Inject } from '@midwayjs/decorator';
import { PrismaClient } from '@prisma/client';
import { RedisServiceFactory, RedisService } from '@midwayjs/redis';

export class BaseService {
  @Inject('prisma')
  prisma: PrismaClient;

  @Inject()
  redisServiceFactory: RedisServiceFactory;

  getAdminRedis(): RedisService {
    return this.redisServiceFactory.get('admin');
  }

  getUserRedis(): RedisService {
    return this.redisServiceFactory.get('user');
  }
}
