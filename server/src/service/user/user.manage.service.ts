import { Provide, Inject } from '@midwayjs/decorator';
import { BaseService } from '../base';
// import {
//   AddAdminDto,
//   EditAdminDto,
//   EditAdminSelfDto,
//   AdminResetPasswordDto,
//   PageAdminUserDto,
// } from '../../dto/admin/user';
import { Utils } from '../../common/utils';
import { PageUserDto } from '../../dto/user/user.manage';
import { IPageSearchUserResult } from '../user/user.interface';
// import { Validate } from '@midwayjs/validate';

@Provide()
export class UserManageService extends BaseService {
  @Inject()
  utils: Utils;

  async getUserManageById(id: number) {
    const result = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        userno: true,
        username: true,
        sex: true,
        gradeId: true,
        classId: true,
        roleId: true,
        // status: true,
      },
    });

    return {
      id: result.id,
      userno: result.userno,
      username: result.username,
      sex: result.sex,
      gradeId: result.gradeId,
      classId: result.classId,
      roleId: result.roleId,
      // status: result.status,
      //   level: result.level,
    };
  }
  async getUserManageByUsername(username: string) {
    const result = await this.prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    return result;
  }

  async getUserBySearchInfo(userInfo): Promise<IPageSearchUserResult[]> {
    const whereObj: any = {};
    userInfo.userno &&
      Object.assign(whereObj, {
        userno: userInfo.userno,
      });
    userInfo.username &&
      Object.assign(whereObj, {
        username: {
          contains: userInfo.username,
        },
      });
    userInfo.sex &&
      Object.assign(whereObj, {
        sex: userInfo.sex,
      });
    userInfo.roleId &&
      Object.assign(whereObj, {
        roleId: userInfo.roleId,
      });
    const result = await this.prisma.user.findMany({
      skip: (userInfo.page - 1) * userInfo.limit,
      take: userInfo.limit,
      where: whereObj,
    });
    console.log(result, '搜索结果');
    const users: IPageSearchUserResult[] = [];
    result.forEach((ele) => {
      users.push({
        id: ele.id,
        userno: ele.userno,
        username: ele.username,
        sex: ele.sex,
        roleId: ele.roleId,
        gradeId: ele.gradeId,
        classId: ele.classId,
      });
    });
    return users;
  }

  async getUserSearchCount(dto: PageUserDto): Promise<number> {
    const whereObj: any = {};
    dto.userno &&
      Object.assign(whereObj, {
        userno: dto.userno,
      });
    dto.username &&
      Object.assign(whereObj, {
        username: {
          contains: dto.username,
        },
      });
    dto.sex &&
      Object.assign(whereObj, {
        sex: dto.sex,
      });
    dto.roleId &&
      Object.assign(whereObj, {
        roleId: dto.roleId,
      });
    return await this.prisma.user.count({
      where: whereObj,
    });
  }

  async getTeachers() {
    const teachers = await this.prisma.user.findMany({
      where: {
        roleId: 2,
      },
    });
    return teachers;
  }

  async getTeamInfoByUserno(userno: number) {
    const teamInfo = await this.prisma.team.findMany({
      where: {
        OR: [
          {
            player0Id: userno,
          },
          {
            player1Id: userno,
          },
        ],
      },
    });
    return teamInfo;
  }
  async getGameInfoInfoByUsername(username: string) {
    const gameInfo = await this.prisma.game.findMany({
      where: {
        username: username,
      },
    });
    return gameInfo;
  }

  async getTeamInfo() {
    const teams = await this.prisma.team.findMany({});
    return teams;
  }

  async teamSubmit(teamForm: any) {
    // console.log(teamForm, 'teamform');
    const team = await this.prisma.team.create({
      data: {
        teamName: teamForm.teamName,
        teamInfo: teamForm.teamInfo,
        player0Name: teamForm.player0Name,
        player0Id: teamForm.player0Id,
        player0Work: teamForm.player0Work,
        player1Name: teamForm.player1Name,
        player1Id: teamForm.player1Id,
        player1Work: teamForm.player1Work,
        teacherId: teamForm.teacherId,
      },
    });
    return team;
  }

  async reduceIntegral(userName: string) {
    //通过username查找userno，并扣除积分
    console.log(userName, 'userName');
    const userId = await this.prisma.user.findFirst({
      where: {
        username: userName,
      },
      select: {
        userno: true,
      },
    });
    console.log(userId, 'userId');
    if (userId) {
      const score = -5;
      const channelId = 2;
      const result = await this.prisma.integral.create({
        data: {
          integralScore: score,
          channelId: channelId,
          userId: Number(userId.userno),
        },
      });
      console.log(result, 'result');
      if (result) {
        return 200;
      } else {
        return 10022;
      }
    } else {
      return 10021;
    }
  }
}
