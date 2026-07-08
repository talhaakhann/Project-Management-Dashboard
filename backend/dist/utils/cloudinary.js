import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const uploadAtCloudinary = async (localPath) => {
    try {
        if (!localPath)
            return null;
        const response = await cloudinary.uploader.upload(localPath, {
            resource_type: "image",
        });
        fs.unlink(localPath);
        return response;
    }
    catch (error) {
        fs.unlink(localPath);
        return null;
    }
};
//# sourceMappingURL=cloudinary.js.map