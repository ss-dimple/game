import { Provide, Inject, Controller, Get, Post, Body, ALL, Put, Query } from '@midwayjs/decorator';
import { BaseController, ADMIN_PREFIX_URL, VERIFY_PREFIX_URL } from '../base';
import { AdminUserService } from '../../service/admin/admin.user.service';
import { AdminVerifyService } from '../../service/admin/admin.verify.service';
import { ResOp } from '../../interface';
import { res, resByPage } from '../../common/utils';
import {
  PageAdminUserDto,
  AdminStatusDto,
  AddAdminDto,
  EditAdminDto,
  EditAdminSelfDto,
  AdminResetPasswordDto,
} from '../../dto/admin/user';

@Provide()
@Controller(`${ADMIN_PREFIX_URL}${VERIFY_PREFIX_URL}/`)
export class AdminUserController extends BaseController {
  @Inject()
  adminUserService: AdminUserService;

  @Inject()
  adminVerifyService: AdminVerifyService;

  @Get('/adminInfo')
  async getAdminInfoByTokenId(): Promise<ResOp> {
    console.log(this.ctx.state.admin, 'uid');
    return res({
      data: await this.adminUserService.getAdminUserById(this.ctx.state.admin.uid),
    });
  }

  @Get('/logout')
  async logout(): Promise<ResOp> {
    // console.log('logout:', this.ctx.state.admin.uid);
    await this.adminVerifyService.clearLoginStatus(this.ctx.state.admin.uid);
    return res();
  }

  @Post('/adminManage')
  async searchAdminOfPage(@Body(ALL) dto: PageAdminUserDto): Promise<ResOp> {
    // console.log('search dto:', dto);
    const list = await this.adminUserService.getAdminBySearchInfo(dto);
    const total = await this.adminUserService.getAdminSearchCount(dto);
    return resByPage(list, total, dto.page, dto.limit);
  }

  @Post('/updateAdminStatus')
  async updateAdminStatus(@Body(ALL) dto: AdminStatusDto): Promise<ResOp> {
    // console.log('search dto:', dto);
    await this.adminUserService.updateAdminStatus(dto.id, dto.status);
    return res({ message: '更改使用状态成功' });
  }

  @Post('/setAdmin')
  async addAdmin(@Body(ALL) dto: AddAdminDto): Promise<ResOp> {
    // console.log('search dto:', dto);
    const result = await this.adminUserService.addAdmin(dto);
    if (!result) {
      return res({ code: 10001 });
    }
    return res();
  }

  @Put('/setAdmin')
  async editAdmin(@Body(ALL) dto: EditAdminDto): Promise<ResOp> {
    // console.log('search dto:', dto);
    const result = await this.adminUserService.editAdmin(dto);
    if (!result) {
      return res({ code: 10001 });
    }
    return res();
  }

  @Get('/defAdminPassword')
  async defaultAdminPassword(@Query('id') id: number): Promise<ResOp> {
    // console.log('def password id:', id);
    const result = await this.adminUserService.defaultAdminPasswod(id);
    if (!result) {
      return res({ code: 10005 });
    }
    return res();
  }

  @Post('/setAdminSelf')
  async editAdminSelf(@Body(ALL) dto: EditAdminSelfDto): Promise<ResOp> {
    // console.log('search dto:', dto);
    dto.id = this.ctx.state.admin.uid;
    const result = await this.adminUserService.editAdminSelf(dto);
    if (!result) {
      return res({ code: 10001 });
    }
    return res();
  }

  @Post('/setAdminSelfPassword')
  async setAdminSelfPassword(@Body(ALL) dto: AdminResetPasswordDto): Promise<ResOp> {
    dto.id = this.ctx.state.admin.uid;
    await this.adminUserService.resetAdminPassword(dto);
    return res();
  }
}
