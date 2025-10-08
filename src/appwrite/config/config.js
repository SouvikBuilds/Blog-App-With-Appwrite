import conf from "../../conf/conf.js";
import { Client, TablesDB, Query, Storage, ID } from "appwrite";

export class Service {
  client = new Client();
  tables;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.tables = new TablesDB(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.tables.createRow({
        databaseId: conf.appwriteDBId,
        tableId: conf.appwriteCollectionId,
        rowId: slug, // or ID.unique()
        data: {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
        // set permissions as needed, e.g.:
        permissions: [
          /* e.g. Permission.read(Role.any()), Permission.update(...), etc. */
        ],
      });
    } catch (error) {
      console.error("Appwrite Service :: createPost :: Error", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.tables.updateRow({
        databaseId: conf.appwriteDBId,
        tableId: conf.appwriteCollectionId,
        rowId: slug,
        data: {
          title,
          content,
          featuredImage,
          status,
        },
        // Optionally: new permissions or keep existing
      });
    } catch (error) {
      console.error("Appwrite Service :: updatePost :: Error", error);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.tables.deleteRow({
        databaseId: conf.appwriteDBId,
        tableId: conf.appwriteCollectionId,
        rowId: slug,
      });
      return true;
    } catch (error) {
      console.error("Appwrite Service :: deletePost :: Error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.tables.getRow({
        databaseId: conf.appwriteDBId,
        tableId: conf.appwriteCollectionId,
        rowId: slug,
      });
    } catch (error) {
      console.log("Appwrite Service :: getPost :: Error", error);
      return false;
    }
  }

  async getPosts() {
    try {
      return await this.tables.listRows({
        databaseId: conf.appwriteDBId,
        tableId: conf.appwriteCollectionId,
        queries: [Query.equal("status", "active")],
      });
    } catch (error) {
      console.log("Appwrite Service :: getAllPosts :: Error", error);
      return false;
    }
  }

  //   file upload services

  async uploadFile(file) {
    try {
      return await this.bucket.createFile({
        bucketId: conf.appwriteBucketId,
        fileId: ID.unique(),
        file,
      });
    } catch (error) {
      console.log("Appwrite Service :: uploadFile :: Error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile({
        bucketId: conf.appwriteBucketId,
        fileId: fileId,
      });
      return true;
    } catch (error) {
      console.log("Appwrite Service :: deleteFile :: Error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFileView({
      bucketId: conf.appwriteBucketId,
      fileId: fileId,
    });
  }
}

const appwriteService = new Service();
export default appwriteService;
