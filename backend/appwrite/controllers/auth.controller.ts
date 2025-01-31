import AuthService from "../services/auth.service";
import ServiceManager from "../services";

class AuthController {
  private authService: AuthService;

  constructor(services: typeof ServiceManager) {
    this.authService = services.authService;;
  }

  async getCurrentSession() {
    return await this.authService.getCurrentSession();
  }

  async registerUser(email: string, password: string, username: string) {
    const user = await this.authService.register(email, password, username);
    return user;
  }

  async loginUser(email: string, password: string) {
    return await this.authService.login(email, password);
  }

  async logoutUser() {
    return await this.authService.logout()
  }
}

export default AuthController;
