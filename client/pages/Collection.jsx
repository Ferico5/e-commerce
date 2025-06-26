import { useState } from 'react';
import CategoryBox from '../components/CategoryBox'
import ProductBox from '../components/ProductBox';
import p_img1 from '../assets/frontend_assets/p_img2_1.png'

const Collection = () => {
  const [sortOption, setSortOption] = useState('Relevent');

  return (
    <div className='content border-t border-[#E5E7EB] pt-9 flex justify-between font-outfit'>
      {/* Category */}
      <div className='w-[27.5%] pr-10 pt-1'>
        <span className='text-xl'>FILTERS</span>
        <CategoryBox
          title='CATEGORIES'
          categories={['Men', 'Women', 'Kids']}
          className='mb-5 mt-6'
        />

        <CategoryBox 
          title='TYPE'
          categories={['Topwear', 'Bottomwear', 'Winterwear']}
        />
      </div>
    
      {/* Products */}
      <div className='w-3/4'>
        <div className='flex justify-between text-2xl text-[#707070] mb-5'>
          <p>ALL <span className='text-[#171717] font-[470]'>COLLECTIONS</span></p>
          
          {/* Sort Dropdown */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className='border border-gray-300 text-sm px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-black'
          >
            <option value="Relevent">Sort by: Relevent</option>
            <option value="LowToHigh">Sort by: Low to High</option>
            <option value="HighToLow">Sort by: High to Low</option>
          </select>
        </div>

        {/* Product List */}
        <div className="grid grid-cols-4 gap-3">
          <ProductBox 
            image={p_img1}
            name='tesssssssssssssssssssssssssssssssssssss'
            price='30000'
          />
        </div>
      </div>
    </div>
  )
}

export default Collection