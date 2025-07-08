import React from 'react';
import p_img2 from '../../assets/frontend_assets/p_img2.png';

const AdminList = () => {
  return (
    <div className="admin-content bg-[#F9FAFB] font-outfit">
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
            <tr className='bg-[#F9FAFB]'>
              <td className='border-l border-t border-b border-[#E5E7EB] my-2'><img src={p_img2} className='w-17 p-2' /></td>
              <td className='border-t border-b border-[#E5E7EB] my-2 px-1'>Men Round Neck Pure Cotton T-shirt</td>
              <td className='border-t border-b border-[#E5E7EB] px-1'>Men</td>
              <td className='border-t border-b border-[#E5E7EB] px-1'>Rp. 80000</td>
              <td className='border-r border-t border-b border-[#E5E7EB] text-center text-base hover:cursor-pointer'>X</td>
            </tr>
            <tr className='bg-[#F9FAFB]'>
              <td className='border-l border-t border-b border-[#E5E7EB] my-2'><img src={p_img2} className='w-17 p-2' /></td>
              <td className='border-t border-b border-[#E5E7EB] my-2 px-1'>Men Round Neck Pure Cotton T-shirt</td>
              <td className='border-t border-b border-[#E5E7EB] px-1'>Men</td>
              <td className='border-t border-b border-[#E5E7EB] px-1'>Rp. 80000</td>
              <td className='border-r border-t border-b border-[#E5E7EB] text-center text-base hover:cursor-pointer'>X</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminList;
