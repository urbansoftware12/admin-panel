import React from 'react'
import styles from '@/styles/Loader.module.css'
import Image from 'next/image'
import Urban_logo from "@/public/logos/logo_gold.svg"

export default function Loader(props) {
    return (
        <section className='fixed inset-0 z-[999] w-screen h-screen flex justify-center items-center bg-black/60 backdrop-blur-sm'>
            <section className="flex flex-col justify-center">
                <div className='flex justify-center items-center'>
                    <Image unoptimized={true} className='fixed w-10 z-50 translate-x-[2px] translate-y-1' src={Urban_logo} alt="Urban logo" ></Image>
                    <div className={styles.loader}></div>
                </div>
                <p className="my-3 text-center text-gray-300 text-sm md:text-lg xl:text-xl">
                    {props.status}
                    {props.status?<i className="ml-4 fa-solid fa-circle fa-bounce text-gray-300"/>:null}
                </p>
            </section>
        </section>
    )
}
