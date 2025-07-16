import axios from "axios";
import { Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./components/Navbar";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AuthContext from "./contexts/AuthContext";
import { useEffect, useState } from "react";

export const loggedInLinks = [
  {
    path: "/logout",
    title: "Logout",
    element: (
      <div>
        <h1>Logout</h1>
      </div>
    ),
  },
];

export const notLoggedInLinks = [
  { path: "/login", title: "Login", element: <LoginPage /> },
  {
    path: "/signup",
    title: "Signup",
    element: <SignupPage />,
  },
];

export const links = [
  { path: "/", title: "Home", element: <HomePage /> },
  { path: "/products", title: "Products", element: <ProductsPage /> },
];

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/auth/validate",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };
    validateToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Navbar />
      <Routes>
        {links.map(({ path, element }) => (
          <Route path={path} element={element} />
        ))}

        {user
          ? loggedInLinks.map(({ path, element }) => (
              <Route path={path} element={element} />
            ))
          : notLoggedInLinks.map(({ path, element }) => (
              <Route path={path} element={element} />
            ))}
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
