import React from 'react';
import AboutPic from '../../assets/frontend_assets/about_img.png';
import AboutBox from '../../components/AboutBox';
import SubscribeBox from '../../components/SubscribeBox';

const About = () => {
  return (
    <div className="content border-t border-[#E5E7EB] pt-9 font-outfit">
      {/* Title */}
      <div className="flex justify-center text-2xl text-[#707070] mb-13">
        <p>
          ABOUT <span className="text-[#171717] font-[470]">US</span>
        </p>
      </div>
      {/* Main Content */}
      <div className="flex">
        <img src={AboutPic} className="w-md" />

        {/* Paragraph */}
        <div className="flex flex-col justify-around py-6 ml-15 text-[#5C6872]">
          <p>
            Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a
            wide range of products from the comfort of their homes.
          </p>
          <p>
            Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive
            collection sourced from trusted brands and suppliers.
          </p>
          <span className="text-[#171717] font-semibold">Our Mission</span>
          <p>
            Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.
          </p>
        </div>
      </div>
      {/* Why Choose Us */}
      <div className="mt-14 mb-10 text-[#707070] text-xl">
        <p>
          WHY <span className="text-[#171717] font-[470]">CHOOSE US</span>
        </p>
        <div className="flex mt-6.5">
          <AboutBox title="Quality Assurance:" description="We meticulously select and vet each product to ensure it meets our stringent quality standards." />
          <AboutBox title="Convenience:" description="With our user-friendly interface and hassle-free ordering process, shopping has never been easier." />
          <AboutBox title="Exceptional Customer Service:" description="Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority." />
        </div>
      </div>

      <SubscribeBox />
    </div>
  );
};

export default About;
