import { Databases, ID, Query, AppwriteException } from "react-native-appwrite";
import { DATABASE_CONFIG } from "../config/database.config";

interface TesteDocument {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  nome: string;
  valor: number;
}

class TesteRepository {
  private databases: Databases;

  constructor(databases: Databases) {
    this.databases = databases;
  }

  // 📌 Obtém todos os documentos da coleção
  async getTestesDocuments(): Promise<TesteDocument[]> {
    try {
      const response = await this.databases.listDocuments(
        DATABASE_CONFIG.databaseId,
        DATABASE_CONFIG.collections.teste
      );
      return response.documents as unknown as TesteDocument[];
    } catch (error: AppwriteException | any) {

      throw {
        code: error?.code || 500, // 🔹 Mantém o código HTTP original
        message: `Erro ao buscar documentos: ${
          error?.message || "Erro desconhecido"
        }`,
      };
    }
  }

  // 📌 Obtém um único documento pelo ID (versão atualizada)
  async getTesteDocumentById(documentId: string): Promise<TesteDocument> {
    try {
      const response = await this.databases.listDocuments(
        DATABASE_CONFIG.databaseId,
        DATABASE_CONFIG.collections.teste,
        [Query.equal("$id", documentId)] // 🔹 Busca pelo ID usando Query.equal
      );

      if (response.documents.length === 0) {
        throw new Error(`Documento com ID ${documentId} não encontrado.`);
      }

      return response.documents[0] as unknown as TesteDocument;
    } catch (error: AppwriteException | any) {

      throw {
        code: error?.code || 500, // 🔹 Mantém o código HTTP original
        message: `Erro ao buscar documento ${documentId}: ${
          error?.message || "Erro desconhecido"
        }`,
      };
    }
  }

  // 📌 Cria um novo documento
  async createTesteDocument(
    valor: number,
    nome: string
  ): Promise<TesteDocument> {
    try {
      const teste = await this.databases.createDocument(
        DATABASE_CONFIG.databaseId,
        DATABASE_CONFIG.collections.teste,
        ID.unique(),
        { valor, nome }
      );
      return teste as unknown as TesteDocument;
    } catch (error) {
      throw new Error("Falha ao criar documento.");
    }
  }

  // 📌 Atualiza um documento existente
  async updateTesteDocument(
    documentId: string,
    valor: number,
    nome: string
  ): Promise<TesteDocument> {
    try {
      return (await this.databases.updateDocument(
        DATABASE_CONFIG.databaseId,
        DATABASE_CONFIG.collections.teste,
        documentId,
        { valor, nome }
      )) as unknown as TesteDocument;
    } catch (error: AppwriteException | any) {
      throw {
        code: error?.code || 500, // 🔹 Mantém o código HTTP original
        message: `Erro ao atualizar documento ${documentId}: ${
          error?.message || "Erro desconhecido"
        }`,
      };
    }
  }

  // 📌 Exclui um documento pelo ID
  async deleteTesteDocument(documentId: string): Promise<void> {
    try {
      await this.databases.deleteDocument(
        DATABASE_CONFIG.databaseId,
        DATABASE_CONFIG.collections.teste,
        documentId
      );
    } catch (error: AppwriteException | any) {
      throw {
        code: error?.code || 500, // 🔹 Mantém o código HTTP original
        message: `Erro ao deletar documento ${documentId}: ${
          error?.message || "Erro desconhecido"
        }`,
      };
    }
  }
}

export default TesteRepository;
