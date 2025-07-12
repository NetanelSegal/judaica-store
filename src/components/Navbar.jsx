import { useContext } from "react";
import { Link } from "react-router";
import { links, loggedInLinks, notLoggedInLinks } from "../App";
import AuthContext from "../contexts/AuthContext";

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const renderLink = ({ title, path }) => (
    <li key={path}>
      <Link
        to={path}
        className="hover:text-white hover:underline transition duration-300"
      >
        {title}
      </Link>
    </li>
  );

  return (
    <nav className="sticky top-0 z-50 flex flex-col md:flex-row md:justify-between text-white bg-[#22333B] px-6 py-3 items-center gap-3 md:gap-0 shadow-sm">
      <h4 className="font-bold text-2xl ">Logo</h4>
      <ul className="flex flex-row gap-2 items-center">
        {links.map(renderLink)}
        {user
          ? loggedInLinks.map(renderLink)
          : notLoggedInLinks.map(renderLink)}
      </ul>
    </nav>
  );
}
