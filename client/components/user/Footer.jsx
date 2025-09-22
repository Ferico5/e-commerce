import Logo from '../../assets/frontend_assets/logo.png';
import ResponsiveContainer from './ResponsiveContainer';

const Footer = () => {
  return (
    <ResponsiveContainer className="pt-30">
      {/* Top side content */}
      <div className="flex flex-col sm:flex-row justify-between">
        {/* Left side content */}
        <div className="w-full sm:w-2/5 pr-3 sm:pr-17 text-[#595959] text-sm font-outfit">
          <img src={Logo} alt="Logo" loading="lazy" className="w-[140px] mb-5" />
          <span>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
            type specimen book.
          </span>
        </div>

        {/* Right side content */}
        <div className="w-full sm:w-3/5 md:w-2/5 flex flex-col sm:flex-row justify-between text-sm font-outfit">
          {/* Company */}
          <div className="w-1/2 pt-7 sm:pt-0">
            <span className="font-semibold text-xl">COMPANY</span>
            <ul className="text-[#595959] mt-5 space-y-1">
              <li>Home</li>
              <li>About us</li>
              <li>Delivery</li>
              <li>Privacy policy</li>
            </ul>
          </div>
          {/* Get In Touch */}
          <div className="w-1/2 pt-7 sm:pt-0">
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
        <footer className="flex justify-center font-outfit border-t border-[#BDBDBD] mt-10 pt-4 mb-4 text-sm">Idea design by greatstack.dev</footer>
      </div>
    </ResponsiveContainer>
  );
};

export default Footer;
