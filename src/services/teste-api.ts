import axios from 'axios';

// Configurando a instância do Axios
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // Base URL da API
  timeout: 5000, // Tempo limite de 5 segundos
});

// Função para simular um atraso (delay)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Função para buscar usuários com delay
export const getUsers = async () => {
  try {
   /*  console.log('Iniciando a requisição para obter usuários...'); */
    await delay(2000); // Atraso artificial de 2 segundos
    const response = await api.get('/users'); // Endpoint para obter os usuários
 /*    console.log('Requisição concluída.'); */
    return response.data; // Retorna os dados da resposta
  } catch (error) {
/*     console.error('Erro ao buscar usuários:', error); */
    throw error; // Repassa o erro para ser tratado externamente
  }
};
