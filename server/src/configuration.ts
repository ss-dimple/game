import { Configuration, App, Config } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { UserTokenCheckMiddleware } from './middleware/userTokenCheck.middleware';
import { ExeceptionMiddleware } from './middleware/exeception.middleware';
import { PrismaClient } from '@prisma/client';
import { IMidwayContainer } from '@midwayjs/core';
import * as redis from '@midwayjs/redis';
import * as crossDomain from '@midwayjs/cross-domain';
import * as upload from '@midwayjs/upload';

@Configuration({
  imports: [
    koa,
    validate,
    crossDomain,
    redis,
    upload,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  @Config('prisma')
  private prismaConfig;

  public async onReady(container: IMidwayContainer): Promise<void> {
    this.registrPrisma(container);
    // add middleware
    this.app.useMiddleware([ReportMiddleware, UserTokenCheckMiddleware, ExeceptionMiddleware]);
    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);require('@koa/cors')()
  }

  public async onStop(container: IMidwayContainer): Promise<void> {
    const prisma = await container.getAsync<PrismaClient>('prisma');
    prisma.$disconnect();
  }

  private registrPrisma(container: IMidwayContainer) {
    const prisma = new PrismaClient({
      datasources: { db: { url: this.prismaConfig.url } },
    });
    prisma.$connect();
    container.registerObject('prisma', prisma);
  }
}
