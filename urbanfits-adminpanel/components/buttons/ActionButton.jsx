import { DownArowSmallIcon } from "@/public/sidebaricons/DownArowSmallIcon";
import React from "react";
import Link from "next/link";

export default function ActionButton(props) {
  const [menu, setMenu] = React.useState("opacity-0 pointer-events-none");
  const toggleMenu = () => {
    if (menu) return setMenu(null);
    if (!menu) return setMenu("opacity-0 pointer-events-none");
  }

  return <div className="relative w-20 h-9 p-px bg-gold flex justify-center items-center rounded-full" >
    <Link onClick={props.handleInfo} href={props.infoLink} className="w-3/5 h-full mr-px bg-white rounded-l-full flex justify-center items-center text-sm">
      info
    </Link>
    <button onClick={toggleMenu} className="w-2/5 h-full bg-white rounded-r-full flex items-center justify-center" >
      <DownArowSmallIcon color="black" />
    </button>
    <div className={`${menu} z-50 absolute top-10 right-1 flex flex-col px-2 py-1 bg-white shadow-lg rounded-lg border gap-y-1 text-sm transition-all duration-200`} >
      {props.options?.map((option, i) => {
        if (option.link) return <Link key={i} onClick={() => { option.onClick(); toggleMenu() }} name={option.name} href={option.link} className="group flex flex-col justify-between items-center cursor-pointer text-[10px]">
          {option.name}
          <i className='h-px w-0 group-hover:w-full bg-black transition-all' />
        </Link>
        return <button key={i} onClick={() => { option.onClick(); toggleMenu() }} name={option.name} className="group flex flex-col justify-between items-center cursor-pointer text-[10px]">
          {option.name}
          <i className='h-px w-0 group-hover:w-full bg-black transition-all' />
        </button>
      })}
    </div>
  </div>
};