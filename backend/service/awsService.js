import { PutObjectCommand } from '@aws-sdk/client-s3';
import s3 from '../config/aws.js';

import dotenv from 'dotenv';
dotenv.config();


export async function uploadToS3(file) {
  console.log('📂 Uploading file to S3:', file.originalname);

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `resumes/${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const command = new PutObjectCommand(params);
    const response = await s3.send(command);
    console.log('✅ S3 Upload Success:', response);

    const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
    return fileUrl;
  } catch (error) {
    console.error('❌ S3 Upload Error:', error);
    throw new Error(`Error uploading to S3: ${error.message}`);
  }
}
