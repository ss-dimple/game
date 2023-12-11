import { ResOp } from '../../interface';
import { BaseController, FILES_PREFIX_URL } from '../base';
import { Inject, Controller, Post, Files, Body, Fields, Headers } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { res, Utils } from '../../common/utils';
import { copyFileSync, statSync, createReadStream } from 'fs';
import { join, extname } from 'path';
import { FilesManageService } from '../../service/file/files.manage';
import { downloadFileDto } from '../../dto/file/files.manage';




@Controller(`${FILES_PREFIX_URL}/`)
export class FilesManageController extends BaseController {
  @Inject()
  ctx: Context;
  @Inject()
  utils: Utils;
  @Inject()
  filesManageService: FilesManageService;

  @Post('/imageupload')
  public async imageupload(
    @Files() files,
    @Fields() fields,
    @Headers('host') host: string,
    @Headers('x-forwarded-proto') proto: string,
  ): Promise<ResOp> {
    console.log(fields,files, 'files'); //fields包含了上传传文件的参数，根据上传文件的参数编写业务逻辑实现文件的重命名和文件归类

    const result = await Promise.all(
      files.map(async (file: any) => {
        //重命名新的文件名
        //extname获取文件扩展名，通过不同扩展名将图片和压缩包分开保存到文件夹下
        const extnames = extname(file.filename);
        console.log(extnames, 'extnames');
        // let newFilename: any;
        try {
          const newFilename = this.utils.generateUUID() + extname(file.filename);
            try {
            //将上传的临时文件转存到正式文件目录，并将新的文件名进行持久化保存
            copyFileSync(file.data, join(this.ctx.app.getAppDir(), 'public/upload/images', newFilename));
          } catch (error) {
            console.log(error);
          }
          return `${proto || 'http'}://${host}/public/upload/images/${newFilename}`;
        } catch (error){
          console.log(error);
          
        }
        // const newFilename = this.utils.generateUUID() + extname(file.filename);
        // try {
        //   //将上传的临时文件转存到正式文件目录，并将新的文件名进行持久化保存
        //   copyFileSync(file.data, join(this.ctx.app.getAppDir(), 'public/upload', newFilename));
        // } catch (error) {
        //   console.log(error);
        // }
        // return `${proto || 'http'}://${host}/public/upload/${newFilename}`;
      }),
    );
    
    console.log(result, 'result');
    const filePath = result;
    console.log(filePath, 'filePath');
    //将该路径传入数据库
    const code = await this.filesManageService.submitImage(filePath, fields);
    if (code === true) {
      return res({
        data: {
          info: '上传主图成功',
        },
      });
    } else {
      return res({ code: code });
    }
  }

  @Post('/upload')
  public async upload(
    @Files() files,
    @Fields() fields,
    @Headers('host') host: string,
    @Headers('x-forwarded-proto') proto: string,
  ): Promise<ResOp> {
    console.log(fields,files, 'files'); //fields包含了上传传文件的参数，根据上传文件的参数编写业务逻辑实现文件的重命名和文件归类
    const result = await Promise.all(
      files.map(async (file: any) => {
        //重命名新的文件名
        //extname获取文件扩展名，通过不同扩展名将图片和压缩包分开保存到文件夹下
        const extnames = extname(file.filename);
        console.log(extnames, 'extnames');
        let newFilename: any;
        try {
          if (extnames === '.zip') {
            newFilename = fields.gameId + this.utils.generateUUID() + extname(file.filename);
            //将上传的临时文件转存到正式文件目录，并将新的文件名进行持久化保存
            copyFileSync(file.data, join(this.ctx.app.getAppDir(), 'public/upload/zip', newFilename));
            return `${proto || 'http'}://${host}/public/upload/zip/${newFilename}`;
          } else {
            newFilename = fields.gameId + this.utils.generateUUID() + extname(file.filename);
            copyFileSync(file.data, join(this.ctx.app.getAppDir(), 'public/upload/pictures', newFilename));
            return `${proto || 'http'}://${host}/public/upload/pictures/${newFilename}`;
          }
        } catch (error) {
          console.log(error);
        }
        // const newFilename = this.utils.generateUUID() + extname(file.filename);
        // try {
        //   //将上传的临时文件转存到正式文件目录，并将新的文件名进行持久化保存
        //   copyFileSync(file.data, join(this.ctx.app.getAppDir(), 'public/upload', newFilename));
        // } catch (error) {
        //   console.log(error);
        // }
        // return `${proto || 'http'}://${host}/public/upload/${newFilename}`;
      }),
    );
    console.log(result, 'result');
    const filePath = result;
    console.log(filePath, 'filePath');
    //将该路径传入数据库，传入即积分+10，获取团队id找出队员id，并给每个成员+10
    const code = await this.filesManageService.submitFile(filePath, fields);
    if (code === true) {
      return res({
        data: {
          info: '上传并添加积分成功',
        },
      });
    } else {
      return res({ code: code });
    }
  }
  @Post('/download')
  public async downLoad(@Body() dto: downloadFileDto) {
    console.log(dto.fileName, dto.fileType, 'download file request');
    //传入要下载的文件名，通过fileType来判定去那个文件夹下载
    //     C、	statSync()：获取路径的详细信息
    // D、	isfile()：判断某一路径是否为文件
    // E、	createReadStream()：您可以打开文件/流并读取其中的数据。
    // F、	setMaxListeners()：更改监听器默认限制

    let downeFilename = '';
    try {
      if (dto.fileType === '1') {
        downeFilename = join(this.ctx.app.getAppDir(), 'public/upload/pictures', dto.fileName);
      } else if (dto.fileType === '2') {
        downeFilename = join(this.ctx.app.getAppDir(), 'public/upload/zip', dto.fileName);
      } else if (dto.fileType === '3') {
        downeFilename = join(this.ctx.app.getAppDir(), 'public/upload/images', dto.fileName);
      }
      const statFile = statSync(downeFilename);
      console.log('file read');
      console.log(statFile);
      if (statFile.isFile()) {
        this.ctx.response.set({
          'Content-Type': 'application/octet-stream',
          'Access-Control-Expose-Headers': 'Content-Disposition',
          'Content-Disposition': 'attachment;filename=' + dto.fileName,
          'Content-Length': statFile.size.toString(),
        });
        const filesrc = createReadStream(downeFilename);
        // const filesrc = '';
        filesrc.setMaxListeners(15);
        this.ctx.response.body = filesrc;
      } else {
        this.ctx.response.body = {
          data: null,
          code: 200,
          message: '文件不存在',
        };
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log('download file finish');
    }
  }

  // @Post('/download')
  // public async downLoad(
  //   @Body()
  //   @Files()
  //   files,
  //   @Fields() fields,
  // ) {
  //   console.log('download file request');
  //   console.log(fields, files, 'fields');
  //   for (const i in fields) {
  //     const downeFilename = join(this.ctx.app.getAppDir(), 'public/upload/image', fields[i]);
  //     const statFile = statSync(downeFilename);
  //     console.log('file read');
  //     console.log(statFile);
  //     if (statFile.isFile()) {
  //       this.ctx.response.set({
  //         'Content-Type': 'application/octet-stream',
  //         'Access-Control-Expose-Headers': 'Content-Disposition',
  //         'Content-Disposition': 'attachment;filename=' + fields[i],
  //         'Content-Length': statFile.size.toString(),
  //       });
  //       //读取文件流
  //       const filesrc = createReadStream(downeFilename);
  //       filesrc.setMaxListeners(15);
  //       this.ctx.response.body = filesrc;
  //     } else {
  //       this.ctx.response.body = {
  //         data: null,
  //         code: 200,
  //         message: '文件不存在',
  //       };
  //       // eslint-disable-next-line prettier/prettier
  //     }
  //     // this.ctx.response.body = filesrcList;
  //   }
  // }
}
