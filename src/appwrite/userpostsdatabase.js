import { Client, Databases, Query } from "appwrite";

import conf from "../conf/conf.js";
export class postsdatabaseclass {
  client = new Client();
  database;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.database = new Databases(this.client);
  }
  async createpost(slug,{  title, content, featuredimage, status, userid }) {
    try {
      return await this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featuredimage, status, userid }
      );
    } catch (error) {
      throw error;
    }
  }
  async updatepost( slug,{ title, content, featuredimage, status, userid }) {
    try {
      return await this.database.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featuredimage, status, userid }
      );
    } catch (error) {
      throw error;
    }
  }

  async deletepost(slug) {
    try {
      await this.database.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      throw error;
    }
  }
  async getpost(slug) {
    try {
      return this.database.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }
  async getposts() {
    try {
      return await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.equal("status", "active")]
      );
    } catch (error) {
      throw error;
    }
  }
}
const postsdatabaseobj = new postsdatabaseclass();
export default postsdatabaseobj;
