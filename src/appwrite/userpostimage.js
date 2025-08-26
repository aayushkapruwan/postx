import { Client, Storage, ID } from "appwrite";
import conf from "../conf/conf.js";

export class postsimageclass {
  client = new Client();
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.bucket = new Storage(this.client);
  }

  // ✅ Upload file and return file URL
  async uploadfile(file) {
    try {
      // Step 1: Upload file
      const response = await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );

      // ✅ Use getFileView instead of getFilePreview
      const fileUrl = this.bucket.getFileView(
        conf.appwriteBucketId,
        response.$id
      );

      // Step 3: Return response + URL
      return { ...response, fileUrl };
    } catch (error) {
      throw error;
    }
  }

  // ✅ Delete file by ID
  async deletefile(fileid) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileid);
      return true;
    } catch (error) {
      throw error;
    }
  }

  // ✅ Get file URL from existing file ID
  async filepreview(fileid) {
    try {
      return this.bucket.getFileView(conf.appwriteBucketId, fileid);
    } catch (error) {
      throw error;
    }
  }
}

const postsimageobj = new postsimageclass();
export default postsimageobj;
