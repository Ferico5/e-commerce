import React from 'react';
import TitleBox from '../../components/TitleBox';
import p_img1 from '../../assets/frontend_assets/p_img1.png';

const Cart = () => {
  return (
    <div className="content flex flex-col pt-9">
      <div className="flex">
        <TitleBox first="YOUR" second="CART" size="big" />
      </div>

      <div className='flex'>
        <img src={p_img1} className='w-20 h-25 object-cover' />
        <p>tes</p>
      </div>
    </div>
  );
};

export default Cart;
