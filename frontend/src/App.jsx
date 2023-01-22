import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LinkProduct from "./pages/LinkProduct";
import LinkProductClient from "./pages/LinkProductClient";
import NotFound from "./pages/NotFound";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Navigate to="/home" />} /> */}
          <Route path="/" element={<Navigate to="/404" />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="/links" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/links/:id" element={<LinkProduct />} />
          <Route
            path="/link-products/:username"
            element={<LinkProductClient />}
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
