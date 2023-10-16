import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
export default function Items(props) {
  const [done, setDone] = useState(false);
  return (
    <div className="w-full flex justify-between items-center">
      <div
        onClick={() => setDone(!done)}
        className={`select-none cursor-pointer w-full border-b p-3 flex justify-between items-center`}
      >
        <div>
          <span className="pr-2  text-[14px] md:text-[10px] text-slate-400">
            {props.time}
          </span>
          <span
            className={`${
              done === true ? "line-through" : ""
            } text-white text-[20px]  md:text-[15px]`}
          >
            {props.item}
          </span>
        </div>
      </div>
      <div
        className="cursor-pointer"
        onClick={() => props.removeHandler(props.id)}
      >
        <BsTrash className="text-[#ffffff]" />
      </div>
    </div>
  );
}
