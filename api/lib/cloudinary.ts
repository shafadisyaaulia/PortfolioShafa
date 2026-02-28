import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload image to Cloudinary
export async function uploadImage(
  fileBuffer: Buffer,
  folder: string = 'portfolio'
): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [
          { width: 1200, height: 900, crop: 'limit' }, // Max size
          { quality: 'auto' }, // Auto quality
          { fetch_format: 'auto' }, // Auto format (WebP untuk browser modern)
        ],
      },
      (error, result) => {
        if (error) {
          console.error('❌ Cloudinary upload error:', error);
          reject(error);
        } else if (result) {
          console.log('✅ Image uploaded:', result.secure_url);
          resolve(result.secure_url);
        } else {
          reject(new Error('Upload failed - no result'));
        }
      }
    ).end(fileBuffer);
  });
}

// Delete image from Cloudinary
export async function deleteImage(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
    console.log('✅ Image deleted:', publicId);
  } catch (error) {
    console.error('❌ Cloudinary delete error:', error);
    throw error;
  }
}

// Get optimized image URL
export function getOptimizedUrl(
  publicId: string,
  width?: number,
  height?: number
): string {
  return cloudinary.url(publicId, {
    width,
    height,
    crop: 'fill',
    quality: 'auto',
    fetch_format: 'auto',
  });
}

export default cloudinary;
