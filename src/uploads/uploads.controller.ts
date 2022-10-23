import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

@Controller('uploads')
export class UploadsController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file:Express.Multer.File) {
    AWS.config.update({
      credentials: {
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });

    try {
      // ! 버킷을 생성한다면 아래를 실행
      // const upload = await new AWS.S3()
      //   .createBucket({
      //     Bucket: 'nestjs-bucket',
      //   })
      //   .promise();
      const objectName = `${Date.now() + file.originalname}`;
      await new AWS.S3()
        .putObject({
          Body: file.buffer,
          Bucket: BUCKET_NAME,
          Key: `${Date.now() + file.originalname}`,
          ACL: 'public-read',
        })
        .promise();
      const fileUrl = `https//${BUCKET_NAME}.s3/amazonaws.com/${objectName}`;
      return fileUrl;
    } catch (error) {
      return null;
    }
  }
}
