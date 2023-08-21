import { Provide, Inject } from '@midwayjs/decorator';
import { BaseService } from '../base';
import { Utils } from '../../common/utils';
import { AddGameDto } from '../../dto/game/game.manage';
import { basename } from 'path';

@Provide()
export class GameManageService extends BaseService {
  // updateType(dto: AddTypeDto) {
  //   throw new Error('Method not implemented.');
  // }
  @Inject()
  utils: Utils;

  async getGameInfoById(id: number) {
    const GameInfo = await this.prisma.game.findMany({
      where: {
        id: id,
      },
      orderBy: {
        id: 'asc',
      },
    });
    return GameInfo;
  }

  async getcommentInfoById(id: number) {
    const CommentInfo = await this.prisma.comment.findMany({
      where: {
        gameId: id,
      },
    });
    return CommentInfo;
  }

  async getGameDescByGameName(gameName: string) {
    const result = await this.prisma.game.findFirst({
      where: {
        gameName: gameName,
      },
      select: {
        id: true,
        teamId: true,
      },
    });
    return result;
  }

  async submitGame(dto: AddGameDto) {
    console.log(dto, 'gameInfo');
    const game = await this.prisma.game.create({
      data: {
        gameName: dto.gameName,
        teamId: dto.teamId,
        typeId: dto.typeId,
        tags: dto.newTag,
        gameTitle: dto.gameTitle,
        gameDesc: dto.gameDesc,
        language: dto.newLanguage,
        set: dto.newSet,
        status: dto.status,
        gameMeta: dto.gameMeta,
        teacherId: dto.teacherId,
        username: dto.username,
      },
    });
    return game;
  }

  async commentSubmit(commentForm: any) {
    console.log(commentForm, 'commentForm');
    //添加评论成功后，通过userno加5积分
    const comment = await this.prisma.comment.create({
      data: {
        commentScore: commentForm.commentScore,
        commentContent: commentForm.commentContent,
        userno: commentForm.userno,
        gameId: commentForm.gameId,
      },
    });
    if (comment) {
      const integralScore = 5;
      const channelId = 3;
      const result = await this.prisma.integral.create({
        data: {
          userId: commentForm.userno,
          integralScore: integralScore,
          channelId: channelId,
        },
      });
      console.log(result, 'result');
    }
    return comment;
  }

  async getSeachGameInfo(searchGameForm: any) {
    //通过教师名称再获取教师编号，再获取游戏相关信息
    console.log(searchGameForm, 'searchGameForm');
    const userno = await this.prisma.user.findFirst({
      where: {
        username: searchGameForm.username,
      },
      select: {
        userno: true,
      },
    });
    console.log(userno, 'userno');
    const whereObj: any = {};
    searchGameForm.gameName &&
      Object.assign(whereObj, {
        gameName: {
          contains: searchGameForm.gameName,
        },
      });
    searchGameForm.typeId &&
      Object.assign(whereObj, {
        typeId: {
          contains: searchGameForm.typeId,
        },
      });
    Object.assign(whereObj, {
      teacherId: userno.userno,
    });
    const result = await this.prisma.game.findMany({
      skip: (searchGameForm.page - 1) * searchGameForm.limit,
      take: searchGameForm.limit,
      where: whereObj,
    });
    const gameInfo: any = [];
    result.forEach((ele) => {
      gameInfo.push({
        id: ele.id,
        gameName: ele.gameName,
        typeId: ele.typeId,
        gameTitle: ele.gameTitle,
      });
    });
    return gameInfo;
  }
  async getSeachGameCount(searchGameForm: any): Promise<number> {
    console.log(searchGameForm, 'searchGameForm');
    const userno = await this.prisma.user.findFirst({
      where: {
        username: searchGameForm.username,
      },
      select: {
        userno: true,
      },
    });
    console.log(userno, 'userno');
    const whereObj: any = {};
    searchGameForm.gameName &&
      Object.assign(whereObj, {
        gameName: {
          contains: searchGameForm.gameName,
        },
      });
    searchGameForm.typeId &&
      Object.assign(whereObj, {
        typeId: {
          contains: searchGameForm.typeId,
        },
      });
    Object.assign(whereObj, {
      teacherId: userno.userno,
    });
    return await this.prisma.game.count({
      where: whereObj,
    });
  }
  async getImageListById(id: number) {
    const fileType = '1';
    const imageList = await this.prisma.file.findMany({
      where: {
        gameId: id,
        fileType: fileType,
      },
      select: {
        filePath: true,
      },
    });
    let imageName = '';
    const images = [];
    imageList.forEach((item: any) => {
      // const obj = item.lastIndexOf('/');
      // imageName = item.substr(obj + 1);
      imageName = basename(item.filePath);
      images.push(imageName);
      return images;
      // return imageName;
    });
    console.log(images, 'images');
    // const obj = imageList.lastIndexOf('/');
    // const imageName=imageList
    return images;
  }
  async getFileNameByGameId(gameId: number) {
    const fileType = '2';
    const fileList = await this.prisma.file.findMany({
      where: {
        gameId: gameId,
        fileType: fileType,
      },
      select: {
        filePath: true,
      },
    });
    let fileName = '';
    const files = [];
    fileList.forEach((item: any) => {
      // const obj = item.lastIndexOf('/');
      // imageName = item.substr(obj + 1);
      fileName = basename(item.filePath);
      files.push(fileName);
      return files;
      // return imageName;
    });
    console.log(files, 'files');
    // const obj = imageList.lastIndexOf('/');
    // const imageName=imageList
    return files;
  }
  async addGameAvg(avgInfo: any) {
    console.log(avgInfo, 'avgInfo');
    const result = await this.prisma.game.update({
      where: {
        id: Number(avgInfo.gameId),
      },
      data: {
        avg: avgInfo.avg,
      },
    });
    console.log(result, 'result');
    return result;
  }
  async updateConditionById(id: number) {
    console.log(id, 'id');
    const comdition = '1';
    const result = await this.prisma.game.update({
      where: {
        id: Number(id),
      },
      data: {
        comdition: Number(comdition),
      },
    });
    console.log(result, 'result');
    return result;
  }
}
