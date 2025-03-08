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
  async uploadfile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      throw error;
    }
  }
  async deletefile(fileid) {
    try {
         await this.bucket.deleteFile(conf.appwriteBucketId, fileid);
         return true
    } catch (error) {
      throw error;
    }
  }
  async filepreview(fileid) {
    try {
        return await this.bucket.getFilePreview(conf.appwriteBucketId, fileid);
    } catch (error) {
      throw error;
    }
  }
  
}

const postsimageobj=new postsimageclass();
export default postsimageobj
