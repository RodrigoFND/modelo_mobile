import UserRepository from '../repository/user.repository';
import { Account, Avatars, Teams, ID } from 'react-native-appwrite';
import RepositoryManager from '../repository';


class AuthService {
  private account: Account;
  private userRepository: UserRepository;
  private avatars: Avatars;
  private teams: Teams;

  constructor(account: Account, repositoryManager: typeof RepositoryManager, avatars: Avatars, teams: Teams) {
    this.account = account;
    this.userRepository = repositoryManager.userRepository;
    this.avatars = avatars;
    this.teams = teams;
  }


  async getCurrentSession() {
    return await this.account.get();
  }

  async register(email: string, password: string, username: string) {
    const user = await this.account.create(ID.unique(), email, password, username);
    const avatarUrl = this.avatars.getInitials(username);
    await this.userRepository.createUserDocument(user.$id, email, username,avatarUrl);
    return user;
  }

  async login(email: string, password: string) {
    try {
      // 🔹 Autentica o usuário
      const session = await this.account.createEmailPasswordSession(email, password);
  
      // 🔹 Inicializa `teams` como array vazio para evitar erro se a chamada falhar
      let userTeams: { id: string; name: string; permissions: string[] }[] = [];
  
      try {
        const teamsList = await this.teams.list();
        
        console.log("teamsList Raw Data:", teamsList);
  
        userTeams = teamsList.teams.map(team => {
          console.log("Team Prefs:", team.prefs); 
          return {
            id: team.$id,
            name: team.name,
            permissions: typeof team.prefs === "object" && team.prefs !== null 
            ? Object.keys(team.prefs) 
            : [],
          };
        });

      } catch (error) {
        console.warn("Usuário logado, mas erro ao buscar os teams:", error);
      }
  
      // 🔹 Retorna os dados no formato `User`
      return {
        id: session.userId,
        email: session.providerUid,
        teams: userTeams,
      };
  
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      throw new Error("Falha na autenticação");
    }
  }
  

  async logout() {
    return await this.account.deleteSession('current');
  }
}

export default AuthService;
