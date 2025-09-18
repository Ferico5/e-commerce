import { useState } from 'react';
import Logo from '../../assets/frontend_assets/logo.png';
import Search from '../../assets/frontend_assets/search_icon.png';
import Profile from '../../assets/frontend_assets/profile_icon.png';
import Cart from '../../assets/frontend_assets/cart_icon.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { useCart } from '../../auth/CartContext';
import ResponsiveContainer from './ResponsiveContainer';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const { token, logout } = useAuth();
  const { cartCount, resetCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);

  return (
    <ResponsiveContainer className="flex justify-between pt-5 pb-4.5">
      {/* Logo */}
      <div className="w-[120px] xl:w-[148px]">
        <a href="/">
          <img src={Logo} alt='Logo' />
        </a>
      </div>

      {/* Navbar */}
      <div className="hidden sm:flex flex-row items-center text-sm font-medium text-[#323232] font-poppins">
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
                Admin <span className="hidden md:inline">Panel</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Button */}
      <div className="flex items-center gap-6 sm:gap-4">
        <img src={Search} alt='Search Icon' className="w-[20px] cursor-pointer" onClick={() => navigate('/collection', { state: { showSearch: true } })} />

        {/* Login + Dropdown */}
        <div className="relative group">
          <a href="/login">
            <img src={Profile} alt='Profile Icon' className="w-[19px]" />
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
                  <button
                    className="block w-full text-left px-4 py-2 hover:text-[#000] hover:cursor-pointer"
                    onClick={() => {
                      resetCart();
                      logout(navigate);
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        <a href="/cart" className="relative inline-block">
          <img src={Cart} alt='Cart Icon' className="w-[20px]" />
          <span className="absolute -bottom-1 -right-1 bg-black text-white p-2 text-[9px] w-[14px] h-[14px] rounded-full flex items-center justify-center font-outfit">{cartCount}</span>
        </a>

        {/* Hamburger (mobile only) */}
        <button className="sm:hidden block" onClick={() => setOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-white shadow-lg z-30 transform transition-transform duration-300 sm:hidden 
  ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header Back Button */}
        <div className="pl-4 py-2 border-b border-gray-200 w-full">
          <button onClick={() => setOpen(false)} className="text-sm font-medium text-gray-600">
            <div className="flex items-center">
              <span className="pr-3 text-2xl text-gray-400">&lt;</span> Back
            </div>
          </button>
        </div>

        {/* Menu Links */}
        <div className="flex flex-col items-start text-sm">
          <Link to="/" className={`border-b border-t border-gray-200 w-full py-1 px-2 ${location.pathname === '/' ? 'bg-black text-white' : ''}`} onClick={() => setOpen(false)}>
            HOME
          </Link>
          <Link to="/collection" className={`border-b border-t border-gray-200 w-full py-1 px-2 ${location.pathname === '/collection' ? 'bg-black text-white' : ''}`} onClick={() => setOpen(false)}>
            COLLECTION
          </Link>
          <Link to="/about" className={`border-b border-t border-gray-200 w-full py-1 px-2 ${location.pathname === '/about' ? 'bg-black text-white' : ''}`} onClick={() => setOpen(false)}>
            ABOUT
          </Link>
          <Link to="/contact" className={`border-b border-t border-gray-200 w-full py-1 px-2 ${location.pathname === '/contact' ? 'bg-black text-white' : ''}`} onClick={() => setOpen(false)}>
            CONTACT
          </Link>
          <Link to="/admin/login" className="border-b border-t border-gray-200 w-full py-1 px-2" onClick={() => setOpen(false)}>
            Admin Panel
          </Link>

          {/* Login + Logout di mobile */}
          {token ? (
            <>
              <Link to="/orders" className={`border-b border-t border-gray-200 w-full py-1 px-2 ${location.pathname === '/orders' ? 'bg-black text-white' : ''}`} onClick={() => setOpen(false)}>
                Orders
              </Link>
              <button
                onClick={() => {
                  resetCart();
                  logout(navigate);
                  setOpen(false);
                }}
                className={`border-b border-t border-gray-200 w-full py-1 px-2`}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)} className={`border-b border-t border-gray-200 w-full py-1 px-2`}>
              Login
            </Link>
          )}
        </div>
      </div>
    </ResponsiveContainer>
  );
};

export default Header;
