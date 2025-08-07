import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from '../../utils/axiosInstance.js';

const AdminList = () => {
  const [products, setProducts] = useState([]);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/list');
      setProducts(response.data.listProduct);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Error fetching product, please refresh the browser!');
    }
  };

  const handleDeleteClick = (id) => {
    setProductToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/products/${productToDelete}`);
      setShowModal(false);
      setProductToDelete(null);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error to delete product');
    }
  };

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
                <td className="border-r border-t border-b border-[#E5E7EB] text-center text-base hover:cursor-pointer" onClick={() => handleDeleteClick(product._id)}>
                  X
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500/75 z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-[300px] text-center">
              <p className="text-lg font-semibold mb-4">Are you sure?</p>
              <p className="text-sm text-gray-600 mb-6">This action will permanently delete the product.</p>
              <div className="flex justify-center gap-4">
                <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 hover:cursor-pointer">
                  Delete
                </button>
                <button onClick={() => setShowModal(false)} className="border border-gray-400 text-gray-600 px-4 py-2 rounded hover:bg-gray-100 hover:cursor-pointer">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminList;
