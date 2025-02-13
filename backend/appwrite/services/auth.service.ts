import UserRepository from "../repository/user.repository";
import {
  Account,
  Avatars,
  Teams,
  ID,
  AppwriteException,
} from "react-native-appwrite";
import RepositoryManager from "../repository";
import {
  PermissionsList,
  Roles,
  Team,
  User,
} from "@/src/models/services/auth.models";

class AuthService {
  private account: Account;
  private userRepository: UserRepository;
  private avatars: Avatars;
  private teams: Teams;

  constructor(
    account: Account,
    repositoryManager: typeof RepositoryManager,
    avatars: Avatars,
    teams: Teams
  ) {
    this.account = account;
    this.userRepository = repositoryManager.userRepository;
    this.avatars = avatars;
    this.teams = teams;
  }

  /** 🔹 Obtém a sessão atual e retorna um `User` com dados completos */
  async getCurrentSession(): Promise<User | null> {
    try {
      const session = await this.account.get();
      return await this.buildUser(session.$id);
    } catch (error: AppwriteException | any) {
      throw {
        code: error?.code || 500, // 🔹 Mantém o código HTTP original
        message: `Erro ao obter sessão do usuário: ${
          error?.message || "Erro desconhecido"
        }`,
      };
    }
  }

  /** 🔹 Registra um novo usuário e cria um documento no banco */
  async register(
    email: string,
    password: string,
    username: string
  ): Promise<void> {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        username
      );
      const avatarUrl = this.avatars.getInitials(username);
      await this.userRepository.createUserDocument(
        user.$id,
        email,
        username,
        avatarUrl
      );
    } catch (error: AppwriteException | any) {
      throw {
        code: error?.code || 500, // 🔹 Mantém o código HTTP original
        message: `Erro ao registrar usuário: ${
          error?.message || "Erro desconhecido"
        }`,
      };
    }
  }

  /** 🔹 Realiza login e retorna um `User` completo */
  async login(email: string, password: string): Promise<User> {
    try {
      // 🔹 Cria sessão
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );

      try {
        // 🔹 Tenta construir o usuário
        return await this.buildUser(session.userId);
      } catch (error: AppwriteException | any) {
        // 🔹 Se falhar ao construir usuário, desloga
        await this.account.deleteSession(session.$id);

        throw new Error("Falha ao carregar informações do usuário.");
      }
    } catch (error: AppwriteException | any) {
      throw {
        code: error?.code || 500, // 🔹 Mantém o código HTTP original
        message: `Erro ao realizar login: ${
          error?.message || "Erro desconhecido"
        }`,
      };
    }
  }

  /** 🔹 Constrói o objeto `User` completo, pegando os dados do banco e os times */
  private async buildUser(userId: string): Promise<User> {
    try {
      const user = await this.userRepository.getUserDocument(userId);
      let userTeams: Team[] = [];
      try {
        const teamsList = await this.teams.list();
        userTeams = teamsList.teams.map((team) => {
          return {
            id: team.$id,
            name: team.name as Roles,
            permissions:
              typeof team.prefs === "object" && team.prefs !== null
                ? (Object.keys(team.prefs) as PermissionsList[])
                : [],
          };
        });
      } catch (error: AppwriteException | any) {
        throw {
          code: error?.code || 500, // 🔹 Mantém o código HTTP original
          message: `Erro ao buscar times do usuário: ${
            error?.message || "Erro desconhecido"
          }`,
        };
      }

      // 🔹 Retorna o `User` com dados completos
      return {
        id: user.accountId,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        teams: userTeams,
      };
    } catch (error: AppwriteException | any) {
      throw {
        code: error?.code || 500, // 🔹 Mantém o código HTTP original
        message: `Erro ao buscar usuário do banco de dados: ${
          error?.message || "Erro desconhecido"
        }`,
      };
    }
  }

  /** 🔹 Faz logout e encerra a sessão */
  async logout(): Promise<void> {
    try {
      await this.account.deleteSession("current");
    } catch (error: AppwriteException | any) {
      throw {
        code: error?.code || 500, // 🔹 Mantém o código HTTP original
        message: `Erro ao fazer logout: ${
          error?.message || "Erro desconhecido"
        }`,
      };
    }
  }

  async logoutAllSessions(): Promise<void> {
    try {
      await this.account.deleteSessions();
    } catch (error: AppwriteException | any) {
      throw {
        code: error?.code || 500, // 🔹 Mantém o código HTTP original
        message: `Erro ao fazer logout de todas as sessões: ${
          error?.message || "Erro desconhecido"
        }`,
      };
    }
  }
}

export default AuthService;
