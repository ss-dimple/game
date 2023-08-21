import { Config, Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { ResOp } from '../interface';
import ErrorConstants from './error_constants';
import * as CryptoJS from 'crypto-js';
import * as JsonWebToken from 'jsonwebtoken';
import { customAlphabet, nanoid } from 'nanoid';

export function res(op?: ResOp): ResOp {
  return {
    data: op?.data ?? null,
    code: op?.code ?? 200,
    message: op?.code ? getErrorMessageByCode(op!.code) || op?.message || 'unknown error' : op?.message || 'success',
  };
}

export function resByPage<V>(list: V, total: number, page: number, size: number): ResOp {
  return res({
    data: {
      list,
      pagination: {
        total,
        page,
        size,
      },
    },
  });
}

/**
 * 根据code获取错误信息
 */
export function getErrorMessageByCode(code: number): string {
  return ErrorConstants[code];
}

@Provide()
@Scope(ScopeEnum.Singleton)
export class Utils {
  @Config('jwt')
  jwt;

  getMd5Password(val: string, salt: string): string {
    return CryptoJS.MD5(CryptoJS.MD5(val) + salt).toString();
  }

  jwtSign(sign: any, options?: any): string {
    return JsonWebToken.sign(sign, this.jwt.secret, options);
  }

  jwtVerify(token: string, options?: any): any {
    return JsonWebToken.verify(token, this.jwt.secret, options);
  }

  /**
   * 生成一个UUID
   */
  generateUUID(): string {
    return nanoid();
  }

  /**
   * 生成一个随机的值
   */
  generateRandomValue(
    length: number,
    placeholder = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM',
  ): string {
    const customNanoid = customAlphabet(placeholder, length);
    return customNanoid();
  }
}

export function randomSixCode(): string {
  const arr = [];
  let sixCode = '';
  let count = 0;
  while (count < 6) {
    const n = Math.floor(Math.random() * 9 + 1).toString();
    if (arr.join().indexOf(n) === -1) {
      arr.push(n);
      count++;
    }
  }
  for (let index = 0; index < arr.length; index++) {
    sixCode = sixCode + arr[index];
  }
  return sixCode;
}
