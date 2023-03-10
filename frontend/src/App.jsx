import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LinkProduct from './pages/LinkProduct';
import LinkProductClient from './pages/LinkProductClient';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import { useAuth } from './store/useAuth';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  const queryClient = new QueryClient();
  const user = useAuth((state) => state.user);
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Navigate to="/home" />} /> */}
          <Route path="/" element={<Navigate to="/404" />} />
          <Route path="/*" element={<Navigate to="/404" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/404" element={<NotFound />} />
          {user && (
            <>
              <Route path="/links" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/links/:id" element={<LinkProduct />} />
            </>
          )}

          <Route
            path="/link-products/:username"
            element={<LinkProductClient />}
          />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
