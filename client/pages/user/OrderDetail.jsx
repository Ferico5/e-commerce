import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../utils/axiosInstance';

const OrderDetail = () => {
  const { id } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await axios.get(`/orders/${id}`);
      // simpan datanya ke state
    };

    fetchOrder();
  }, [id]);
  return (
    <div className="content flex flex-col items-start pt-12 border-t border-[#E5E7EB] font-outfit">
      Detail dari Order: {id}
    </div>
  );
};

export default OrderDetail;
