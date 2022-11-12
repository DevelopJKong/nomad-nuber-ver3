import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
@Injectable()
export class UploadsService {
  async uploadFile(file: Express.Multer.File) {
    const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
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
      const url = `https//${BUCKET_NAME}.s3/amazonaws.com/${objectName}`;
      return { url };
    } catch (error) {
      return null;
    }
  }
}
