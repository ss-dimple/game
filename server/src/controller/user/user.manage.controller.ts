import { Provide, Inject, Controller, Get, Post, Body, ALL, Query } from '@midwayjs/decorator';
import { BaseController, VERIFY_PREFIX_URL, USER_PREFIX_URL } from '../base';
import { UserManageService } from '../../service/user/user.manage.service';
import { UserVerifyService } from '../../service/user/user.verify.service';
import { ResOp } from '../../interface';
import { res, resByPage } from '../../common/utils';
// import { PageUserDto } from '../../dto/user/user.manage';
// import { userInfo } from 'os';

@Provide()
@Controller(`${USER_PREFIX_URL}${VERIFY_PREFIX_URL}/`)
export class UserManegeController extends BaseController {
  @Inject()
  userManageService: UserManageService;

  @Inject()
  userVerifyService: UserVerifyService;

  @Get('/userInfo')
  async getUserInfoByTokenId(): Promise<ResOp> {
    console.log(this.ctx.state.user, 'userinfo');
    return res({
      data: await this.userManageService.getUserManageById(this.ctx.state.user.uid),
    });
  }

  @Get('/logout')
  async logout(): Promise<ResOp> {
    // console.log('logout:', this.ctx.state.admin.uid);
    await this.userVerifyService.clearLoginStatus(this.ctx.state.user.uid);
    return res();
  }

  @Post('/userManage')
  async seachUserOfPage(@Body(ALL) userInfo): Promise<ResOp> {
    // console.log('seach dto:', dto);
    console.log(userInfo, 'search userinfo');
    const list = await this.userManageService.getUserBySearchInfo(userInfo);
    console.log(list, 'list');
    const total = await this.userManageService.getUserSearchCount(userInfo);
    return resByPage(list, total, userInfo.page, userInfo.limit);
  }

  @Get('/getTeachers')
  async getTeachers(): Promise<ResOp> {
    return res({
      data: await this.userManageService.getTeachers(),
    });
  }

  @Get('/getTeamInfoByUserno')
  async getTeamInfoByUserno(@Query('userno') userno: number): Promise<ResOp> {
    // return res({
    //   data: await this.userManageService.getTeamInfo(userno),
    // });
    console.log(userno, 'userno');
    const result = await this.userManageService.getTeamInfoByUserno(userno);
    console.log(result, '我所在账号的团队信息');
    return res({ data: result });
  }
  @Get('/getGameInfoInfoByUsername')
  async getGameInfoInfoByUsername(@Query('username') username: string): Promise<ResOp> {
    // return res({
    //   data: await this.userManageService.getTeamInfo(userno),
    // });
    console.log(username, 'username');
    const result = await this.userManageService.getGameInfoInfoByUsername(username);
    console.log(result, '我所在账号的上传游戏信息');
    return res({ data: result });
  }

  @Get('/getTeamInfo')
  async getTeamInfo(): Promise<ResOp> {
    return res({
      data: await this.userManageService.getTeamInfo(),
    });
  }

  @Post('/teamSubmit')
  async teamSubmit(@Body(ALL) teamForm): Promise<ResOp> {
    // console.log('seach dto:', dto);
    console.log(teamForm, 'teamForm');
    const result = await this.userManageService.teamSubmit(teamForm);
    console.log(result, 'result');
    return res({ code: 10018 });
  }

  @Post('/reduceIntegral')
  async reduceIntegral(@Body(ALL) username): Promise<ResOp> {
    // console.log('seach dto:', dto);
    const userName = Object.keys(username).toString();
    console.log(userName, 'userName');
    const result = await this.userManageService.reduceIntegral(userName);
    console.log(result, 'result');
    return res({ code: result });
  }
}
