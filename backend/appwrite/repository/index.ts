import UserRepository from "./user.repository";
import AppWriteClient from "../config/appwrite.client";
import TesteRepository from "./teste.repository";

class RepositoryManager {
  private static instance: RepositoryManager;

  public userRepository: UserRepository;
  public testeRepository: TesteRepository;
  private constructor() {
    this.userRepository = new UserRepository(AppWriteClient.databases);
    this.testeRepository = new TesteRepository(AppWriteClient.databases);
  }

  static getInstance(): RepositoryManager {
    if (!this.instance) {
      this.instance = new RepositoryManager();
    }
    return this.instance;
  }
}

export default RepositoryManager.getInstance();
