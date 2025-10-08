import conf from "../../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });

      // Optionally: auto login after sign-up
      const session = await this.login({ email, password });
      return { user: userAccount, session };
    } catch (error) {
      console.error("Error in createAccount:", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      // In newer SDK, the method is createEmailPasswordSession
      const session = await this.account.createEmailPasswordSession({
        email,
        password,
      });

      return session;
    } catch (error) {
      console.error("Error in login:", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      console.error("Error in getCurrentUser:", error);
      // you might want to rethrow or return null depending on use-case
      throw error;
    }
  }

  async logout() {
    try {
      // Deletes all the user’s sessions
      const result = await this.account.deleteSessions();
      return result;
    } catch (error) {
      console.error("Error in logout:", error);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
