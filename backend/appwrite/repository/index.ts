import UserRepository from "./user.repository";
import AppWriteClient from "../config/appwrite.client";

class RepositoryManager {
  private static instance: RepositoryManager;

  public userRepository: UserRepository;

  private constructor() {
    this.userRepository = new UserRepository(AppWriteClient.databases);
  }

  static getInstance(): RepositoryManager {
    if (!this.instance) {
      this.instance = new RepositoryManager();  
    }
    return this.instance;
  }
}

export default RepositoryManager.getInstance();

