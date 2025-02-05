import { Teste } from "@/src/models/services/teste.models";
import ApiClient from "../service";

export const TesteService = {
  async getTestes(): Promise<Teste[]> {
    return await ApiClient.teste.getTestes();
  },

  async getTesteById(documentId: string): Promise<Teste> {
    return await ApiClient.teste.getTesteById(documentId);
  },

  async createTeste(valor: number, nome: string): Promise<Teste> {
    console.log("createTeste service");
    console.log(valor, nome);
    return await ApiClient.teste.createTeste(valor, nome);
  },


  async updateTeste(documentId: string, valor: number, nome: string) {
    return await ApiClient.teste.updateTeste(documentId, valor, nome);
  },

  async deleteTeste(documentId: string) {
    return await ApiClient.teste.deleteTeste(documentId);
  },
};
