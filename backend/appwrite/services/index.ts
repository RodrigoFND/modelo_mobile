import AuthService from "./auth.service";
import AppWriteClient from "../config/appwrite.client";
import RepositoryManager from "../repository";
import TesteService from "./teste.service";
class ServiceManager {
  private static instance: ServiceManager;

  public authService: AuthService;
  public testeService: TesteService;

  private constructor() {
    this.authService = new AuthService(
      AppWriteClient.account,
      RepositoryManager,
      AppWriteClient.avatars,
      AppWriteClient.teams
    );
    this.testeService = new TesteService(RepositoryManager.testeRepository);
  }

  static getInstance(): ServiceManager {
    if (!this.instance) {
      this.instance = new ServiceManager();
    }
    return this.instance;
  }
}

export default ServiceManager.getInstance();
