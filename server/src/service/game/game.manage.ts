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

  async getTeamNameByTeamId(teamId: number) {
    const teamName = await this.prisma.team.findFirst({
      where: {
        id: teamId
      },
      select :{
        teamName: true
      }
    })
    return teamName
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
        teamName: dto.teamName,
        // status: dto.status,
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
      searchGameForm.check &&
      Object.assign(whereObj, {
        check: {
          contains: searchGameForm.check,
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
        check: ele.check
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
  async getPictureListById(id: number) {
    // const fileType1 = '1';
    const pictureList = await this.prisma.file.findMany({
      where: {
        gameId: id,
        fileType: '1',
      },
      select: {
        filePath: true,
      },
    });
    // const image = await this.prisma.file.findMany({
    //   where: {
    //     gameId: id,
    //     fileType: '3',
    //   },
    //   select: {
    //     filePath: true,
    //   },
    // });
    console.log(pictureList,'imageList');   
    let pictureName = '';
    const pictures = [];
    pictureList.forEach((item: any) => {
      pictureName = basename(item.filePath);
      pictures.push(pictureName);
      return pictures;
      // return imageName;
    });
    console.log(pictures, 'pictures');
    // const obj = imageList.lastIndexOf('/');
    // const imageName=imageList
    return pictures;
  }

  async getImageNameById(id: number) {
    const result = await this.prisma.file.findMany({
      where: {
        gameId: id,
        fileType: '3',
      },
      select: {
        filePath: true,
      },
    });
    console.log(result,'image');   
    let imageName = '';
    const image = [];
    result.forEach((item: any) => {
      imageName = basename(item.filePath);
      image.push(imageName);
      return image;
    });
    console.log(image, 'image');
    return image;
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
  // async updateCheckById(id: number) {
  //   console.log(id, 'id');
  //   // const check = '1';
  //   const result = await this.prisma.game.update({
  //     where: {
  //       id: Number(id),
  //     },
  //     data: {
  //       check: 1,
  //     },
  //   });
  //   console.log(result, 'result');
  //   return result;
  // }
  
  async updateCheck(dto:any){
    const result = await this.prisma.game.update({
      where: {
        id: dto.gameId,
      },
      data: {
        check: dto.check,
      },
    });

    console.log(result, 'result');
    return result;
  }

  async addRejectInfo(dto:any) {
    const addRejectInfo = await this.prisma.reject.create({
      data:{
        gameId: dto.gameId,
        teacherId: dto.teacherId,
        username: dto.username,
        reply: dto.reply
      }
    })
    console.log(addRejectInfo, 'addRejectInfo');
    return addRejectInfo;
  }
}
