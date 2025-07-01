import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await login(email, password);

        if (response.data.msg === 'Login successful' && response.status === 200) {
          localStorage.setItem('token', response.data.token);
          navigate('/');
        } else {
          toast.error(response.data.msg);
        }
      } else {
        const response = await axios.post('http://localhost:8000/users', {
          name,
          email,
          password,
        });

        if (response.data.msg === 'User created!' && response.status === 201) {
          setName('');
          setEmail('');
          setPassword('');
          navigate('/');
        }
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
    <div className="content flex flex-col items-center pt-20 text-[33px]">
      <span className="font-prata mb-2">{!isLogin ? 'Sign Up' : 'Login'}</span>

      <form onSubmit={handleLogin}>
        {/* Name */}
        {!isLogin && (
          <div>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-97 h-12 text-[18px] px-[8px] py-[16px] border-1 font-outfit" placeholder="Name" required autoComplete="off" />
          </div>
        )}

        {/* Email */}
        <div>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-97 h-12 text-[18px] px-[8px] py-[16px] border-1 font-outfit" placeholder="Email" required autoComplete="off" />
        </div>

        {/* Password */}
        <div>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-97 h-12 text-[18px] px-[8px] py-[16px] border-1 font-outfit" placeholder="Password" required autoComplete="off" />
        </div>

        <div className="flex justify-between w-97 text-sm mt-2 hover:cursor-pointer font-outfit">
          <span>Forgot your password?</span>
          <span
            onClick={() => {
              setIsLogin(!isLogin);
            }}
          >
            {!isLogin ? 'Login Here' : 'Create account'}
          </span>
        </div>

        {/* Button */}
        <div className="mt-8 flex justify-center">
          <button className="w-34 py-[8px] bg-[#000] text-[#FFF] text-lg font-outfit hover:cursor-pointer">{!isLogin ? 'Sign Up' : 'Sign In'}</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
