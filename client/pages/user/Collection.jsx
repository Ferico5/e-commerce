import { useState, useEffect } from 'react';
import axios from '../../utils/axiosInstance';
import CategoryBox from '../../components/user/CategoryBox';
import ProductBox from '../../components/user/ProductBox';
import TitleBox from '../../components/user/TitleBox';
import ResponsiveContainer from '../../components/ResponsiveContainer.jsx';
import { useLocation } from 'react-router-dom';
import Search from '../../assets/frontend_assets/search_icon.png';
import Close from '../../assets/frontend_assets/cross_icon.png';

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState('Relevent');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(location.state?.showSearch || false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [openFilters, setOpenFilters] = useState(false);

  useEffect(() => {
    axios
      .get('/list')
      .then((response) => {
        setProducts(response.data.listProduct);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (location.state?.showSearch) {
      setShowSearch(true);
    }
  }, [location.state]);

  // Filter Category (Gender)
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => (prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]));
  };

  // Filter Sub Category (Types)
  const handleSubCategoryChange = (type) => {
    setSelectedSubCategories((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
  };

  // Show Filter what users checklist and search
  const getFilteredProducts = () => {
    return products.filter((product) => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const subCategoryMatch = selectedSubCategories.length === 0 || selectedSubCategories.includes(product.subCategory);
      const searchMatch = product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());

      return categoryMatch && subCategoryMatch && (!showSearch || searchMatch || debouncedSearchTerm === '');
    });
  };

  // Sort By Price and Filter
  const getSortedProducts = () => {
    const filtered = getFilteredProducts();
    if (sortOption === 'LowToHigh') {
      return [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOption === 'HighToLow') {
      return [...filtered].sort((a, b) => b.price - a.price);
    }
    return filtered;
  };

  return (
    <ResponsiveContainer className={`border-t border-[#E5E7EB] flex flex-col justify-between ${showSearch ? `` : `pt-9`}`}>
      {showSearch && (
        <div className="bg-[#F9FAFB] border-t border-b border-[#E5E7EB] mb-4 py-5 flex justify-center">
          <div className="flex items-center gap-2 sm:w-1/2">
            <div className="relative flex-grow">
              <input type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-4 py-2 pr-10 text-sm border border-[#9CA3AF] rounded-full focus:outline-none" />
              <img src={Search} className="w-4 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>

            <img
              src={Close}
              className="w-3 ml-2 cursor-pointer"
              onClick={() => {
                setSearchTerm('');
                setShowSearch(false);
              }}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row">
        {/* FILTERS */}
        <div className="sm:w-[27.5%] sm:pr-10 pt-1">
          {/* Header Filter */}
          <button className="flex items-center w-full sm:block sm:text-left" onClick={() => setOpenFilters(!openFilters)}>
            <span className="text-xl">FILTERS</span>
            {/* Panah cuma muncul di mobile */}
            <span className="sm:hidden text-lg ml-2">{openFilters ? '▲' : '▼'}</span>
          </button>

          {/* Categories (Mobile Accordion) */}
          <div className={`${openFilters ? 'block' : 'hidden'} sm:block`}>
            <CategoryBox title="CATEGORIES" categories={['Men', 'Women', 'Kids']} selected={selectedCategories} onChange={handleCategoryChange} className="mb-5 mt-6" />

            <CategoryBox title="TYPE" categories={['Topwear', 'Bottomwear', 'Winterwear']} selected={selectedSubCategories} onChange={handleSubCategoryChange} />
          </div>
        </div>

        {/* Products */}
        <div className="sm:w-3/4">
          <div className="flex justify-between text-2xl text-[#707070] mb-5 mt-5 sm:mt-0">
            <TitleBox first="ALL" second="COLLECTIONS" size="big" />

            {/* Sort Dropdown */}
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="border border-gray-300 text-sm px-1 md:px-3 md:pr-3 py-2 rounded shadow-sm focus:outline-none hover:cursor-pointer">
              <option value="Relevent">Sort by: Relevent</option>
              <option value="LowToHigh">Sort by: Low to High</option>
              <option value="HighToLow">Sort by: High to Low</option>
            </select>
          </div>

          {/* Product List */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {getSortedProducts().map((product) => (
              <ProductBox key={product._id} id={product._id} image={product.image[0]} name={product.name} price={product.price} />
            ))}
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  );
};

export default Collection;
