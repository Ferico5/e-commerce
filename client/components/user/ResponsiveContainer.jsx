import { useMediaQuery } from 'react-responsive';

const ResponsiveContainer = ({ children, className = '' }) => {
  const isMobile = useMediaQuery({ maxWidth: 639 });
  const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 });
  const isLaptop = useMediaQuery({ minWidth: 1024, maxWidth: 1279 });

  const baseClass = 'font-outfit';

  const deviceClass = isMobile ? 'content-mobile' : isTablet ? 'content-tablet' : isLaptop ? 'content-laptop' : 'content-desktop';

  return <div className={`${deviceClass} ${baseClass} ${className}`}>{children}</div>;
};

export default ResponsiveContainer;
