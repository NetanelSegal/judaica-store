import { Route, Routes } from 'react-router';
import './App.css';
import ProductsPage from './pages/ProductsPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='/products' element={<ProductsPage />} />
    </Routes>
  );
}

export default App;
