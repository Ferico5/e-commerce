import CategoryBox from '../components/CategoryBox'

const Collection = () => {
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
        <p>products</p>
      </div>
    </div>
  )
}

export default Collection