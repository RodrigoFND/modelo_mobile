import { Client, Account, ID, Databases, Avatars, Teams } from 'react-native-appwrite';
import Env from '../../../src/env';

// Configuração Singleton do AppWrite
class AppWriteClient {
  private static instance: AppWriteClient;
  private client: Client;
  public account: Account;
  public databases: Databases;
  public avatars: Avatars;
  public teams:Teams
  

  private constructor() {
    this.client = new Client()
      .setEndpoint(Env.appwriteEndpoint)
      .setProject(Env.appwriteProjectId)
      .setPlatform('com.rodrigo.standard');

    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
    this.avatars = new Avatars(this.client);
    this.teams = new Teams(this.client);
  }

  static getInstance(): AppWriteClient {
    if (!this.instance) {
      this.instance = new AppWriteClient();
    }
    return this.instance;
  }
}

export default AppWriteClient.getInstance();