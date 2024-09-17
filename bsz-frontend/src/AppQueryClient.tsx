import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';

const queryClient: QueryClient = new QueryClient();

function AppQueryClient() {
    
    return (
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
  }
  
  export default AppQueryClient;
  