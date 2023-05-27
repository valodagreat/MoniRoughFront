import './App.css';
import AllRoutes from './config/routes';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient} >
      <ToastContainer />
      <AllRoutes />
    </QueryClientProvider>
  );
}

export default App;
