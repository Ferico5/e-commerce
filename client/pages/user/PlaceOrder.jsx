import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext.jsx';
// import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TitleBox from '../../components/user/TitleBox.jsx';
import ResponsiveContainer from '../../components/user/ResponsiveContainer.jsx';
import axios from '../../utils/axiosInstance.js';

const PlaceOrder = () => {
  const { user } = useAuth();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');

  const [subtotal, setSubtotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [total, setTotal] = useState(0);

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // const navigate = useNavigate();

  // const [selectedBank, setSelectedBank] = useState('');

  // const bankOptions = ['BCA', 'BRI', 'BNI', 'Mandiri', 'Permata'];

  // const bankLogos = {
  //   BCA: bca_logo,
  //   BRI: bri_logo,
  //   BNI: bni_logo,
  //   Mandiri: mandiri_logo,
  //   Permata: permata_logo,
  // };

  useEffect(() => {
    axios
      .get('/get-cart')
      .then((response) => {
        const cartItems = response.data.cartItems || [];

        let sub = 0;
        cartItems.forEach((item) => {
          const quantity = item.quantity || 1;
          sub += item.price * quantity;
        });

        const shipping = Math.ceil(sub * 0.1);
        const total = sub + shipping;

        setSubtotal(sub);
        setShippingFee(shipping);
        setTotal(total);
        setCartItems(cartItems);
      })
      .catch((error) => {
        console.error('Error fetching cart for totals:', error);
      });
  }, []);

  const handlePlaceOrder = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (!name || !email || !street || !city || !state || !zipcode || !country || !phone) {
        toast.error('Please fill in all delivery information.');
        return;
      }

      const response = await axios.post('/create-order', {
        userId: user._id,
        items: cartItems,
        paymentMethod: 'bca',
        street,
        city,
        state,
        zipcode,
        country,
        phone,
      });

      if (response.data.success) {
        const redirectUrl = response.data.redirect_url;
        window.location.href = redirectUrl;
      } else {
        toast.error('Failed to place order: ' + response.data.message);
      }
    } catch (err) {
      console.error('Failed to place order:', err);
      toast.error('Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResponsiveContainer className="flex flex-col md:flex-row pt-17">
      <div className="flex flex-col items-start md:w-4/9 font-outfit pr-5">
        <TitleBox first="DELIVERY" second="INFORMATION" />
        <div className="w-full">
          {/* Name */}
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-10 px-3 rounded-md border-1 border-[#D1D5DB] mb-4 mt-[-15px] focus:outline-none hover:cursor-not-allowed"
            placeholder="Full name"
            required
            autoComplete="off"
            disabled
          />
          {/* Email */}
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-10 px-3 rounded-md border-1 border-[#D1D5DB] mb-4 focus:outline-none hover:cursor-not-allowed"
            placeholder="Email"
            required
            autoComplete="off"
            disabled
          />
          {/* Street */}
          <input
            type="text"
            id="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="w-full h-10 px-3 rounded-md border-1 border-[#D1D5DB] mb-4 focus:outline-none"
            placeholder="Street"
            required
            autoComplete="off"
          />
          <div className="flex gap-3">
            {/* City */}
            <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} className="w-full h-10 px-3 rounded-md border-1 border-[#D1D5DB] mb-4 focus:outline-none" placeholder="City" required autoComplete="off" />
            {/* State */}
            <input type="text" id="state" value={state} onChange={(e) => setState(e.target.value)} className="w-full h-10 px-3 rounded-md border-1 border-[#D1D5DB] mb-4 focus:outline-none" placeholder="State" required autoComplete="off" />
          </div>
          <div className="flex gap-3">
            {/* Zipcode */}
            <input
              type="number"
              id="zipcode"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              className="w-full h-10 px-3 rounded-md border-1 border-[#D1D5DB] mb-4 focus:outline-none"
              placeholder="Zipcode"
              required
              autoComplete="off"
            />
            {/* Country */}
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full h-10 px-3 rounded-md border-1 border-[#D1D5DB] mb-4 focus:outline-none"
              placeholder="Country"
              required
              autoComplete="off"
            />
          </div>
          {/* Phone */}
          <input type="number" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full h-10 px-3 rounded-md border-1 border-[#D1D5DB] mb-4 focus:outline-none" placeholder="Phone" required autoComplete="off" />
        </div>
      </div>
      {/* Cart */}
      <div className="md:w-5/9 flex flex-col items-end mt-5 font-outfit text-sm md:pl-15">
        <div className="w-full flex">
          <TitleBox first="CART" second="TOTALS" size="big" />
        </div>
        <div className="w-full flex justify-between pb-2 mt-3 border-b border-[#E5E7EB]">
          <p>Subtotal</p>
          <p>Rp {subtotal.toLocaleString('id-ID')}</p>
        </div>
        <div className="w-full flex justify-between pb-2 mt-3 border-b border-[#E5E7EB]">
          <p>Shipping Fee</p>
          <p>Rp {shippingFee.toLocaleString('id-ID')}</p>
        </div>
        <div className="w-full flex justify-between pb-2 mt-3 font-bold">
          <p>Total</p>
          <p>Rp {total.toLocaleString('id-ID')}</p>
        </div>

        <button onClick={handlePlaceOrder} disabled={loading} className="md:w-2/5 bg-black text-white px-6 py-3 mt-8 hover:cursor-pointer">
          {loading ? 'Processing...' : 'PLACE ORDER'}
        </button>
      </div>
    </ResponsiveContainer>
  );
};

export default PlaceOrder;
