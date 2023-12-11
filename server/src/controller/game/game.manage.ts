import { Provide, Inject, Controller, Get, Query, Post, Body, ALL, Put } from '@midwayjs/decorator';
import { BaseController, GAME_PREFIX_URL } from '../base';
import { GameManageService } from '../../service/game/game.manage';
import { res, resByPage } from '../../common/utils';
import { ResOp } from '../../interface';
import { AddGameDto ,updateCheckDto, AddRejectDto} from '../../dto/game/game.manage';

@Provide()
@Controller(`${GAME_PREFIX_URL}/`)
export class GameManegeController extends BaseController {
  @Inject()
  gameManageService: GameManageService;

  @Get('/getGameInfoById')
  async getGameInfoById(@Query('id') id: number): Promise<ResOp> {
    console.log(id, 'id');
    const result = await this.gameManageService.getGameInfoById(id);
    console.log(result, '游戏详情');
    return res({ data: result });
  }

  @Get('/getCommentInfoById')
  async getcommentInfoById(@Query('id') id: number): Promise<ResOp> {
    console.log(id, 'id');
    const result = await this.gameManageService.getcommentInfoById(id);
    console.log(result, '评论详情');
    return res({ data: result });
  }

  @Get('/getGameDescByGameName')
  async getGameDescByGameName(@Query('gameName') gameName: string): Promise<ResOp> {
    // console.log('seach dto:', dto);
    console.log(gameName, 'gameName');
    const result = await this.gameManageService.getGameDescByGameName(gameName);
    console.log(result, 'result');
    return res({ data: result });
  }


  @Get('/getTeamNameByTeamId')
  async getTeamNameByTeamId(@Query('teamId') teamId: number): Promise<ResOp> {
    console.log(teamId, 'teamId');
    const result = await this.gameManageService.getTeamNameByTeamId(teamId);
    console.log(result, '团队名称');
    return res({ data: result });
  }

  @Post('/submitGame')
  async submitGame(@Body(ALL) dto: AddGameDto): Promise<ResOp> {
    // console.log('seach dto:', dto);
    // console.log(gameInfo, 'gameInfo');
    const result = await this.gameManageService.submitGame(dto);
    console.log(result, 'result');
    return res({ code: 10018 });
  }

  @Post('/commentSubmit')
  async commentSubmit(@Body(ALL) commentForm: any): Promise<ResOp> {
    console.log(commentForm, 'commentForm');
    const result = await this.gameManageService.commentSubmit(commentForm);
    console.log(result, 'result');
    return res({ code: 10018 });
  }

  @Post('/getSeachGameInfo')
  async getSeachGameInfo(@Body(ALL) searchGameForm: any): Promise<ResOp> {
    // console.log('seach dto:', dto);
    console.log(searchGameForm, 'searchGameForm');
    const list = await this.gameManageService.getSeachGameInfo(searchGameForm);
    const total = await this.gameManageService.getSeachGameCount(searchGameForm);
    console.log(list, total, 'result');
    return resByPage(list, total, searchGameForm.page, searchGameForm.limit);
  }

  @Get('/getPictureListById')
  async getPictureListById(@Query('id') id: number): Promise<ResOp> {
    console.log(id, 'id');
    const result = await this.gameManageService.getPictureListById(id);
    console.log(result, '宣传图片文件名称');
    return res({ data: result });
  }

  @Get('/getImageNameById')
  async getImageNameById(@Query('id') id: number): Promise<ResOp> {
    console.log(id, 'id');
    const result = await this.gameManageService.getImageNameById(id);
    console.log(result, '主图名称');
    return res({ data: result });
  }

  @Get('/getFileNameByGameId')
  async getFileNameByGameId(@Query('gameId') gameId: number): Promise<ResOp> {
    console.log(gameId, 'gameId');
    const result = await this.gameManageService.getFileNameByGameId(gameId);
    console.log(result, '压缩包文件名称');
    return res({ data: result });
  }
  @Put('/addGameAvg')
  async addGameAvg(@Body(ALL) avgInfo: any): Promise<ResOp> {
    console.log(avgInfo, 'avgInfo');
    // dto: updateAvgDto
    const result = await this.gameManageService.addGameAvg(avgInfo);
    console.log(result, '增加游戏平均分');
    return res({ data: result });
  }

  @Put('/updateCheck')
  async updateCheck(@Body(ALL) dto: updateCheckDto): Promise<ResOp> {
    console.log(dto,'checkInfo');
    
    const result = await this.gameManageService.updateCheck(dto);
    console.log(result, '修改游戏审核状态');
    if (!result) {
      return res({ code: 10001 });
    }
    return res({ data: result });
  }
  @Post('/addRejectInfo')
  async addRejectInfo(@Body(ALL) dto: AddRejectDto): Promise<ResOp> {
    const result = await this.gameManageService.addRejectInfo(dto);
    if (!result) {
      return res({ code: 10001 });
    }
    return res();
  }

}
