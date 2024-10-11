import { useQuery } from 'react-query';
import axios from 'axios';

export const useHelloWorld = () => {
  return useQuery<string>('helloWorld', async () => {
    const response = await axios.get('http://localhost:8080/api/hello');
    return response.data;
  });
};
