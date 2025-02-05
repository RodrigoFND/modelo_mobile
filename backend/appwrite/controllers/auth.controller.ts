import AuthService from "../services/auth.service";
import ServiceManager from "../services";
import { User } from "@/src/models/services/auth.models";

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

  async loginUser(email: string, password: string): Promise<User> {
    return await this.authService.login(email, password);
  }

  async logoutUser() {
    return await this.authService.logout()
  }

  async logoutAllSessions() {
    return await this.authService.logoutAllSessions()
  }

}

export default AuthController;
