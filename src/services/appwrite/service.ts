import { authController, testeController } from "@/backend/appwrite";
import { EventEmitter } from "eventemitter3";

class ApiClient {
  private static instance: ApiClient;

  public auth;
  public teste;
  public experiedSessionEvent: EventEmitter;

  private constructor() {
    this.auth = this.createProxy(authController);
    this.teste = this.createProxy(testeController);
    this.experiedSessionEvent = new EventEmitter();
  }



  static getInstance(): ApiClient {
    if (!this.instance) {
      this.instance = new ApiClient();
    }
    return this.instance;
  }

  private async handleRequest<T>(callback: () => Promise<T>): Promise<T> {
    try {
      console.log("handleRequest", callback);
      return await callback();
    } catch (error: any) {
  /*     console.error("Erro na API:", error);*/
      console.log("error code", error); 

      if (error?.code === 401) {
    /*     console.warn("Sessão expirada. Redirecionando para login..."); */
        this.experiedSessionEvent.emit("sessionExpired");
        return Promise.reject({ message: "Usuário inválido ou sessão expirada", code: 401 });
      }

      if (error?.code === 403) {
        return Promise.reject({ message: "Acesso negado", code: 403 });
      }

      if (error?.code === 500) {
        return Promise.reject({ message: "Erro interno no servidor", code: 500 });
      }


      return Promise.reject(error?.message || error);
    }
  }

  private createProxy<T extends object>(controller: T): T {
    return new Proxy(controller, {
      get: (target, prop: string | symbol) => {
        if (typeof target[prop as keyof T] === "function") {
          return (...args: any[]) => this.handleRequest(() => (target[prop as keyof T] as Function)(...args));
        }
        return target[prop as keyof T];
      }
    });
  }
}

export default ApiClient.getInstance();
