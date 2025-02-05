import TesteRepository from "../repository/teste.repository";

class TesteService {
    private testeRepository: TesteRepository;

    constructor(testeRepository: TesteRepository) {
        this.testeRepository = testeRepository;
    }

    async createTeste(valor: number, nome: string) {
        return this.testeRepository.createTesteDocument(valor, nome);
    }

    async getTestes() {
        return this.testeRepository.getTestesDocuments();
    }


    async getTesteById(documentId: string) {
        return this.testeRepository.getTesteDocumentById(documentId);
    }

    async updateTeste(documentId: string, valor: number, nome: string) {
        return this.testeRepository.updateTesteDocument(documentId, valor, nome);
    }


    async deleteTeste(documentId: string) {
        return this.testeRepository.deleteTesteDocument(documentId);
    }
    
}

export default TesteService;

