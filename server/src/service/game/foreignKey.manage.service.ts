import { Provide, Inject } from '@midwayjs/decorator';
import { BaseService } from '../base';
import { Utils } from '../../common/utils';
import { AddTypeDto, EditTypeDto, PageTypeManageDto } from '../../dto/game/foreignKey';
import { IPageSearchTypeManageResult } from './game.interface';

@Provide()
export class ForeignKeycManageService extends BaseService {
  // updateType(dto: AddTypeDto) {
  //   throw new Error('Method not implemented.');
  // }
  @Inject()
  utils: Utils;

  async getTagList() {
    const result = await this.prisma.tag.findMany();
    return result;
  }

  async getBestList() {
    const result = await this.prisma.game.findMany({
      take: -8,
    });
    return result;
  }

  async getTypeList() {
    const result = await this.prisma.type.findMany();
    return result;
  }

  async getType1GameInfo() {
    const result = await this.prisma.game.findMany({
      where: {
        typeId: 1,
      },
      take: 4,
    });
    return result;
  }
  async getType2GameInfo() {
    const result = await this.prisma.game.findMany({
      where: {
        typeId: 2,
      },
      take: 4,
    });
    return result;
  }
  async getType3GameInfo() {
    const result = await this.prisma.game.findMany({
      where: {
        typeId: 3,
      },
      take: 4,
    });
    return result;
  }
  async getType4GameInfo() {
    const result = await this.prisma.game.findMany({
      where: {
        typeId: 4,
      },
      take: 4,
    });
    return result;
  }

  async getTypeManage(dto: PageTypeManageDto): Promise<IPageSearchTypeManageResult[]> {
    const whereObj: any = {};
    dto.typeName &&
      Object.assign(whereObj, {
        typeName: {
          contains: dto.typeName,
        },
      });
    dto.typeLevel &&
      Object.assign(whereObj, {
        typeLevel: dto.typeLevel,
      });
    const result = await this.prisma.type.findMany({
      where: whereObj,
    });
    const types: IPageSearchTypeManageResult[] = [];
    result.forEach((ele) => {
      types.push({
        id: ele.id,
        typeName: ele.typeName,
        typeLevel: ele.typeLevel,
      });
    });
    return types;
  }

  async getTypeByTypeName(typeName: string) {
    const result = await this.prisma.type.findFirst({
      where: {
        typeName: typeName,
      },
    });
    return result;
  }

  async getTypeByTypeLevel(typeLevel: number) {
    const result = await this.prisma.type.findFirst({
      where: {
        typeLevel: typeLevel,
      },
    });
    return result;
  }

  async addType(param: AddTypeDto): Promise<boolean> {
    const existName = await this.getTypeByTypeName(param.typeName);
    const existLevel = await this.getTypeByTypeLevel(param.typeLevel);
    if (existName || existLevel) {
      return false;
    }

    const addRuslt = await this.prisma.type.create({
      data: {
        typeName: param.typeName,
        typeLevel: param.typeLevel,
      },
    });

    if (addRuslt) {
      return true;
    }
    return false;
  }

  async deleteType(id: number) {
    const result = await this.prisma.type.delete({
      where: {
        id: id,
      },
    });
    return result;
  }

  async getTypeByTypeNameNotId(typeName: string, id: number) {
    const result = await this.prisma.type.findFirst({
      where: {
        typeName: typeName,
        id: {
          not: id,
        },
      },
    });
    return result;
  }

  async updateType(param: EditTypeDto): Promise<boolean> {
    const exists = await this.getTypeByTypeNameNotId(param.typeName, param.id);
    if (exists) {
      return false;
    }

    const editResult = await this.prisma.type.update({
      where: {
        id: param.id,
      },
      data: {
        typeName: param.typeName,
        typeLevel: param.typeLevel,
      },
    });

    if (editResult) {
      return true;
    }
    return false;
  }
}
