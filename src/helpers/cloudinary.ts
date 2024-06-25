import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

export const uploadOnCloudinary = async (localFilePath:string) => {
    try {
        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })
        console.log(`The file has been successfully uploaded on cloudinary`)
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.error(`Cloudinary upload error ${error}`)
    }
}

export const deleteFromCloudinary = async (uris:[String], resource_type="image") => {
    try {
        const publicIds = uris.map(uri => (
            uri?.split("/")?.[7]?.split(".")[0]
        ))

        await cloudinary.api.delete_resources(publicIds,{
            resource_type,
            type: "upload",
            invalidate: true,
        })
        console.log("File has been successfully deleted from the cloudinary")

    } catch (error) {
        console.error("Error while deleting file from cloudinary ", error)
    }
}