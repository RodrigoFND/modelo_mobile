import TesteService from "../services/teste.service";
import ServiceManager from "../services";
class TesteController {
  private testeService: TesteService;

  constructor(services: typeof ServiceManager) {
    this.testeService = services.testeService;
  }

  async getTestes() {
    return this.testeService.getTestes();
  }

  async getTesteById(documentId: string) {
    return this.testeService.getTesteById(documentId);
  }


  async createTeste(valor: number, nome: string) {
    return this.testeService.createTeste(valor, nome);
  }

  async updateTeste(documentId: string, valor: number, nome: string) {
    return this.testeService.updateTeste(documentId, valor, nome);
  }


  async deleteTeste(documentId: string) {
    return this.testeService.deleteTeste(documentId);
  }
}

export default TesteController;
