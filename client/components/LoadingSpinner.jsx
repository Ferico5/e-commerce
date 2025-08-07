import React from 'react';

const LoadingSpinner = ({ size = '24px', color = 'white' }) => {
  return (
    <div
      className="border-2 border-t-transparent border-solid rounded-full animate-spin"
      style={{
        width: size,
        height: size,
        borderColor: `${color} transparent ${color} ${color}`,
      }}
    />
  );
};

export default LoadingSpinner;
