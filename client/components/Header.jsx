import Logo from '../assets/frontend_assets/logo.png';
import Search from '../assets/frontend_assets/search_icon.png'
import Profile from '../assets/frontend_assets/profile_icon.png'
import Cart from '../assets/frontend_assets/cart_icon.png'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="content flex justify-between pt-[28px] pb-4.5 border-b border-[#ADADAD]">
      {/* Logo */}
      <div className="w-[166px] h-[47px]">
        <a href="/">
          <img src={Logo} />
        </a>
      </div>

      {/* Navbar */}
      <div className='flex flex-row items-center font-medium text-[#323232] font-poppins'>
        <nav>
          <ul className="flex gap-5">
            <li>
              <Link to="/">
                HOME
              </Link>
            </li>
            <li>
              <Link to="/collection">
                COLLECTION
              </Link>
            </li>
            <li>
              <Link to="/about">
                ABOUT
              </Link>
            </li>
            <li>
              <Link to="/contact">
                CONTACT
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Button */}
      <div className='flex items-center gap-6'>
        <a href="/collection">
          <img src={Search} className='w-[24px] h-[24px]' />
        </a>
        <a href="/login">
          <img src={Profile} className='w-[19.2px] h-[24px]' />
        </a>
        <a href="/cart">
          <img src={Cart} className='w-[22px] h-[24px]' />
        </a>
      </div>
    </div>
  );
};

export default Header;
