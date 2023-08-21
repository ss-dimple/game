import { Provide, Inject, Controller, Get, Post, Body, ALL, Query } from '@midwayjs/decorator';
import { BaseController, ADMIN_PREFIX_URL } from '../base';
import { GamerManageService } from '../../service/admin/gamer.manage.service';
import { ResOp } from '../../interface';
import { res, resByPage } from '../../common/utils';
import { PageGamerUserDto, UpdateGamerStatusDto } from '../../dto/admin/gamer';

@Provide()
@Controller(`${ADMIN_PREFIX_URL}/`)
export class GamerManageController extends BaseController {
  @Inject()
  gamerManageService: GamerManageService;

  @Post('/gamerManage')
  async searchGamerOfPage(@Body(ALL) dto: PageGamerUserDto): Promise<ResOp> {
    // console.log('search dto:', dto);
    const list = await this.gamerManageService.getGamerBySearchInfo(dto);
    const total = await this.gamerManageService.getGamerSearchCount(dto);
    return resByPage(list, total, dto.page, dto.limit);
  }

  @Post('/updateGamerStatus')
  async updateGamerStatus(@Body(ALL) dto: UpdateGamerStatusDto): Promise<ResOp> {
    // console.log('update status dto:', dto);
    await this.gamerManageService.updateGamerStatus(dto);
    return res({ message: '更改使用状态成功' });
  }

  @Get('/defGamerPassword')
  async defaultGamerPassword(@Query('id') id: number): Promise<ResOp> {
    // console.log('def password id:', id);
    const result = await this.gamerManageService.defaultGamerPasswod(id);
    if (!result) {
      return res({ code: 10005 });
    }
    return res();
  }
}
