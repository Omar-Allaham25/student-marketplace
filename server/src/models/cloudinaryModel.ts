import cloudinary from "../config/cloudinary";

export const uploadImageToCloudinary = (
  fileBuffer: Buffer,
  folder:string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
      },
      (error, result) => {
        if (error) return reject(error);
        if (result) return resolve(result.secure_url);
        reject(new Error("Cloudinary upload failed"));
      },
    );
    uploadStream.end(fileBuffer);
  });
};
