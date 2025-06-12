import { Link } from 'react-router';
import { links } from '../App';

export default function Navbar() {
  return (
    <nav className='flex flex-col md:flex-row md:justify-between bg-amber-400 px-6 py-3 items-center gap-3 md:gap-0'>
      <h4 className='font-bold text-2xl'>Logo</h4>

      <ul className='flex flex-row gap-2 items-center'>
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className='hover:text-white hover:underline transition duration-300'
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
