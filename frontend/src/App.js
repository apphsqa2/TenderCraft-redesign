import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import DiscoverTenders from '@/pages/DiscoverTenders';
import TenderDetails from '@/pages/TenderDetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DiscoverTenders />} />
          <Route path="/tender/:id" element={<TenderDetails />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;