import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../utils/axiosInstance.js';
import star from '../../assets/frontend_assets/star_icon.png';
import star_dull from '../../assets/frontend_assets/star_dull_icon.png';
import ProductBox from '../../components/user/ProductBox';
import ResponsiveContainer from '../../components/user/ResponsiveContainer.jsx';
import { toast } from 'react-toastify';
import { useCart } from '../../auth/CartContext';
import { useAuth } from '../../auth/AuthContext.jsx';

const Product = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { setCartCount, fetchCartCount } = useCart();

  useEffect(() => {
    axios
      .get(`/single/${id}`)
      .then((res) => {
        const productData = res.data.singleProduct;
        setProduct(productData);
        setMainImage(productData.image[0]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch((err) => {
        console.error('Failed to fetch product:', err);
      });
  }, [id]);

  useEffect(() => {
    if (product?.category) {
      axios
        .get(`/products?category=${product.category}`)
        .then((res) => {
          const filtered = res.data.products.filter((p) => p._id !== product._id);
          setRelatedProducts(filtered.slice(0, 5));
        })
        .catch((err) => {
          console.error('Failed to fetch related products:', err);
        });
    }
  }, [product]);

  const handleAddToCart = async () => {
    if (!token || !user) {
      navigate('/login');
      return;
    }

    if (!selectedSize) {
      toast.error('Please select a size first!');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const body = {
        productId: product._id,
        quantity: 1,
        size: selectedSize,
      };

      await axios.post('/add-cart', body, config);
      await fetchCartCount();
      toast.success('Item added to cart!');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error('Failed to add to cart!');
    }
  };

  if (!product) return null;

  return (
    <ResponsiveContainer className="flex-col border-t border-[#E5E7EB] pt-10">
      <div className="flex flex-col md:flex-row">
        {/* Picture Product */}
        <div className="w-full md:w-1/2 flex flex-col-reverse md:flex-row">
          <div className="flex flex-row md:flex-col gap-3 justify-between md:justify-start">
            {product.image.map((img, i) => (
              <img key={i} src={img} onClick={() => setMainImage(img)} className="w-2/9 md:w-25 md:h-29 mt-2 md:mt-0 object-cover hover:cursor-pointer" />
            ))}
          </div>
          <div className="md:ml-3">
            <img src={mainImage} className="w-full md:w-105 md:h-125 object-cover" />
          </div>
        </div>

        {/* Detail Product */}
        <div className="md:w-[40%] pt-3 md:pl-6">
          {/* Name Product */}
          <p className="text-2xl font-medium">{product.name}</p>
          {/* Star Product */}
          <div className="flex gap-1 py-2 items-center">
            <div className="flex gap-1 h-3">
              <img src={star} className="w-3" />
              <img src={star} className="w-3" />
              <img src={star} className="w-3" />
              <img src={star} className="w-3" />
              <img src={star_dull} className="w-3" />
            </div>
            <p className="ml-2">(122)</p>
          </div>
          {/* Price Product */}
          <p className="mt-2 mb-2 text-2xl font-medium">Rp. {product.price}</p>
          {/* Desc Product */}
          <p className="text-[#5C6872] mt-6">{product.description}</p>
          {/* Size Product */}
          <p className="mt-9">Select Size</p>
          <div className="flex gap-2 mt-3">
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => {
              const isAvailable = product.sizes.includes(size);
              const isSelected = selectedSize === size;

              return (
                <button
                  key={size}
                  onClick={() => isAvailable && setSelectedSize(size)}
                  disabled={!isAvailable}
                  className={`px-4 py-2 border font-medium transition rounded-sm ${
                    isAvailable
                      ? isSelected
                        ? 'bg-black text-white border-black hover:cursor-pointer'
                        : 'bg-white text-black border-gray-300 hover:border-black hover:cursor-pointer'
                      : 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
          {/* Add to Cart Button */}
          <button className="mt-8 px-8 py-3 border text-sm bg-black text-white hover:cursor-pointer" onClick={handleAddToCart}>
            ADD TO CART
          </button>

          {/* Additional Info */}
          <div className="mt-8 pt-5 border-t border-[#E5E7EB] text-[#5C6872] text-sm text-sm/5.5">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Desc and Review */}
      <div className="text-sm mt-20">
        <div className="flex">
          <p className="border border-[#E5E7EB] px-5 py-3 font-bold">Description</p>
          <p className="border border-[#E5E7EB] px-5 py-3">Reviews (122)</p>
        </div>
        <div className="flex flex-col justify-around border border-[#E5E7EB] px-5 py-3 md:py-7 text-[#5C6872]">
          <p>
            An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products,
            interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant
            information.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <div className="flex justify-center text-3xl text-[#707070] mt-30">
        <p>
          RELATED <span className="text-[#171717] font-[470]">PRODUCTS</span>
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-3 mb-10">
        {relatedProducts.map((item) => (
          <ProductBox key={item._id} id={item._id} image={item.image[0]} name={item.name} price={item.price} />
        ))}
      </div>
    </ResponsiveContainer>
  );
};

export default Product;
