import { useMediaQuery } from 'react-responsive';

const ResponsiveContainerAdmin = ({ children, className = '' }) => {
  const isMobile = useMediaQuery({ maxWidth: 639 });
  const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 });

  const baseClass = 'font-outfit';

  const deviceClass = isMobile ? 'admin-content-mobile' : isTablet ? 'admin-content-tablet' : 'admin-content';

  return <div className={`${deviceClass} ${baseClass} ${className}`}>{children}</div>;
};

export default ResponsiveContainerAdmin;
