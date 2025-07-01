import React from 'react';

const SubscribeBox = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-10 font-outfit">
      <p className="font-[600] text-gray-800 text-2xl mb-3">Subscribe now & get 20% off</p>
      <p className="text-[#9CA3AF]">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
      <div className="mt-5 w-full flex flex-row items-center justify-center">
        <input type="text" className="w-2/5 h-11 px-3 py-6 border-gray-300 border-1 font-outfit" placeholder="Enter your email" autoComplete="off" />
        <button className="w-34 h-12.5 py-3 bg-[#000] text-[#FFF] text-[11px] font-outfit hover:cursor-pointer">SUBSCRIBE</button>
      </div>
    </div>
  );
};

export default SubscribeBox;
