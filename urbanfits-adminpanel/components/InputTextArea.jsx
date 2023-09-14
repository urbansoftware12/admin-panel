import React from "react";

const InputTextArea = (props) => {
  return (
    <div>
      <textarea
        className={`  ${props?.width}  ${props.mt || "mt-[12px]"}  ${
          props.className
        } ${props?.h || "h-[44px]"} px-[10px] py-[13.5px]
       ${props?.border || "border-[1px]"}  
     ${props?.rounded || "rounded-lg"}    outline-none `}
        placeholder={` ${props.placeholder || "placeholder"} `}
        type="text"
      />
      
    </div>
  );
};

export default InputTextArea;
