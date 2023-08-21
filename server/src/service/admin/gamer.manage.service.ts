import { Provide, Inject } from '@midwayjs/decorator';
import { BaseService } from '../base';
import { IPageSearchGamerResult } from './admin.interface';
import { PageGamerUserDto, UpdateGamerStatusDto } from '../../dto/admin/gamer';
import { Utils } from '../../common/utils';
import { Validate } from '@midwayjs/validate';

@Provide()
export class GamerManageService extends BaseService {
  @Inject()
  utils: Utils;

  async getGamerBySearchInfo(dto: PageGamerUserDto): Promise<IPageSearchGamerResult[]> {
    const whereObj: any = {};
    dto.name &&
      Object.assign(whereObj, {
        name: {
          contains: dto.name,
        },
      });
    dto.username &&
      Object.assign(whereObj, {
        nick_name: {
          contains: dto.username,
        },
      });
    dto.sex &&
      Object.assign(whereObj, {
        sex: dto.sex,
      });
    dto.phone &&
      Object.assign(whereObj, {
        phone: {
          contains: dto.phone,
        },
      });
    dto.company &&
      Object.assign(whereObj, {
        company: {
          contains: dto.company,
        },
      });
    Object.assign(whereObj, {
      status: dto.status,
    });
    const result = await this.prisma.user_info.findMany({
      skip: (dto.page - 1) * dto.limit,
      take: dto.limit,
      where: whereObj,
    });
    const gamers: IPageSearchGamerResult[] = [];
    result.forEach((ele) => {
      gamers.push({
        id: ele.id,
        name: ele.name,
        sex: ele.sex,
        username: ele.nick_name,
        phone: ele.phone,
        status: ele.status,
        company: ele.company,
      });
    });
    return gamers;
  }
  async getGamerSearchCount(dto: PageGamerUserDto): Promise<number> {
    const whereObj: any = {};
    dto.name &&
      Object.assign(whereObj, {
        name: {
          contains: dto.name,
        },
      });
    dto.username &&
      Object.assign(whereObj, {
        nick_name: {
          contains: dto.username,
        },
      });
    dto.sex &&
      Object.assign(whereObj, {
        sex: dto.sex,
      });
    dto.phone &&
      Object.assign(whereObj, {
        phone: {
          contains: dto.phone,
        },
      });
    dto.company &&
      Object.assign(whereObj, {
        company: {
          contains: dto.company,
        },
      });

    Object.assign(whereObj, {
      status: dto.status,
    });
    return await this.prisma.user_info.count({
      where: whereObj,
    });
  }

  @Validate()
  async updateGamerStatus(dto: UpdateGamerStatusDto): Promise<void> {
    await this.prisma.user_info.update({
      where: {
        id: dto.id,
      },
      data: {
        status: dto.status,
      },
    });
  }

  async defaultGamerPasswod(id: number): Promise<boolean> {
    const salt = this.utils.generateUUID();
    const password = this.utils.getMd5Password('123456', salt);

    const ruslt = await this.prisma.user_info.update({
      where: {
        id: id,
      },
      data: {
        salt: salt,
        password: password,
      },
    });

    if (ruslt) {
      return true;
    }
    return false;
  }
}
