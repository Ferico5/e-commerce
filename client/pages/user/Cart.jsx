import React, { useState } from 'react';
import TitleBox from '../../components/TitleBox';
import p_img1 from '../../assets/frontend_assets/p_img2.png';
import bin_icon from '../../assets/frontend_assets/bin_icon.png';

const Cart = () => {
  const [amount, setAmount] = useState(1);

  return (
    <div className="content flex flex-col pt-9">
      <div className="flex mb-4">
        <TitleBox first="YOUR" second="CART" size="big" />
      </div>

      <div className="flex border-b border-t border-[#E5E7EB] py-4 font-outfit">
        <img src={p_img1} className="w-20 h-25 object-cover" />
        <div className="flex flex-col ml-5 w-3/7">
          <p className="font-semibold text-lg">Men Round Neck Pure Cotton T-shirt</p>
          <div className="flex items-center gap-5 mt-1">
            <p>Rp 64000</p>
            <p className="border border-[#E5E7EB] px-3 py-1 bg-[#F8FAFC]">M</p>
          </div>
        </div>
        <div className="w-2/7 flex items-center justify-center">
          <input type="number" className="w-1/4 border py-1 px-2 border-[#E5E7EB] focus:outline-none" value={amount} />
        </div>
        <div className="w-2/7 flex items-center justify-center">
          <img src={bin_icon} className="w-5 hover:cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Cart;
