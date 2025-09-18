import React, { useState, useEffect } from 'react';
import SubscribeBox from '../../components/user/SubscribeBox';
import ProductBox from '../../components/user/ProductBox';
import TitleBox from '../../components/user/TitleBox';
import ResponsiveContainer from '../../components/user/ResponsiveContainer.jsx';
import Hero from '../../assets/frontend_assets/hero_img.png';
import { assets } from '../../assets/frontend_assets/assets';
import axios from '../../utils/axiosInstance.js';

const Home = () => {
  const [lastCollectionList, setLastCollectionList] = useState([]);
  const [bestSellerList, setBestSellerList] = useState([]);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const res = await axios.get('/list');
        const data = res.data;

        if (data.listProduct) {
          const sorted = [...data.listProduct].sort((a, b) => new Date(b.date) - new Date(a.date));
          setLastCollectionList(sorted.slice(0, 10));
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchLatestProducts();
  }, []);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const res = await axios.get('/list');
        const data = res.data;

        if (data.listProduct) {
          const bestSellers = data.listProduct
            .filter((item) => item.bestSeller === true)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);
          setBestSellerList(bestSellers);
        }
      } catch (err) {
        console.error('Error fetching best sellers:', err);
      }
    };

    fetchBestSellers();
  }, []);

  return (
    <ResponsiveContainer className="pt-9">
      <div className="border-1 flex flex-col sm:flex-row items-center justify-center">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="py-7 sm:py-0">
            <p className="font-medium text-gray-800">OUR BESTSELLERS</p>
            <p className="font-prata text-gray-700 text-[25px] md:leading-20 ">Latest Arrivals</p>
            <p className="font-[600] text-gray-800">SHOP NOW</p>
          </div>
        </div>
        <div className="w-full">
          <img src={Hero} alt="Hero" />
        </div>
      </div>

      <div>
        <div className="items-center flex justify-center my-13 flex-col md:leading-10">
          <TitleBox first="LATEST" second="COLLECTIONS" size="big" />
          <p className="text-sm sm:text-base text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6 justify-items-center">
            {lastCollectionList.map((product) => (
              <ProductBox key={product._id} id={product._id} image={product.image[0]} name={product.name} price={product.price} />
            ))}
          </div>
        </div>
      </div>

      <div className="py-8">
        <div className="items-center flex justify-center my-10 flex-col md:leading-10">
          <TitleBox first="BEST" second="SELLERS" size="big" />
          <p className="text-sm sm:text-base text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6 justify-items-center">
          {bestSellerList.map((product) => (
            <ProductBox key={product._id} id={product._id} image={product.image[0]} name={product.name} price={product.price} />
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row pt-10 pb-10 gap-10 place-content-evenly">
        <div className="w-full flex flex-col items-center justify-center">
          <img src={assets.exchange_icon} alt="Exchange Icon" className="w-10 m-4" />
          <p className="font-[600] text-gray-700">Easy Exchange Policy</p>
          <p className="text-gray-500">We offer hassle free exchange policy</p>
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <img src={assets.quality_icon} alt="Quality Icon" className="w-10 m-4" />
          <p className="font-[600] text-gray-700">7 Days Return Policy</p>
          <p className="text-gray-500">We provide 7 days free return policy</p>
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <img src={assets.support_img} alt="Support Image" className="w-10 m-4" />
          <p className="font-[600] text-gray-700">Best customer support</p>
          <p className="text-gray-500">Wwe provide 24/7 customer support</p>
        </div>
      </div>

      <SubscribeBox />
    </ResponsiveContainer>
  );
};

export default Home;
