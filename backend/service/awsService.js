import s3 from '../config/aws.js';

export async function uploadToS3(file) {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `resumes/${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location;
  } catch (error) {
    throw new Error('Error uploading to S3');
  }
}
