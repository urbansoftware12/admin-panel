import React from 'react'
import Image from 'next/image'

export default function DefaultOrPic(props) {
    if(!props.src) return (
        <div className={`w-full bg-gray-100 h-full flex ${props.mega?"flex-col items-center":"items-end"} justify-center`} >
            <h1 className={`${props.mega?null:"hidden"} font_futura text-2xl mb-3`}>Product Cover Image</h1>
            <h2 className={props.mega?`text-2xl lg:text-[30px] font_futura_bold text-center`: "text-xs text-center mb-4"}>{props.mega?"640 X 1145": "1200 X 1265"}</h2>
            <p className={`${props.mega?null: "hidden"} mt-4 lg:mt-7 font_furura text-center text-lg lg:text-xl`}>Please choose image according to the expected ratio</p>
        </div>
    )
    if(props.src) return <Image src={props.src} className={props.mega? "h-full object-contain": "w-full h-full object-cover"} width={props.mega?640: 1200} height={props.mega? 1145: 1265} alt='Product Image' />
}
