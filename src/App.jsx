import { api } from "./utils/api";
import { Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";
import ProductsPage from "./pages/ProductsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AuthContext from "./contexts/AuthContext";
import { useEffect, useState } from "react";
import CartContext from "./contexts/CartContext";

export const links = [
  {
    path: "/",
    title: "Home",
    element: <HomePage />,
    allowedRoles: ["user", "admin", "guest"],
  },
  {
    path: "/products",
    title: "Products",
    element: <ProductsPage />,
    allowedRoles: ["user", "admin", "guest"],
  },
  {
    path: "/login",
    title: "Login",
    element: <LoginPage />,
    allowedRoles: ["guest"],
  },
  {
    path: "/signup",
    title: "Signup",
    element: <SignupPage />,
    allowedRoles: ["guest"],
  },

  {
    path: "/admin",
    title: "Admin",
    element: <AdminPage />,
    allowedRoles: ["admin"],
  },
];

export const filterLinks = (links, role) => {
  return links.filter(({ allowedRoles }) => allowedRoles.includes(role));
};

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const { data } = await api.get("auth/validate");
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };
    validateToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <CartContext.Provider value={{ cart, setCart }}>
        <Navbar />
        <Routes>
          {filterLinks(links, user?.role || "guest").map(
            ({ path, element }) => (
              <Route path={path} element={element} />
            )
          )}
        </Routes>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
