import React from 'react';
import { Link } from 'react-router-dom';

const ProductBox = ({ image, name, price, id }) => {
  return (
    <div className="flex flex-col mb-3 hover:cursor-pointer">
      <Link to={`/product/${id}`}>
        {/* Product Image */}
        <div className="bg-gray-100 overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover hover:scale-110 transition ease-in-out" />
        </div>

        {/* Product Name */}
        <p className="mt-3 text-sm text-[#374151] break-words leading-tight">{name}</p>

        {/* Product Price */}
        <p className="mt-2 text-sm text-[#374151] font-medium">Rp. {price}</p>
      </Link>
    </div>
  );
};

export default ProductBox;
