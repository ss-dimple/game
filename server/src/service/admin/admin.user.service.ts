import { Provide, Inject } from '@midwayjs/decorator';
import { BaseService } from '../base';
import { IPageSearchAdminResult } from './admin.interface';
import {
  AddAdminDto,
  EditAdminDto,
  EditAdminSelfDto,
  AdminResetPasswordDto,
  PageAdminUserDto,
} from '../../dto/admin/user';
import { Utils } from '../../common/utils';
import { Validate } from '@midwayjs/validate';

@Provide()
export class AdminUserService extends BaseService {
  @Inject()
  utils: Utils;

  async getAdminBySearchInfo(dto: PageAdminUserDto): Promise<IPageSearchAdminResult[]> {
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
    dto.level &&
      Object.assign(whereObj, {
        level: dto.level,
      });
    Object.assign(whereObj, {
      status: dto.userStatus,
    });
    const result = await this.prisma.admin_info.findMany({
      skip: (dto.page - 1) * dto.limit,
      take: dto.limit,
      where: whereObj,
    });
    const admins: IPageSearchAdminResult[] = [];
    result.forEach((ele) => {
      admins.push({
        id: ele.id,
        name: ele.name,
        sex: ele.sex,
        nickName: ele.nick_name,
        phone: ele.phone,
        status: ele.status,
        level: ele.level,
      });
    });
    return admins;
  }
  async getAdminSearchCount(dto: PageAdminUserDto): Promise<number> {
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
    dto.level &&
      Object.assign(whereObj, {
        level: dto.level,
      });
    Object.assign(whereObj, {
      status: dto.userStatus,
    });
    return await this.prisma.admin_info.count({
      where: whereObj,
    });
  }

  async getAdminUserById(id: number) {
    const result = await this.prisma.admin_info.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        nick_name: true,
        sex: true,
        phone: true,
        status: true,
        level: true,
      },
    });

    return {
      id: result.id,
      name: result.name,
      nickName: result.nick_name,
      phone: result.phone,
      sex: result.sex,
      status: result.status,
      level: result.level,
    };
  }

  async getAdminUserByNickName(nickName: string) {
    const result = await this.prisma.admin_info.findFirst({
      where: {
        nick_name: nickName,
      },
    });
    return result;
  }

  async getAdminUserByNickNameNotId(nickName: string, id: number) {
    const result = await this.prisma.admin_info.findFirst({
      where: {
        nick_name: nickName,
        id: {
          not: id,
        },
      },
    });
    return result;
  }

  async upgradePasswordV(id: number): Promise<void> {
    // admin:passwordVersion:${param.id}
    const v = await this.getAdminRedis().get(`admin:passwordVersion:${id}`);
    if (v) {
      await this.getAdminRedis().set(`admin:passwordVersion:${id}`, parseInt(v!) + 1);
    }
  }

  async updateAdminStatus(id: number, status: number): Promise<void> {
    await this.prisma.admin_info.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });
  }
  async defaultAdminPasswod(id: number): Promise<boolean> {
    const salt = this.utils.generateUUID();
    const password = this.utils.getMd5Password('123456', salt);

    const ruslt = await this.prisma.admin_info.update({
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

  async addAdmin(param: AddAdminDto): Promise<boolean> {
    const exists = await this.getAdminUserByNickName(param.username);
    if (exists) {
      return false;
    }

    const salt = this.utils.generateUUID();
    const password = this.utils.getMd5Password('123456', salt);

    const addRuslt = await this.prisma.admin_info.create({
      data: {
        nick_name: param.username,
        name: param.name,
        sex: param.sex,
        phone: param.phone,
        level: param.level,
        password: password,
        salt: salt,
        status: 1,
      },
    });

    if (addRuslt) {
      return true;
    }
    return false;
  }

  async editAdmin(param: EditAdminDto): Promise<boolean> {
    const exists = await this.getAdminUserByNickNameNotId(param.username, param.id);
    if (exists) {
      return false;
    }

    const editRuslt = await this.prisma.admin_info.update({
      where: {
        id: param.id,
      },
      data: {
        nick_name: param.username,
        name: param.name,
        sex: param.sex,
        phone: param.phone,
        level: param.level,
      },
    });

    if (editRuslt) {
      return true;
    }
    return false;
  }

  @Validate()
  async editAdminSelf(param: EditAdminSelfDto): Promise<boolean> {
    const exists = await this.getAdminUserByNickNameNotId(param.username, param.id);
    if (exists) {
      return false;
    }

    const editRuslt = await this.prisma.admin_info.update({
      where: {
        id: param.id,
      },
      data: {
        nick_name: param.username,
        name: param.name,
        sex: param.sex,
        phone: param.phone,
      },
    });

    if (editRuslt) {
      return true;
    }
    return false;
  }

  @Validate()
  async resetAdminPassword(param: AdminResetPasswordDto): Promise<boolean> {
    const salt = this.utils.generateUUID();
    const password = this.utils.getMd5Password(param.newPassword, salt);
    const editRuslt = await this.prisma.admin_info.update({
      where: {
        id: param.id,
      },
      data: {
        salt: salt,
        password: password,
      },
    });

    if (editRuslt) {
      console.log('this updat pv');
      this.upgradePasswordV(param.id);
      return true;
    }
    return false;
  }
}
