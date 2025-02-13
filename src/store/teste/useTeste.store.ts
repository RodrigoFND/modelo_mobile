import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TesteService } from "@/src/services/appwrite/teste/teste.service";
import { Teste } from "@/src/models/services/teste.models";

const testeStoreQueryKey = 'teste';

const useGetTestes = () => {
/* logica para desenvalidar os Ids individualmente   return useQuery({
    queryKey: [testeStoreQueryKey],
    queryFn: async () => {
      const data = await TesteService.getTestes();

      // ✅ Atualiza os caches individuais com os dados mais recentes
      data.forEach((teste) => {
        queryClient.setQueryData([testeStoreQueryKey, teste.documentId], teste);
      });

      return data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  }); */
  return useQuery({
    queryKey: [testeStoreQueryKey],
    queryFn: TesteService.getTestes,
    refetchOnWindowFocus:true, // apos o o tempo acabar(stale) reconecta no foco
    refetchOnReconnect:true, // apos o o tempo acabar(stale) reconecta no reconnect
    staleTime: 1000 * 30 * 1, // tempo de cache
    refetchInterval: 1000 * 30 * 1, // tempo de cache
/*     staleTime: 1000 * 60 * 5, // tempo de cache */
  /*   refetchInterval: 1000 * 60 * 5, // atualiza os dados automaticemnente */
   /*  refetchIntervalInBackground: true, // atualiza os dados automaticemnente em background */

  });
};

const useCreateTeste = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ valor, nome }: { valor: number; nome: string }) =>  
      TesteService.createTeste(valor, nome), // Supondo que retorna o objeto criado
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [testeStoreQueryKey] });
    },
    onError: (error) => {
      console.log("error");
      console.log(error);
    },
  });
};


const useGetByIdTeste = (documentId: string) => {
  return useQuery({
    queryKey: [testeStoreQueryKey, documentId],
    queryFn: () => TesteService.getTesteById(documentId),
    enabled: !!documentId, // 🔹 Evita chamadas desnecessárias
  });
};

const useUpdateTeste = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ documentId, valor, nome }: { documentId: string; valor: number; nome: string }) =>
      TesteService.updateTeste(documentId, valor, nome),
    onSuccess: ({$id}) => {
      queryClient.invalidateQueries({ queryKey: [testeStoreQueryKey, $id] });
      queryClient.invalidateQueries({ queryKey: [testeStoreQueryKey] });
    },

  });
};

const useDeleteTeste = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (documentId: string) => TesteService.deleteTeste(documentId), 
    onSuccess: (_, documentId) => {
      // ✅ Invalida o cache do item específico deletado
      queryClient.removeQueries({ queryKey: [testeStoreQueryKey, documentId] });

      // ✅ Invalida a lista geral para refletir a remoção
      queryClient.invalidateQueries({ queryKey: [testeStoreQueryKey] });
    },
  });
};

export const useTesteStore = {
  queryKey: testeStoreQueryKey,
  useGetTestes,
  useGetByIdTeste,
  useCreateTeste,
  useUpdateTeste,
  useDeleteTeste,
}
