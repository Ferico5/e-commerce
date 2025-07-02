import React, { useState } from 'react';
import image1 from '../assets/frontend_assets/p_img2_1.png';
import image2 from '../assets/frontend_assets/p_img2_2.png';
import image3 from '../assets/frontend_assets/p_img2_3.png';
import image4 from '../assets/frontend_assets/p_img2_4.png';
import star from '../assets/frontend_assets/star_icon.png';
import star_dull from '../assets/frontend_assets/star_dull_icon.png';
import ProductBox from '../components/ProductBox';

const Product = () => {
  const [selectedSize, setSelectedSize] = useState('');

  return (
    <div className="content flex-col border-t border-[#E5E7EB] pt-10 font-outfit">
      <div className="flex">
        {/* Picture Product */}
        <div className="w-1/2 flex flex-row">
          <div className="flex flex-col gap-3">
            <img src={image1} className="w-25 h-29 object-cover hover:cursor-pointer" />
            <img src={image2} className="w-25 h-29 object-cover hover:cursor-pointer" />
            <img src={image3} className="w-25 h-29 object-cover hover:cursor-pointer" />
            <img src={image4} className="w-25 h-29 object-cover hover:cursor-pointer" />
          </div>
          <div className="ml-3">
            <img src={image1} className="w-105 h-125 object-cover" />
          </div>
        </div>

        {/* Detail Product */}
        <div className="w-[40%] pt-3 pl-6">
          {/* Name Product */}
          <p className="text-2xl font-medium">Men Round Neck Pure Cotton T-shirt</p>
          {/* Star Product */}
          <div className="flex gap-1 py-2 items-center">
            <div className="flex gap-1 h-3">
              <img src={star} className="w-3" />
              <img src={star} className="w-3" />
              <img src={star} className="w-3" />
              <img src={star} className="w-3" />
              <img src={star_dull} className="w-3" />
            </div>
            <p className="ml-2">(122)</p>
          </div>
          {/* Price Product */}
          <p className="mt-2 mb-2 text-2xl font-medium">Rp. 80000</p>
          {/* Desc Product */}
          <p className="text-[#5C6872] mt-6">A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.</p>
          {/* Size Product */}
          <p className="mt-9">Select Size</p>
          <div className="flex gap-2 mt-3">
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border font-medium transition ${selectedSize === size ? 'bg-black text-white border-black hover:cursor-pointer' : 'bg-white text-black border-gray-300 hover:border-black hover:cursor-pointer'}`}
              >
                {size}
              </button>
            ))}
          </div>
          {/* Add to Cart Button */}
          <button className="mt-8 px-8 py-3 border text-sm bg-black text-white hover:cursor-pointer">ADD TO CART</button>

          {/* Additional Info */}
          <div className="mt-8 pt-5 border-t border-[#E5E7EB] text-[#5C6872] text-sm text-sm/5.5">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Desc and Review */}
      <div className="text-sm mt-20">
        <div className="flex">
          <p className="border border-[#E5E7EB] px-5 py-3 font-bold">Description</p>
          <p className="border border-[#E5E7EB] px-5 py-3">Reviews (122)</p>
        </div>
        <div className="flex flex-col justify-around h-40 border border-[#E5E7EB] px-5 py-3 text-[#5C6872]">
          <p>
            An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products,
            interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant
            information.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <div className="flex justify-center text-3xl text-[#707070] mt-30">
        <p>
          RELATED <span className="text-[#171717] font-[470]">PRODUCTS</span>
        </p>
      </div>
      <div className="grid grid-cols-5 gap-3 mt-3 mb-10">
        {/* <ProductBox image={product.image[0]} name={product.name} price={product.price} /> */}
        <ProductBox image={image1} name='Men Round Neck Pure Cotton T-shirt' price='80000' />
        <ProductBox image={image1} name='Men Round Neck Pure Cotton T-shirt' price='80000' />
        <ProductBox image={image1} name='Men Round Neck Pure Cotton' price='80000' />
        <ProductBox image={image1} name='Men Round Neck Pure Cotton T-shirt' price='80000' />
        <ProductBox image={image1} name='Men Round Neck Pure Cotton T-shirt' price='80000' />
      </div>
    </div>
  );
};

export default Product;
