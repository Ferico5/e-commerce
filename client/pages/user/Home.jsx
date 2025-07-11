import React, { useState, useEffect } from "react";
import SubscribeBox from "../../components/SubscribeBox";
import Hero from "../../assets/frontend_assets/hero_img.png";
import { products } from "../../assets/frontend_assets/assets";
import { assets } from "../../assets/frontend_assets/assets";
import TitleBox from "../../components/TitleBox";

const Home = () => {
  const [lastCollectionList, setLastCollectionList] = useState([]);
  const [bestSellerList, setBestSellerList] = useState([]);

  useEffect(() => {
    const getLastCollection = products
      .sort((a, b) => b.date - a.date)
      .slice(0, 10);
    setLastCollectionList(getLastCollection);
  }, []);

  useEffect(() => {
    const getBestSeller = products
      .filter((p) => p.bestseller === true)
      .slice(0, 5);
    setBestSellerList(getBestSeller);
  }, []);

  return (
    <div className="content">
      <div className="border-1 flex items-center justify-center">
        <div className="w-full flex flex-col items-center justify-center">
          <div>
            <p className="font-medium text-gray-800">OUR BESTSELLERS</p>
            <p className="font-prata text-gray-700 text-[45px] leading-20">
              Latest Arrivals
            </p>
            <p className="font-[600] text-gray-800">SHOP NOW</p>
          </div>
        </div>
        <div className="w-full">
          <img src={Hero} alt="Hero" />
        </div>
      </div>

      <div>
        <div className="items-center flex justify-center my-10 flex-col leading-10">
          <TitleBox first="LATEST" second="COLLECTIONS" size="big" />
          {/* <h1 className="text-[29px] font-[500] text-gray-700">
            <span className="text-gray-500">LATEST</span> COLLECTIONS
          </h1> */}
          <p className="text-[14px] ">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the.
          </p>
        </div>
        {/* <div className="w-full flex gap-4 grid grid-cols-5">
          {lastCollectionList.map((p, i) => (
            <div key={i}>
              <div className="overflow-hidden">
                <img src={p.image[0]} alt={p.name} className="hover:scale-110 transition ease-in-out" />
              </div>
              <p className="text-[12px] pt-3 pb-1 ">{p.name}</p>
              <p className="text-[12px] font-[500]">${p.price}</p>
            </div>
          ))}
        </div> */}
      </div>

      <div className="py-8">
        <div className="items-center flex justify-center my-10 flex-col leading-10">
          {/* <h1 className="text-[29px] font-[500] text-gray-700">
            <span className="text-gray-500">BEST</span> SELLERS
          </h1> */}
          <TitleBox first="BEST" second="SELLERS" size="big" />

          <p className="text-[14px] ">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the.
          </p>
        </div>
        <div className="w-full flex gap-4">
          {/* {bestSellerList.map((p, i) => (
            <div key={i}>
              <div className="overflow-hidden">
                <img src={p.image[0]} alt={p.name} className="hover:scale-110 transition ease-in-out" />
              </div>
              <p className="text-[12px] pt-3 pb-1 ">{p.name}</p>
              <p className="text-[12px] font-[500]">${p.price}</p>
            </div>
          ))} */}
        </div>
      </div>

      <div className="flex pt-10 pb-10 gap-10 place-content-evenly">
        <div className="w-full flex flex-col items-center justify-center">
          <img src={assets.exchange_icon} alt="" className="w-10 m-4" />
          <p className="font-[600] text-gray-700">Easy Exchange Policy</p>
          <p className="text-gray-500">We offer hassle free exchange policy</p>
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <img src={assets.quality_icon} alt="" className="w-10 m-4" />
          <p className="font-[600] text-gray-700">7 Days Return Policy</p>
          <p className="text-gray-500">We provide 7 days free return policy</p>
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <img src={assets.support_img} alt="" className="w-10 m-4" />
          <p className="font-[600] text-gray-700">Best customer support</p>
          <p className="text-gray-500">Wwe provide 24/7 customer support</p>
        </div>
      </div>

      <SubscribeBox />

      {/* <div className="w-full flex flex-col items-center justify-center p-10">
        <p className="font-[600] text-gray-800 text-[20px]">Subscribe now & get 20% off</p>
        <p className="text-gray-500">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        <div className="mt-5 w-full flex flex-row items-center justify-center">
          <input type="text" className="w-2/5 h-11 text-[15px] px-[8px] py-[16px] border-gray-300 border-1 font-outfit" placeholder="Enter your email" autoComplete="off" />
          <button className="w-34 h-11 py-[8px] bg-[#000] text-[#FFF] text-[11px] font-outfit hover:cursor-pointer">SUBSCRIBE</button>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
