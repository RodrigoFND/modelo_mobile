import { getUsers } from '@/src/services/teste-api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const userStoreQueryKey = 'users'


/* export const useGetUsers = () => {

    // Hook para consultar os usuários
    const usersQuery = useQuery({
      queryKey: ['users'], // Chave única para identificar a consulta no cache
      queryFn: getUsers,   // Função que busca os dados
      staleTime: 0, // Os dados são considerados frescos por 5 minutos
      gcTime: 0,   // Tempo que os dados permanecem no cache após expirar
      retry: 2, // Tenta novamente no caso de erro (máx: 2 vezes)
      refetchOnWindowFocus: true,
      refetchOnReconnect: true, // Faz refetch ao reconectar à rede
    });
  
    if (usersQuery.isError) {
      console.log("error");
    }
  
    return {
      ...usersQuery, // Inclui dados, estado de loading, erro, etc.
    };
  }; */

  export const useGetUsers = () => {
    const usersQuery = useQuery({
      queryKey: ['users'],
      queryFn: async () => {
      /*   console.log('Fetching users...'); // Verifique quando a função é executada */
        return getUsers(); // Substitua pelo seu método real
      },
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      staleTime: 5000, // Os dados nunca são considerados frescos
 
      retry: 2, // Número de tentativas em caso de erro
    });
  

    return {...usersQuery};
  };

  export const updateUser = () => {
    const queryClient = useQueryClient();
    queryClient.invalidateQueries({ queryKey: ['users'] });
  }

  export const useUserStore = {
    queryKey: userStoreQueryKey,
    useGetUsers: useGetUsers,
    updateUser: updateUser,

}
