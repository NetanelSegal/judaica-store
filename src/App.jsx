import { Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./components/Navbar";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

export const links = [
  { path: "/", title: "Home", element: <HomePage /> },
  { path: "/products", title: "Products", element: <ProductsPage /> },
  { path: "/login", title: "Login", element: <LoginPage /> },
  { path: "/signup", title: "Signup", element: <SignupPage /> },
];

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {links.map(({ path, element }) => (
          <Route path={path} element={element} />
        ))}
      </Routes>
    </>
  );
}

export default App;
