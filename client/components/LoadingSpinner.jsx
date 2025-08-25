import React from 'react';
import { Triangle } from 'react-loader-spinner';

const LoadingSpinner = ({ size = 40, color = 'white' }) => {
  return (
    <div className="flex justify-center items-center">
      <Triangle height={size} width={size} color={color} ariaLabel="triangle-loading" wrapperStyle={{}} wrapperClass="" />
    </div>
  );
};

export default LoadingSpinner;
