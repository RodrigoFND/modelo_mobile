import ServiceManager from '../services';
import AuthController from './auth.controller';
import TesteController from './teste.controller';


class ControllerManager {
  private static instance: ControllerManager;
  public authController: AuthController;
  public testeController: TesteController;

  private constructor() {
    this.authController = new AuthController(ServiceManager);
    this.testeController = new TesteController(ServiceManager);
  }

  static getInstance(): ControllerManager {
    if (!this.instance) {
      this.instance = new ControllerManager();
    }
    return this.instance;
  }
}

export default ControllerManager.getInstance();
