import { Link } from 'react-router';
import { links } from '../App';

export default function Navbar() {
  return (
    <div>
      <img className='logo' src='' alt='logo' />
      <ul>
        {links.map((link) => (
          <li className='w-10 h-5 flex gap' key={link.path}>
            <Link to={link.path}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
