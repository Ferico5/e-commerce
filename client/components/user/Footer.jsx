import React from 'react';
import Logo from '../../assets/frontend_assets/logo.png';

const Footer = () => {
  return (
    <div className="content pt-30">
      {/* Top side content */}
      <div className="flex justify-between">
        {/* Left side content */}
        <div className="w-2/5 pr-17 text-[#595959] text-sm font-outfit">
          <img src={Logo} className="w-[140px] mb-5" />
          <span>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
            type specimen book.
          </span>
        </div>

        {/* Right side content */}
        <div className="w-2/5 flex justify-between text-sm font-outfit">
          {/* Company */}
          <div className="w-1/2">
            <span className="font-semibold text-xl">COMPANY</span>
            <ul className="text-[#595959] mt-5 space-y-1">
              <li>Home</li>
              <li>About us</li>
              <li>Delivery</li>
              <li>Privacy policy</li>
            </ul>
          </div>
          {/* Get In Touch */}
          <div className="w-1/2">
            <span className="font-semibold text-xl">GET IN TOUCH</span>
            <ul className="text-[#595959] mt-5 space-y-1">
              <li>+62-000-000-0000</li>
              <li>anonymous@gmail.com</li>
              <li>Instagram</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Bottom side content */}
      <div>
        <footer className="flex justify-center font-outfit border-t border-[#BDBDBD] mt-5 pt-4 mb-4 text-sm">
            Idea design by greatstack.dev
        </footer>
      </div>
    </div>
  );
};

export default Footer;
