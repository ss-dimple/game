import { Inject } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { Utils } from '../common/utils';

export const ADMIN_PREFIX_URL = '/admin';
export const GAMER_PREFIX_URL = '/gamer';
export const USER_PREFIX_URL = '/user';
export const GAME_PREFIX_URL = '/game';
export const FILES_PREFIX_URL = '/files';

// 需校验TOKEN的URL
export const VERIFY_PREFIX_URL = '/verify';
// 无需校验TOKEN的URL
export const NOAUTH_PREFIX_URL = '/public';

export class BaseController {
  @Inject()
  ctx: Context;

  @Inject()
  utils: Utils;
}
