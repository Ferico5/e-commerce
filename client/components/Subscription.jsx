const Subscription = () => {
 return <div className="w-full flex flex-col gap-3 items-center justify-center p-10">
    <p className="font-[600] text-gray-800 text-[24px]">
      Subscribe now & get 20% off
    </p>
    <p className="text-gray-500">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </p>
    <div className="mt-5 w-full flex flex-row items-center justify-center">
      <input
        type="text"
        className="w-2/5 h-11 text-[15px] px-[8px] py-[16px] border-gray-300 border-1 font-outfit"
        placeholder="Enter your email"
        autoComplete="off"
      />
      <button className="w-34 h-11 py-[8px] bg-[#000] text-[#FFF] text-[11px] font-outfit hover:cursor-pointer">
        SUBSCRIBE
      </button>
    </div>
  </div>;
};

export default Subscription;
