import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { toast } from 'react-toastify';

const AdminLogin = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin1@gmail.com');
  const [password, setPassword] = useState('admin1');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await login(email, password);

    try {
      if (response.data.msg === 'Login successful' && response.status === 200) {
        // temporary url
        navigate('/admin');
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg);
      } else {
        console.error(error);
        toast.error(error.response.data.msg);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh] bg-[#F9FAFB]">
      <div
        className="border border-transparent bg-white px-8 py-5 font-outfit"
        style={{
          boxShadow: '0 0 0 rgba(0, 0, 0, 0), -1px 0 1px rgba(0, 0, 0, 0.1), 0 4px 4px rgba(0, 0, 0, 0.15)',
        }}
      >
        <span className="font-bold text-2xl">Admin Panel</span>

        <form onSubmit={handleLogin} className="flex flex-col mt-4">
          {/* Email */}
          <label htmlFor="email" className="text-[#515661] font-semibold text-sm mb-1">
            Email Address
          </label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-70 px-3 py-2 mt-1 rounded-md border border-gray-600 focus:outline-none mb-3" required autoComplete="off" />

          {/* Password */}
          <label htmlFor="password" className="text-[#515661] font-semibold text-sm mb-1">
            Password
          </label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-70 px-3 py-2 mt-1 rounded-md border border-gray-600 focus:outline-none" required autoComplete="off" />

          {/* Button */}
          <button className="px-3 py-2 rounded-md bg-black text-white mt-5 hover:cursor-pointer">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
