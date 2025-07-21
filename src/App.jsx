import { api } from "./api";
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
  // {
  //   path: "/logout",
  //   title: "Logout",
  //   element: (
  //     <div>
  //       <h1>Logout</h1>
  //     </div>
  //   ),
  //   allowedRoles: ["user", "admin"],
  // },
  {
    path: "/admin",
    title: "Admin",
    element: <AdminPage />, // Professional admin dashboard
    allowedRoles: ["admin"],
  },
];

export const filterLinks = (links, role) => {
  return links.filter(({ allowedRoles }) => allowedRoles.includes(role));
};

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const { data } = await api.get(
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
        {filterLinks(links, user?.role || "guest").map(({ path, element }) => (
          <Route path={path} element={element} />
        ))}
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
