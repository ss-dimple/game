import { Provide, Inject, Controller, Get, Query, Post, Body, ALL, Put } from '@midwayjs/decorator';
import { BaseController, GAME_PREFIX_URL } from '../base';
import { GameManageService } from '../../service/game/game.manage';
import { res, resByPage } from '../../common/utils';
import { ResOp } from '../../interface';
import { AddGameDto } from '../../dto/game/game.manage';

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

  @Get('/getImageListById')
  async getImageListById(@Query('id') id: number): Promise<ResOp> {
    console.log(id, 'id');
    const result = await this.gameManageService.getImageListById(id);
    console.log(result, '图片文件名称');
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
  @Put('/updateConditionById')
  async updateConditionById(@Query('id') id: number): Promise<ResOp> {
    console.log(id, 'id');
    // dto: updateAvgDto
    const result = await this.gameManageService.updateConditionById(id);
    console.log(result, '修改游戏审核状态');
    return res({ data: result });
  }
}
