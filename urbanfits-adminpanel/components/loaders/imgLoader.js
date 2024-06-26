import React from 'react'
import styles from '@/styles/scroll-top&logo-load.module.css'

export default function ImgLoader({ loading }) {
    if (!loading) return
    else return <div className="w-full h-full flex justify-center items-center">
        <svg className={`${styles.animate_shopcard_load} w-1/4 h-2/5 max-w-[80px]`} width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.1776 15.2445V15.9109C16.1776 20.5289 13.6406 22.5136 9.8029 22.5136C5.96516 22.5136 3.39247 20.5289 3.39247 15.9109V0H0V15.8752C0 22.4033 4.397 25.4 9.76721 25.4C15.1337 25.4 19.5701 22.4033 19.5701 15.8752V15.2445H16.1776Z" fill="url(#paint0_linear_583_237)" />
            <path d="M26.4829 8.78418H15.8176V12.1265H26.4829V8.78418Z" fill="url(#paint1_linear_583_237)" />
            <path d="M29.184 0H15.8176V3.34237H29.184V0Z" fill="url(#paint2_linear_583_237)" />
            <defs>
                <linearGradient id="paint0_linear_583_237" x1="10.2557" y1="25.393" x2="8.9969" y2="-0.438422" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FAE892" />
                    <stop offset="1" stop-color="#B3903E" />
                </linearGradient>
                <linearGradient id="paint1_linear_583_237" x1="21.2444" y1="12.3818" x2="21.0566" y2="8.52873" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FAE892" />
                    <stop offset="1" stop-color="#B3903E" />
                </linearGradient>
                <linearGradient id="paint2_linear_583_237" x1="22.5981" y1="3.66347" x2="22.4039" y2="-0.320929" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FAE892" />
                    <stop offset="1" stop-color="#B3903E" />
                </linearGradient>
            </defs>
        </svg>
    </div>
}
