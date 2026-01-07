import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export async function uploadToS3(
  file: Buffer,
  fileName: string,
  contentType: string
): Promise<string> {
  const key = `products/${Date.now()}-${fileName}`;
  
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: key,
    Body: file,
    ContentType: contentType,
    ACL: 'public-read',
  });

  try {
    await s3Client.send(command);
    const region = process.env.AWS_REGION || 'us-east-1';
    const bucket = process.env.AWS_S3_BUCKET_NAME;
    return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw new Error('Failed to upload image');
  }
}

export async function deleteFromS3(fileUrl: string): Promise<void> {
  const key = fileUrl.split('.com/')[1];
  
  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: key,
  });

  try {
    await s3Client.send(command);
  } catch (error) {
    console.error('Error deleting from S3:', error);
    throw new Error('Failed to delete image');
  }
}
