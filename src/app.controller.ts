import { BadRequestException, Body, Controller, Get, Logger, Post, Query, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { storage } from './oss';
import * as path from 'path';
import * as fs from 'fs';
import { MyLoggerDev } from './logger/my-logger.dev';
import { MyLogger } from './logger/my-logger';
@Controller()
export class AppController {

  private logger = new MyLogger()
  members: String[];

  constructor(private readonly appService: AppService) {
    this.members = [];
  }

  // merge file
  @Get('merge-file')
  mergeFile(@Query('file') name: string) {
    const nameDir = 'uploads/' + name;
    // read file
    const files = fs.readdirSync(nameDir);
    let startPos = 0, countFile = 0;
    files.map(file => {
      // get path full
      const filePath = nameDir + '/' + file;
      const streamFile = fs.createReadStream(filePath);
      streamFile.pipe(fs.createWriteStream('uploads/merge/' + name, {
        start: startPos
      }) ).on('finish', () => {
        countFile++;
        if (files.length === countFile) {
          fs.rm(nameDir, {
            recursive: true
          }, () => {})
        }
          });
      startPos += fs.statSync(filePath).size;
    })
  }
  
  @Get()
  getHello(): string {
    this.logger.log('hahaha', AppController.name);
    // for (let i = 0; i < 1000000; i++) {
    //   this.members.push('member ' + i);
    // }
    // this.logger.warn('222', AppController.name);
    // this.logger.debug('333', AppController.name);
    // this.logger.verbose('444', AppController.name);
    // this.logger.error('555', AppController.name);
    return this.appService.getHello();
  }
  @Post('upload-large')
  @UseInterceptors(FilesInterceptor('files', 20, {
    dest: 'uploads',
  }))
  uploadLargeFile(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body: {name: string}) {
    console.log("files >>>", files);
    console.log("body >>>", body);
    const fileName = body.name.match(/(.+)-\d+$/)?.[1] ?? body.name;
    const nameDir = 'uploads/chunks-' + fileName;

    // make file
    if (!fs.existsSync(nameDir)) {
      fs.mkdirSync(nameDir);
    }

  // copy files
  fs.cpSync(files[0].path, nameDir + '/' + body.name);
  // remove 
  fs.rmSync(files[0].path);
    return files;
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    dest: 'uploads',
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 3,
    },
    fileFilter: (req, file, cb) => {
      // estName
      const extName = path.extname(file.originalname);
      if (['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp'].includes(extName)) {
        cb(null, true);
      } else {
        cb(new BadRequestException('Only images are allowed'), false);
      }
    }
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log("upload file ->>>", file.path);
    return file.path;
  }
}
