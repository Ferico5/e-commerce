import { useState, useEffect } from "react";
import axios from "axios";
import CategoryBox from "../../components/CategoryBox";
import ProductBox from "../../components/ProductBox";
import TitleBox from "../../components/TitleBox";

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("Relevent");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/list")
      .then((response) => {
        setProducts(response.data.listProduct);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Filter Category (Gender)
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Filter Sub Category (Types)
  const handleSubCategoryChange = (type) => {
    setSelectedSubCategories((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // Show Filter what users checklist
  const getFilteredProducts = () => {
    return products.filter((product) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const subCategoryMatch =
        selectedSubCategories.length === 0 ||
        selectedSubCategories.includes(product.subCategory);
      return categoryMatch && subCategoryMatch;
    });
  };

  // Sort By Price and Filter
  const getSortedProducts = () => {
    const filtered = getFilteredProducts();
    if (sortOption === "LowToHigh") {
      return [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOption === "HighToLow") {
      return [...filtered].sort((a, b) => b.price - a.price);
    }
    return filtered;
  };

  return (
    <div className="content border-t border-[#E5E7EB] pt-9 flex justify-between font-outfit">
      {/* Category */}
      <div className="w-[27.5%] pr-10 pt-1">
        <span className="text-xl">FILTERS</span>
        <CategoryBox
          title="CATEGORIES"
          categories={["Men", "Women", "Kids"]}
          selected={selectedCategories}
          onChange={handleCategoryChange}
          className="mb-5 mt-6"
        />

        <CategoryBox
          title="TYPE"
          categories={["Topwear", "Bottomwear", "Winterwear"]}
          selected={selectedSubCategories}
          onChange={handleSubCategoryChange}
        />
      </div>

      {/* Products */}
      <div className="w-3/4">
        <div className="flex justify-between text-2xl text-[#707070] mb-5">
          {/* <p>
            ALL <span className="text-[#171717] font-[470]">COLLECTIONS</span>
          </p> */}
          <TitleBox first="ALL" second="COLLECTIONS" />
          {/* Sort Dropdown */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 text-sm px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="Relevent">Sort by: Relevent</option>
            <option value="LowToHigh">Sort by: Low to High</option>
            <option value="HighToLow">Sort by: High to Low</option>
          </select>
        </div>

        {/* Product List */}
        <div className="grid grid-cols-4 gap-3">
          {getSortedProducts().map((product) => (
            <ProductBox
              key={product._id}
              id={product._id}
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
