import ServiceManager from '../services';
import AuthController from './auth.controller';


class ControllerManager {
  private static instance: ControllerManager;
  public authController: AuthController;

  private constructor() {
    this.authController = new AuthController(ServiceManager);
  }

  static getInstance(): ControllerManager {
    if (!this.instance) {
      this.instance = new ControllerManager();
    }
    return this.instance;
  }
}

export default ControllerManager.getInstance();
