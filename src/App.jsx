import { Route, Routes } from 'react-router';
import './App.css';
import ProductsPage from './pages/ProductsPage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';

export const links = [
  { path: '/', title: 'Home', element: <HomePage /> },
  { path: '/products', title: 'Products', element: <ProductsPage /> },
];

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {links.map((link) => (
          <Route path={link.path} element={link.element} />
        ))}
      </Routes>
    </>
  );
}

export default App;
