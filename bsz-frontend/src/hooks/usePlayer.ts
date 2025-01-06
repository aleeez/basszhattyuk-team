import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PlayerType } from '../dto/PlayerType';
import { PlayerProfileDTO } from '../dto/PlayerUpdateDTO';
import { PatchPayloadDTO } from '../dto/PatchPayloadDTO';

export const usePlayers = () => {
    return useQuery<PlayerType[]>('players', async () => {
      const response = await axios.get('http://localhost:8080/players');
      return response.data;
    });
  };

  export const usePlayer = () => {
    return useQuery<PlayerProfileDTO>('players', async () => {
      const response = await axios.get('http://localhost:8080/players/profile/4');
      return response.data;
    });
  };
  
  
  export const useCreatePlayer = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
  
    return useMutation(
      (newPlayer: PlayerType) =>
        axios.post('http://localhost:8080/players/register', newPlayer, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }),
      {
        onSuccess: () => {
          queryClient.invalidateQueries('players');
          navigate('/');
        },
      }
    );
  };
  
  
  export const useUpdatePlayer = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
  
    return useMutation(
      ({ id, data }: { id: string; data: PlayerType }) => axios.put(`http://localhost:8080/players/${id}`, data),
      {
        onSuccess: () => {
          queryClient.invalidateQueries('players');
          navigate('/');
        },
      },
    );
  };

  
  export const usePatchPlayer = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
  
    return useMutation(
      
      ( data  : PatchPayloadDTO[]) => axios.patch(`http://localhost:8080/players/patch/4`, data, {
        headers: {
          'Content-Type': 'application/json-patch+json',
        },
      }) ,
      {
        onSuccess: () => {
          queryClient.invalidateQueries('players');
          navigate('/profile');
        },
      }
    );
  };
  