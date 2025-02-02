import { User } from "@/src/models/services/auth/auth.models";
import ApiClient from "../service";


export const AuthAPI = {

  async getCurrentSession(): Promise<User | null> {
    return await ApiClient.auth.getCurrentSession();
  },


  async register(email: string, password: string, username: string): Promise<User> {
    return await ApiClient.auth.registerUser(email, password, username);
  },


  async login(email: string, password: string): Promise<User> {
    const res = await ApiClient.auth.loginUser(email, password);
    console.log("res", res);
    return res
  },


  async logout(): Promise<void> {
    return await ApiClient.auth.logoutUser()
  }

  
};


