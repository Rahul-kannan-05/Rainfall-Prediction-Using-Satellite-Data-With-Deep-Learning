import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PredictPage from "./pages/Predict";
import MapPage from "./pages/MapPage";
import TimeSeriesPage from "./pages/TimeSeries";
import ModelPage from "./pages/Model";
import PerformancePage from "./pages/Performance";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/predict" element={<PredictPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/timeseries" element={<TimeSeriesPage />} />
          <Route path="/model" element={<ModelPage />} />
          <Route path="/performance" element={<PerformancePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
