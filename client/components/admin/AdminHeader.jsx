import Logo from '../../assets/admin_assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

const Header = () => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  if (!token || !user || user.role !== 'admin') return null;

  return (
    <div className="flex justify-between items-center border-b border-[#E5E7EB] bg-[#F9FAFB]">
      {/* Logo */}
      <div className="ml-13.5 pt-2 pb-2 w-31">
        <img src={Logo} alt='Logo' />
      </div>

      {/* Button */}
      <div className="mr-13.5 font-outfit">
        <button onClick={() => logout(navigate)} className="border rounded-full px-7 py-2 bg-black text-white text-sm hover:cursor-pointer">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
