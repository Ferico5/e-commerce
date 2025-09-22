const TitleBox = ({ first, second, size }) => {
  const baseClasses = 'flex justify-center items-center text-[#707070] mb-2 gap-2';
  const spanClasses = 'text-[#171717] font-[500]';
  const line = <span className="w-12 h-[2px] bg-[#171717]"></span>;

  if (size === 'big') {
    return (
      <div className={`${baseClasses} font-medium text-lg sm:text-2xl md:text-3xl`}>
        <p>
          {first} <span className={spanClasses}>{second}</span>
        </p>
        {line}
      </div>
    );
  } else if (size === 'small') {
    return (
      <div className="flex items-center font-medium text-base sm:text-lg md:text-xl text-[#707070] mb-10 gap-2">
        <p>
          {first} <span className="text-[#171717] font-[470]">{second}</span>
        </p>
        {line}
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center font-medium text-lg sm:text-xl md:text-2xl text-[#707070] mb-13 gap-2">
        <p>
          {first} <span className="text-[#171717] font-[470]">{second}</span>
        </p>
        {line}
      </div>
    );
  }
};

export default TitleBox;
