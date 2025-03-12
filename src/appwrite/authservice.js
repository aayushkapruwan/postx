import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) 
      .setProject(conf.appwriteProjectId); 

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, Name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        Name
      );

      if (userAccount) {
        return this.accountLogin({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async accountLogin({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw`${error}: Error in Login `;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(error);
      
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions(); // Logs out from all sessions
    } catch (error) {
      throw error;
    }
  }
}

const authServiceInstance = new AuthService();
export default authServiceInstance;



