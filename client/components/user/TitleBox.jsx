const TitleBox = (props) => {
  function TitleSize() {
    if (props.size === "big") {
      return (
        <div className="flex justify-center items-center font-medium text-3xl text-[#707070] mb-2 gap-2">
          <p>
            {props.first}{" "}
            <span className="text-[#171717] font-[500] "> {props.second}</span>
          </p>
          <span className="w-12 h-[2px] bg-[#171717]"></span>
        </div>
      );
    } else if (props.size === "small") {
      return (
        <div className="flex items-center font-medium text-xl text-[#707070] mb-10 gap-2">
          <p>
            {props.first}{" "}
            <span className="text-[#171717] font-[470]"> {props.second}</span>
          </p>
          <span className="w-12 h-[2px] bg-[#171717]"></span>
        </div>
      );
    } else {
      return (
        <div className="flex justify-center items-center font-medium text-2xl text-[#707070] mb-13 gap-2">
          <p>
            {props.first}{" "}
            <span className="text-[#171717] font-[470]"> {props.second}</span>
          </p>
          <span className="w-12 h-[2px] bg-[#171717]"></span>
        </div>
      );
    }
  }
  return TitleSize();
};

export default TitleBox;
