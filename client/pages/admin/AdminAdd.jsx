import React, { useState } from 'react';

const AdminAdd = () => {
  const [image, setImage] = useState({});
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [price, setPrice] = useState('');
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  return (
    <form className='admin-content font-outfit'>
      <p className="font-medium mb-3">Upload Image</p>
      <div className="flex gap-3 mb-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-20 h-20 border border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-400">
            Upload
          </div>
        ))}
      </div>
    </form>
  );
};

export default AdminAdd;

// import React, { useState } from 'react';

// const AdminAdd = () => {
//   const [image, setImage] = useState({});
//   const [productName, setProductName] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState('Men');
//   const [subCategory, setSubCategory] = useState('Topwear');
//   const [price, setPrice] = useState('');
//   const [sizes, setSizes] = useState([]);
//   const [bestseller, setBestseller] = useState(false);

//   const handleSizeToggle = (size) => {
//     setSizes((prev) =>
//       prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
//     );
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const payload = {
//       image,
//       name: productName,
//       description,
//       category,
//       subCategory,
//       price,
//       sizes,
//       bestseller,
//     };
//     console.log(payload);
//     // TODO: send to backend
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-6 bg-[#F9FAFB] font-outfit text-sm max-w-[600px] mx-auto">
//       <p className="font-medium mb-3">Upload Image</p>
//       <div className="flex gap-3 mb-5">
//         {[1, 2, 3, 4].map((i) => (
//           <div
//             key={i}
//             className="w-20 h-20 border border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-400"
//           >
//             Upload
//           </div>
//         ))}
//       </div>

//       {/* Product Name */}
//       <label className="block font-medium">Product name</label>
//       <input
//         type="text"
//         placeholder="Type here"
//         value={productName}
//         onChange={(e) => setProductName(e.target.value)}
//         className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 mt-1 focus:outline-none"
//       />

//       {/* Product Description */}
//       <label className="block font-medium">Product description</label>
//       <textarea
//         rows={3}
//         placeholder="Write content here"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 mt-1 focus:outline-none"
//       />

//       {/* Category, Subcategory, Price */}
//       <div className="flex gap-4 mb-4">
//         <div className="flex flex-col w-1/3">
//           <label className="font-medium">Product category</label>
//           <select
//             className="mt-1 border border-gray-300 rounded-md px-2 py-2"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option>Men</option>
//             <option>Women</option>
//             <option>Kids</option>
//           </select>
//         </div>
//         <div className="flex flex-col w-1/3">
//           <label className="font-medium">Sub category</label>
//           <select
//             className="mt-1 border border-gray-300 rounded-md px-2 py-2"
//             value={subCategory}
//             onChange={(e) => setSubCategory(e.target.value)}
//           >
//             <option>Topwear</option>
//             <option>Bottomwear</option>
//             <option>Footwear</option>
//           </select>
//         </div>
//         <div className="flex flex-col w-1/3">
//           <label className="font-medium">Product Price</label>
//           <input
//             type="number"
//             placeholder="25"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             className="mt-1 border border-gray-300 rounded-md px-2 py-2 focus:outline-none"
//           />
//         </div>
//       </div>

//       {/* Product Sizes */}
//       <label className="font-medium block mb-2">Product Sizes</label>
//       <div className="flex gap-3 mb-4">
//         {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
//           <button
//             type="button"
//             key={size}
//             className={`border px-4 py-2 rounded-sm ${sizes.includes(size) ? 'bg-[#E5E7EB]' : 'bg-white'}`}
//             onClick={() => handleSizeToggle(size)}
//           >
//             {size}
//           </button>
//         ))}
//       </div>

//       {/* Bestseller */}
//       <div className="flex items-center gap-2 mb-6">
//         <input
//           type="checkbox"
//           checked={bestseller}
//           onChange={() => setBestseller(!bestseller)}
//         />
//         <label className="text-sm">Add to bestseller</label>
//       </div>

//       {/* Submit Button */}
//       <button type="submit" className="bg-black text-white px-8 py-2 text-sm hover:cursor-pointer">
//         ADD
//       </button>
//     </form>
//   );
// };

// export default AdminAdd;
