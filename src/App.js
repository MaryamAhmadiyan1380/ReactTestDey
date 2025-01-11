import { RouterProvider } from 'react-router-dom';
import {QueryClient , QueryClientProvider} from 'react-query'
import router from './router'
import './App.css';

function App() {
  const client = new QueryClient({defaultOptions : {
    queries : {refetchOnWindowFocus : false}
  }})
  return (
    <div className="App">
     <QueryClientProvider client={client}>
    <RouterProvider router={router} />
     </QueryClientProvider>
    
    </div>
  );
}

export default App;
