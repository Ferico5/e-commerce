import Logo from '../../assets/frontend_assets/logo.png';
import Search from '../../assets/frontend_assets/search_icon.png';
import Profile from '../../assets/frontend_assets/profile_icon.png';
import Cart from '../../assets/frontend_assets/cart_icon.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

const Header = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="content flex justify-between pt-5 pb-4.5">
      {/* Logo */}
      <div className="w-[148px]">
        <a href="/">
          <img src={Logo} />
        </a>
      </div>

      {/* Navbar */}
      <div className="flex flex-row items-center text-sm font-medium text-[#323232] font-poppins">
        <nav>
          <ul className="flex gap-5">
            <li className="relative">
              <Link to="/" className={`pb-1 ${location.pathname === '/' ? 'after:content-[""] after:absolute after:left-1/2 after:translate-x-[-50%] after:bottom-[-3px] after:w-1/2 after:h-[1px] after:bg-[#323232]' : ''}`}>
                HOME
              </Link>
            </li>
            <li className="relative">
              <Link
                to="/collection"
                className={`pb-1 ${location.pathname === '/collection' ? 'after:content-[""] after:absolute after:left-1/2 after:translate-x-[-50%] after:bottom-[-3px] after:w-1/2 after:h-[1px] after:bg-[#323232]' : ''}`}
              >
                COLLECTION
              </Link>
            </li>
            <li className="relative">
              <Link to="/about" className={`pb-1 ${location.pathname === '/about' ? 'after:content-[""] after:absolute after:left-1/2 after:translate-x-[-50%] after:bottom-[-3px] after:w-1/2 after:h-[1px] after:bg-[#323232]' : ''}`}>
                ABOUT
              </Link>
            </li>
            <li className="relative">
              <Link to="/contact" className={`pb-1 ${location.pathname === '/contact' ? 'after:content-[""] after:absolute after:left-1/2 after:translate-x-[-50%] after:bottom-[-3px] after:w-1/2 after:h-[1px] after:bg-[#323232]' : ''}`}>
                CONTACT
              </Link>
            </li>
            <li className="relative">
              <Link to="/admin/login" className="border rounded-full border-[#E5E7EB] px-5 py-2 text-[.75em] font-semibold">
                Admin Panel
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Button */}
      <div className="flex items-center gap-6">
        <a href="/collection">
          <img src={Search} className="w-[20px]" />
        </a>

        {/* Login + Dropdown */}
        <div className="relative group">
          <a href="/login">
            <img src={Profile} className="w-[19px]" />
          </a>

          {/* show dropdown only after login */}
          {token && (
            <div className="absolute right-0 mt-3 w-40 bg-[#F1F5F9] rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
              <ul className="text-[#6B7280] font-semibold font-outfit">
                <li>
                  <Link to="/orders" className="block px-4 py-2 hover:text-[#000]">
                    Orders
                  </Link>
                </li>
                <li>
                  <button className="block w-full text-left px-4 py-2 hover:text-[#000] hover:cursor-pointer" onClick={() => logout(navigate)}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        <a href="/cart" className="relative inline-block">
          <img src={Cart} className="w-[20px]" />
          <span className="absolute -bottom-1 -right-1 bg-black text-white p-2 text-[9px] w-[14px] h-[14px] rounded-full flex items-center justify-center font-outfit">0</span>
        </a>
      </div>
    </div>
  );
};

export default Header;
