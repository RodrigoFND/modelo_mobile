import { Databases, ID } from 'react-native-appwrite';
import { DATABASE_CONFIG } from '../config/database.config';

class UserRepository {
  private databases: Databases;

  constructor(databases: Databases) {
    this.databases = databases;
  }
  
  async createUserDocument(userId: string, email: string, username: string, avatarUrl: URL) {
    try {

      return await this.databases.createDocument(
        DATABASE_CONFIG.databaseId,
        DATABASE_CONFIG.collections.users,
        ID.unique(),
        {
          accountId: userId,
          email,
          username,
          avatar: avatarUrl
        }
      );
    } catch (error) {
      throw error;
    }
  }


  async getUsers() {
    try {
      return await this.databases.listDocuments(
        DATABASE_CONFIG.databaseId,
        DATABASE_CONFIG.collections.users
      );
    } catch (error) {
      throw error;
    }
  }

  async getUserDocument(userId: string) {
    try {
      return await this.databases.listDocuments(
        DATABASE_CONFIG.databaseId,
        DATABASE_CONFIG.collections.users,
        [`accountId=${userId}`]
      );
    } catch (error) {
      throw error;
    }
  }
}

export default UserRepository;
