import { Link } from 'react-router';
import { links } from '../App';

export default function Navbar() {
  return (
    <nav className='flex flex-col md:flex-row md:justify-between text-white bg-[#22333B] px-6 py-3 items-center gap-3 md:gap-0 shadow-sm'>
      <h4 className='font-bold text-2xl '>Logo</h4>
      <ul className='flex flex-row gap-2 items-center'>
        {links.map(({ title, path }) => (
          <li key={path}>
            <Link
              to={path}
              className='hover:text-white hover:underline transition duration-300'
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
