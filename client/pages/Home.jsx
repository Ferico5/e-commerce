import React, { useState } from 'react'
import Hero from '../assets/frontend_assets/hero_img.png'
import { products } from '../assets/frontend_assets/assets'

const Home = () => {
    // const [product, setProduct] = useState('')

    const getProduct = ()=>{
        
    }


  return (
    <div className='content'>
        <div className='border-1 flex items-center justify-center'>
            <div className='w-full flex flex-col items-center justify-center'>
                <div>
                    <p className='font-medium text-gray-800'>OUR BESTSELLERS</p>
                    <p className='font-prata text-gray-700 text-[45px] leading-20'>Latest Arrivals</p>
                    <p className='font-[600] text-gray-800'>SHOP NOW</p>             
                </div>
            </div>
            <div className='w-full'>
                <img src={Hero} alt="Hero" />
            </div>
        </div>
        <div className='py-8'>
            <div className='items-center flex justify-center my-10 flex-col leading-10'>
                <h1 className='text-[29px] font-[500] text-gray-700'><span className='text-gray-500'>LATEST</span> COLLECTIONS</h1>
                <p className='text-[14px] '>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.</p>
            </div>
            <div className='w-full border-1'>

            </div>
        </div>  
    </div>
  )
}

export default Home