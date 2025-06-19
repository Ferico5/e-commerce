import { useState } from 'react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='content flex flex-col items-center pt-20 text-[40px]'>
      <span className='font-prata mb-6'>
        {!isLogin ? 'Sign Up' : 'Login'}
      </span>

      {/* Name */}
      {!isLogin && (
        <div>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-97 h-12 text-[18px] px-[8px] py-[16px] border-1"
          placeholder="Name"
          required
          autoComplete="off"
        />
      </div>
      )}

      {/* Email */}
      <div>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-97 h-12 text-[18px] px-[8px] py-[16px] border-1"
          placeholder="Email"
          required
          autoComplete="off"
        />
      </div>

      {/* Password */}
      <div>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-97 h-12 text-[18px] px-[8px] py-[16px] border-1"
          placeholder="Password"
          required
          autoComplete="off"
        />
      </div>

      <div className='flex justify-between w-97 text-sm mt-2 hover:cursor-pointer'>
        <span>Forgot your password?</span>
        <span onClick={() => {
          setIsLogin(!isLogin)
        }}>Login Here</span>
      </div>
    </div>
  )
};

export default Login;
