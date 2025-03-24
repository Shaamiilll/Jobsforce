import { PutObjectCommand, GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';
dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function uploadToS3(file) {
  console.log('📂 Uploading file to S3:', file.originalname);

  const fileKey = `resumes/${Date.now()}-${file.originalname}`;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileKey,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    // Upload the file to S3
    const command = new PutObjectCommand(params);
    await s3.send(command);
    console.log('✅ S3 Upload Success');

    // Generate a signed URL for secure access (valid for 1 hour)
    const getObjectCommand = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileKey,
    });

    const signedUrl = await getSignedUrl(s3, getObjectCommand, { expiresIn: 3600 });
    console.log('🔗 Signed URL:', signedUrl);

    return signedUrl;
  } catch (error) {
    console.error('❌ S3 Upload Error:', error);
    throw new Error(`Error uploading to S3: ${error.message}`);
  }
}
