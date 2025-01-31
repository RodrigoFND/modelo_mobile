import ApiClient from "../service";


export const AuthAPI = {

  async getCurrentSession(): Promise<any> {
    return await ApiClient.auth.getCurrentSession();
  },

  async register(email: string, password: string, username: string): Promise<any> {
    return await ApiClient.auth.registerUser(email, password, username);
  },

  async login(email: string, password: string): Promise<any> {
    return await ApiClient.auth.loginUser(email, password);
  },

  async logout(): Promise<any> {
    return await ApiClient.auth.logoutUser()
  }
  
};


