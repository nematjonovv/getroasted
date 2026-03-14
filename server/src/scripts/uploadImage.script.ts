import cloudinary from "../config/cloudinary"
type CloudinaryUploadResult = {
  public_id: string;
  secure_url: string;
  width?: number;
  height?: number;
  format?: string;
};
export async function uploadImage(file: Express.Multer.File) {
  const upload = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder: "roastmyportfolio" }, (error, result) => {
      if (error) reject(error)
      else resolve(result as CloudinaryUploadResult)
    }).end(file.buffer)
  })

  const transformedUrl = cloudinary.url(upload.public_id, {
    transformation: [
      { quality: "auto", fetch_format: "auto" },
      { width: 1200, height: 500, crop: "limit" },
    ],
  });

  return {
    public_id: upload.public_id,
    secure_url: upload.secure_url,
    transformed_url: transformedUrl,
  };
}
