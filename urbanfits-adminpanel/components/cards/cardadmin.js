import React from 'react'
import LinkBtn from '../buttons/link_btn'

// hover:rounded-2xl 

const CardAdmin = (props)=> {
  return (
    <div className={`${props.classes} ${props.round? props.round: "rounded-[25px]" } bg-white card_boxshadow flex flex-col transition-all duration-300 space-y-8`}>
        {props.children}
    </div>
  )
}

export default CardAdmin