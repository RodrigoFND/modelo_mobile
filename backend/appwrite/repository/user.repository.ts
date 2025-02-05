import { AppwriteException, Databases, ID, Query } from "react-native-appwrite";
import { DATABASE_CONFIG } from "../config/database.config";

interface UserDocument {
  documentId: string;
  accountId: string;
  username: string;
  email: string;
  avatar: URL;
  createdAt: Date;
  updatedAt: Date;
}

class UserRepository {
  private databases: Databases;

  constructor(databases: Databases) {
    this.databases = databases;
  }

  async createUserDocument(
    userId: string,
    email: string,
    username: string,
    avatarUrl: URL
  ) {
    try {
      return await this.databases.createDocument(
        DATABASE_CONFIG.databaseId,
        DATABASE_CONFIG.collections.users,
        ID.unique(),
        {
          accountId: userId,
          email,
          username,
          avatar: avatarUrl,
        }
      );
    } catch (error: AppwriteException | any) {
      throw {
        code: error?.code || 500, // 🔹 Mantém o código HTTP original
        message: `Erro ao criar documento do usuário: ${
          error?.message || "Erro desconhecido"
        }`,
      };
    }
  }

  async getUsers() {
    try {
      return await this.databases.listDocuments(
        DATABASE_CONFIG.databaseId,
        DATABASE_CONFIG.collections.users
      );
    } catch (error: AppwriteException | any) {
      throw {
        code: error?.code || 500, // 🔹 Mantém o código HTTP original
        message: `Erro ao buscar documentos do usuário: ${
          error?.message || "Erro desconhecido"
        }`,
      };
    }
  }

  async getUserDocument(userId: string): Promise<UserDocument> {
    try {
      const user = await this.databases.listDocuments(
        DATABASE_CONFIG.databaseId,
        DATABASE_CONFIG.collections.users,
        [Query.equal("accountId", userId)]
      );
      return user.documents[0] as unknown as UserDocument;
    } catch (error: AppwriteException | any) {
      throw {
        code: error?.code || 500, // 🔹 Mantém o código HTTP original
        message: `Erro ao buscar documento do usuário: ${
          error?.message || "Erro desconhecido"
        }`,
      };
    }
  }
}

export default UserRepository;
