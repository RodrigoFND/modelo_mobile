import secureStore from '../secureStore';



export const tokenCache = {
  getToken: async (key: string): Promise<string | null> => {
    return await secureStore.getFromSecureStorage(key) as string | null;
  },
  saveToken: async (key: string, token: string): Promise<void> => {
    await secureStore.saveToSecureStorage(key, token);
  }
};


