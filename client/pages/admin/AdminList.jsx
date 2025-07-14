import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/list')
      .then((response) => {
        setProducts(response.data.listProduct);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div className="font-outfit text-[#4B5563]">
      <div className="flex flex-col">
        <p>All Products List</p>
        <table className="w-full text-sm text-left border-separate border-spacing-y-2 mt-2">
          <thead>
            <tr className="bg-[#F3F4F6] text-[#4C5663] border-[#E5E7EB]">
              <th className="p-1 font-semibold w-39">Image</th>
              <th className="p-1 font-semibold w-112">Name</th>
              <th className="p-1 font-semibold w-43">Category</th>
              <th className="p-1 font-semibold w-46">Price</th>
              <th className="py-1 font-semibold w-43 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="bg-[#F9FAFB]">
                <td className="border-l border-t border-b border-[#E5E7EB]">
                  <img src={product.image[0]} className="w-17 p-2" />
                </td>
                <td className="border-t border-b border-[#E5E7EB] px-1">{product.name}</td>
                <td className="border-t border-b border-[#E5E7EB] px-1">{product.category}</td>
                <td className="border-t border-b border-[#E5E7EB] px-1">Rp. {product.price}</td>
                <td className="border-r border-t border-b border-[#E5E7EB] text-center text-base hover:cursor-pointer">X</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminList;
