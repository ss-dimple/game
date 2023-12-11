import { Provide, Inject } from '@midwayjs/decorator';
import { BaseService } from '../base';
import { Utils} from '../../common/utils';
import { extname } from 'path';

// import fs = require('fs');
// import path = require('path');

@Provide()
export class FilesManageService extends BaseService {
  @Inject()
  utils: Utils;

  async createImage(files: any, fields: any) {
    const fileInfo = await this.prisma.file.create({
      data: {
        gameId: fields.id,
        filePath: files[0].data,
        fileType: fields.fileImgType,
      },
    });
    // console.log(GameInfo, 'gameInfo');createFile
    if (fileInfo) {
      return 200;
    } else {
      return 404;
    }
  }

  async submitImage(filePath: any, fields: any){
    const result = await this.prisma.file.create({
      data:{
        gameId: Number(fields.gameId),
        fileType: '3',
        filePath: filePath[0],
      }
    })
    console.log(result,'result');
    if (result) {
      return true;
    } else {
      return 10022;
    }
  }

  async submitFile(filePath: any, fields: any) {
    //通过extname获取压缩包和图片分类，将类型传入，再将文件路径和游戏id依次传入，通过teamId获取各队员id，给每个队员增加上传积分。
    //缺陷：加积分也只能加两个人。
    console.log(filePath, fields, 'filePath+fields');
    let one1: any = [];
    let one2: any = [];
    const result = true;
    for (const i in filePath) {
      const file = extname(filePath[i]);
      console.log(file, '后缀');
      if (file === '.zip') {
        const fileType = '2';
        one1 = await this.prisma.file.createMany({
          data: [
            {
              gameId: Number(fields.gameId),
              fileType: fileType,
              filePath: filePath[i],
            },
          ],
        });
        console.log(one1, 'one1');
      } else {
        const fileType = '1';
        one2 = await this.prisma.file.createMany({
          data: [
            {
              gameId: Number(fields.gameId),
              fileType: fileType,
              filePath: filePath[i],
            },
          ],
        });
        console.log(one2, 'one2');
      }
    }
    if (one1 || one2) {
      return result;
    }
    if (result) {
      const teamList = await this.prisma.team.findMany({
        where: {
          id: Number(fields.teamId),
        },
        select: {
          player0Id: true,
          player1Id: true,
        },
      });
      console.log(teamList, 'teamList');
      const teams = teamList[0];
      const score = 10;
      const channelId = 1;
      let addIntegral: any = [];
      for (const j in teams) {
        addIntegral = await this.prisma.integral.createMany({
          data: [
            {
              integralScore: score,
              channelId: channelId,
              userId: teams[j],
            },
            // {
            //   integralScore: score,
            //   channelId: channelId,
            //   userId: teamList[0].player1Id,
            // },
          ],
        });
      }
      console.log(addIntegral, 'addIntegral');
      if (addIntegral) {
        return true;
      } else {
        return 10020;
      }
    } else {
      return 10019;
    }
  }
}
