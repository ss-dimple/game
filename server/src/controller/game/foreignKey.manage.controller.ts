import { Inject, Get, Post, Controller, Provide, Body, ALL, Del, Query, Put } from '@midwayjs/decorator';
// import { Param } from '@midwayjs/decorator';
// import { Validate } from '@midwayjs/validate';
import { BaseController, GAME_PREFIX_URL } from '../base';
import { ForeignKeycManageService } from '../../service/game/foreignKey.manage.service';
import { ResOp } from '../../interface';
import { res } from '../../common/utils';
import { AddTypeDto, EditTypeDto } from '../../dto/game/foreignKey';

@Provide()
@Controller(`${GAME_PREFIX_URL}/`)
export class ForeignKeyManageController extends BaseController {
  @Inject()
  foreignKeyManageService: ForeignKeycManageService;

  @Get('/tagList')
  async getTagList(): Promise<ResOp> {
    return res({
      data: await this.foreignKeyManageService.getTagList(),
    });
  }

  @Get('/bestList')
  async getBestList(): Promise<ResOp> {
    return res({
      data: await this.foreignKeyManageService.getBestList(),
    });
  }

  @Get('/typeList')
  async getTypeList(): Promise<ResOp> {
    return res({
      data: await this.foreignKeyManageService.getTypeList(),
    });
  }

  @Get('/getType1GameInfo')
  async getType1GameInfo(): Promise<ResOp> {
    return res({
      data: await this.foreignKeyManageService.getType1GameInfo(),
    });
  }
  @Get('/getType2GameInfo')
  async getType2GameInfo(): Promise<ResOp> {
    return res({
      data: await this.foreignKeyManageService.getType2GameInfo(),
    });
  }
  @Get('/getType3GameInfo')
  async getType3GameInfo(): Promise<ResOp> {
    return res({
      data: await this.foreignKeyManageService.getType3GameInfo(),
    });
  }
  @Get('/getType4GameInfo')
  async getType4GameInfo(): Promise<ResOp> {
    return res({
      data: await this.foreignKeyManageService.getType4GameInfo(),
    });
  }

  @Post('/TypeManage')
  async getTypeManage(@Body(ALL) typeInfo) {
    const list = await this.foreignKeyManageService.getTypeManage(typeInfo);
    return list;
  }

  @Post('/addType')
  async addType(@Body(ALL) dto: AddTypeDto): Promise<ResOp> {
    const result = await this.foreignKeyManageService.addType(dto);
    if (!result) {
      return res({ code: 10001 });
    }
    return res();
  }

  @Del('/deleteType')
  async deleteType(@Query('id') id: number) {
    console.log(id, '删除的用户id');
    const result = await this.foreignKeyManageService.deleteType(id);
    console.log(result, '被删除的类别');
    if (!result) {
      return res({ code: 10005 });
    }
    return res();
  }

  @Put('/updateType')
  async updateType(@Body(ALL) dto: EditTypeDto): Promise<ResOp> {
    const result = await this.foreignKeyManageService.updateType(dto);
    if (!result) {
      return res({ code: 10001 });
    }
    return res();
  }
}
