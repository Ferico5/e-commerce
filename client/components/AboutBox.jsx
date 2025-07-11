import React from 'react'

const AboutBox = ({ title, description }) => {
  return (
    <div className='w-1/3 h-65 flex flex-col font-outfit text-sm px-15 py-20 border border-[#E5E7EB]'>
        <span className='font-bold text-[#2A2A2A] mb-5'>{title}</span>
        <span className='text-[#5C6872]'>{description}</span>
    </div>
  )
}

export default AboutBox