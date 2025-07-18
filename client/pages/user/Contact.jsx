import React from 'react';
import ContactPic from '../../assets/frontend_assets/contact_img.png';
import SubscribeBox from '../../components/user/SubscribeBox';
import TitleBox from '../../components/user/TitleBox';

const Contact = () => {
  return (
    <div className="content border-t border-[#E5E7EB] pt-9 font-outfit">
      {/* Title */}
      <div className="flex justify-center text-2xl text-[#707070] mb-14">
        <TitleBox first="CONTACT" second="US" size="big" />
      </div>
      {/* Main Content */}
      <div className="flex justify-center mb-20">
        <img src={ContactPic} className="w-[480px]" />

        {/* Paragraph */}
        <div className="flex flex-col justify-center gap-6 py-6 ml-10 text-[#5C6872] ">
          <span className="text-gray-600 text-[20px] font-semibold">Our Store</span>
          <p>
            54709 Willms Station
            <br />
            Suite 350, Washington, USA
          </p>
          <p>
            Tel: (415) 555-0132
            <br />
            Email: admin@forever.com
          </p>
          <span className="text-gray-600 text-[20px] font-semibold">Careers at Forever</span>
          <p>Learn more about our teams and job openings.</p>
          <button className="border-1 w-36 text-black p-4 text-[14px] duration-300 ease-in hover:bg-black hover:text-white">Explore Jobs</button>
        </div>
      </div>
      <SubscribeBox />
    </div>
  );
};

export default Contact;
