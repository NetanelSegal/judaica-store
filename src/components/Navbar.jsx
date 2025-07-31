import { useContext } from "react";
import { Link } from "react-router";
import { filterLinks, links } from "../App";
import AuthContext from "../contexts/AuthContext";
import Cart from "./Cart";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.clear("token");
    setUser(null);
  };

  const renderLink = ({ title, path }) =>
    title ? (
      <li key={path}>
        <Link
          to={path}
          className="hover:text-white hover:underline transition duration-300"
        >
          {title}
        </Link>
      </li>
    ) : null;

  return (
    <nav className="sticky top-0 z-50 flex flex-col md:flex-row md:justify-between text-white bg-[#22333B] px-6 py-3 items-center gap-3 md:gap-0 shadow-sm">
      <h4 className="font-bold text-2xl ">Logo</h4>
      <ul className="flex flex-row gap-2 items-center relative">
        {filterLinks(links, user?.role || "guest").map(renderLink)}
        {user && (
          <>
            <Cart />
            <button
              className="cursor-pointer bg-[#EAE0D6] text-[#22333B] border-[#22333B] px-6 py-2 rounded-xl font-semibold hover:bg-[#22333B] hover:border-[#EAE0D6] hover:text-white border-2 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </ul>
    </nav>
  );
}
