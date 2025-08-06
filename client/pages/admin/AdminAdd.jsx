import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import upload_area from '../../assets/admin_assets/upload_area.png';
import { useNavigate } from 'react-router-dom';

const AdminAdd = () => {
  const [images, setImages] = useState([null, null, null, null]);
  const [imagePreviews, setImagePreviews] = useState([null, null, null, null]);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [price, setPrice] = useState('');
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const fileInputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => {
        if (preview) URL.revokeObjectURL(preview);
      });
    };
  }, [imagePreviews]);

  const handleSizeToggle = (size) => {
    setSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]));
  };

  const handleDivClick = (index) => {
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].click();
    }
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      const newPreviews = [...imagePreviews];
      newImages[index] = file;
      newPreviews[index] = URL.createObjectURL(file);
      setImages(newImages);
      setImagePreviews(newPreviews);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !description || !price || sizes.length === 0) {
      toast.error('All fields are required!');
      return;
    }

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('subCategory', subCategory);
    formData.append('price', price);
    formData.append('bestseller', bestseller);
    formData.append('sizes', JSON.stringify(sizes));
    images.forEach((img, i) => {
      if (img) formData.append(`image${i + 1}`, img);
    });

    try {
      const response = await axios.post('http://localhost:8000/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.msg === 'Product added!' && response.status === 201) {
        setProductName('');
        setDescription('');
        setCategory('Men');
        setSubCategory('Topwear');
        setPrice('');
        setSizes([]);
        setBestseller(false);
        setImages([null, null, null, null]);
        setImagePreviews([null, null, null, null]);
        navigate('/admin/list');
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg);
      } else {
        console.error(error);
        toast.error('Something went wrong!');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[33em] font-outfit text-[#4B5563]">
      <p className="font-medium mb-3">Upload Image</p>
      <div className="flex gap-3 mb-5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="w-20 h-20 border border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-400 hover:cursor-pointer" onClick={() => handleDivClick(i)}>
            {imagePreviews[i] ? <img src={imagePreviews[i]} className="object-cover w-full h-full" /> : <img src={upload_area} />}
            <input type="file" accept="image/*" className="hidden" ref={(el) => (fileInputRefs.current[i] = el)} onChange={(e) => handleImageChange(e, i)} />
          </div>
        ))}
      </div>

      {/* Product Name */}
      <label className="block font-medium">Product name</label>
      <input type="text" placeholder="Type here" value={productName} onChange={(e) => setProductName(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 mt-1 focus:outline-none" />

      {/* Product Description */}
      <label className="block font-medium">Product description</label>
      <textarea rows={3} placeholder="Write content here" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 mt-1 focus:outline-none" />

      {/* Category, Subcategory, Price */}
      <div className="flex gap-4 mb-4">
        <div className="flex flex-col w-1/3">
          <label className="font-medium">Product category</label>
          <select className="mt-1 border border-gray-300 rounded-md px-2 py-2" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Men</option>
            <option>Women</option>
            <option>Kids</option>
          </select>
        </div>
        <div className="flex flex-col w-1/3">
          <label className="font-medium">Sub category</label>
          <select className="mt-1 border border-gray-300 rounded-md px-2 py-2" value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
            <option>Topwear</option>
            <option>Bottomwear</option>
            <option>Winterwear</option>
          </select>
        </div>
        <div className="flex flex-col w-1/3">
          <label className="font-medium">Product Price</label>
          <input type="number" placeholder="50000" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 border border-gray-300 rounded-md px-2 py-2 focus:outline-none" />
        </div>
      </div>

      {/* Product Sizes */}
      <label className="font-medium block mb-2">Product Sizes</label>
      <div className="flex gap-3 mb-4">
        {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
          <button type="button" key={size} className={`border px-4 py-2 rounded-sm hover:cursor-pointer ${sizes.includes(size) ? 'bg-[#FFEBF5]' : 'bg-white'}`} onClick={() => handleSizeToggle(size)}>
            {size}
          </button>
        ))}
      </div>

      {/* Bestseller */}
      <div className="flex items-center gap-2 mb-6">
        <input type="checkbox" checked={bestseller} onChange={() => setBestseller(!bestseller)} className="hover:cursor-pointer" />
        <label className="text-sm">Add to bestseller</label>
      </div>

      {/* Submit Button */}
      <button type="submit" className="bg-black text-white px-8 py-2 text-sm hover:cursor-pointer mb-3">
        ADD
      </button>
    </form>
  );
};

export default AdminAdd;
