import AuthService from "./auth.service";
import AppWriteClient from "../config/appwrite.client";
import RepositoryManager from "../repository";

class ServiceManager {
  private static instance: ServiceManager;

  public authService: AuthService;

  private constructor() {
    this.authService = new AuthService(
      AppWriteClient.account,
      RepositoryManager,
      AppWriteClient.avatars,
      AppWriteClient.teams
    );
  }

  static getInstance(): ServiceManager {
    if (!this.instance) {
      this.instance = new ServiceManager();
    }
    return this.instance;
  }
}

export default ServiceManager.getInstance();
