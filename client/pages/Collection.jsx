import { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryBox from '../components/CategoryBox';
import ProductBox from '../components/ProductBox';

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState('Relevent');

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
    <div className="content border-t border-[#E5E7EB] pt-9 flex justify-between font-outfit">
      {/* Category */}
      <div className="w-[27.5%] pr-10 pt-1">
        <span className="text-xl">FILTERS</span>
        <CategoryBox title="CATEGORIES" categories={['Men', 'Women', 'Kids']} className="mb-5 mt-6" />

        <CategoryBox title="TYPE" categories={['Topwear', 'Bottomwear', 'Winterwear']} />
      </div>

      {/* Products */}
      <div className="w-3/4">
        <div className="flex justify-between text-2xl text-[#707070] mb-5">
          <p>
            ALL <span className="text-[#171717] font-[470]">COLLECTIONS</span>
          </p>

          {/* Sort Dropdown */}
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="border border-gray-300 text-sm px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-black">
            <option value="Relevent">Sort by: Relevent</option>
            <option value="LowToHigh">Sort by: Low to High</option>
            <option value="HighToLow">Sort by: High to Low</option>
          </select>
        </div>

        {/* Product List */}
        <div className="grid grid-cols-4 gap-3">
          {products.map((product, index) => (
            <ProductBox
              key={index}
              image={product.image[0]}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
