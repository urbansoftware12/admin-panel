import React, { useState } from 'react'
import Link from 'next/link'
import { useCart } from "react-use-cart";
import useUser from '@/hooks/useUser';
import Image from 'next/image'
import bag from '@/public/bag.svg'
import heart from '@/public/heart.svg'
import redHeart from '@/public/redHeart.svg'
import toaster from '@/utils/toast_function'
import ImgLoader from '../loaders/imgLoader';
import DemoImg from '@/public/card imgs/demo-img.png'

export default function Shoppingcard(props) {
    const { product } = props
    const { addItem, inCart } = useCart()
    const { wishList, addToWishList, removeFromWishList, inWishList } = useUser()
    const [loading, setLoading] = useState(true)

    return <div {...props} className={`relative bg-gray-100 ${props.classes ? props.classes : "w-full min-h-[250px] h-[250px] md:h-[300px] lg:h-[370px] xl:h-[440px] 2xl:h-[460px]"} ${props.margin ? props.margin : 'mr-auto my-3 md:my-5'} rounded-2xl lg:rounded-3xl hover:scale-[1.01] hover:rounded-xl transition-all duration-500 overflow-hidden`} >
        <button title='Add to Cart' onClick={() => {
            if (inCart(`${product.variants[0]._id}${product.variants[0].sizes[0].size}`)) return toaster('info', 'This item is already in the cart!');
            addItem({ product_id: product._id, original_id: product.variants[0]._id, id: `${product.variants[0]._id}${product.variants[0].sizes[0].size}`, name: product.name, price: product.price, shipping_fee: product.shipping_details.fees, stock: product.variants[0].stock, size: product.variants[0].sizes[0].size, sizes: product.variants[0].sizes, color: product.variants[0].color_name, images: product.variants[0].images }, 1); toaster('success', "Your item is added to the Cart")
        }} className="group w-10 h-10 absolute top-1 right-1 md:top-3 md:right-4 z-10 transition-all duration-300 rounded-full flex justify-center items-center bg-transparent hover:bg-white/60 hover:shadow-xl">
            <Image src={bag} className='w-4 md:w-5' alt='cart' />
        </button>
        <button onClick={() => {
            if (inWishList(product._id)) {
                removeFromWishList(product._id)
                return toaster("info", 'Product removed from WishList.')
            }
            else {
                if (wishList.length > 79) return toaster("info", "You've reached your maximum limit.")
                addToWishList(product._id)
                return toaster("success", 'Product added to WishList.')
            }
        }} title='Add to Wishlist' className="group w-10 h-10 absolute top-1 left-1 md:top-3 md:left-4 z-10 transition-all duration-300 rounded-full flex justify-center items-center bg-transparent hover:bg-white/60 hover:shadow-xl">
            <Image src={inWishList(product._id) ? redHeart : heart} className='w-4 md:w-5' alt='wishlist' />
        </button>
        <Link href={props.link || `/products/product/${product._id}?timestamp=${Date.now()}`}>
            <div className="relative w-full h-3/4 lg:h-[70%] xl:h-[72%] pt-3 lg:pt-5 flex justify-center items-center">
                <ImgLoader loading={loading} />
                <Image src={product.cover_image || DemoImg} width={640} height={853} onLoad={() => setLoading(false)} className={`${loading ? 'w-0 h-0' : 'w-auto h-full'} object-contain`} alt='Urban Fits' />
            </div>
            <div className="w-full h-1/5 md:h-1/5 lg:h-1/5 py-2 lg:py-3 px-4 text-black flex flex-col items-center">
                <span className="w-full font_urbanist_medium text-sm lg:text-base text-center">
                    <p className='truncate'>{props.product.name}</p>
                </span>
                <div className='w-full px-0 md:px-3 my-1 md:my-2 flex flex-row-reverse lg:flex-row justify-between items-center font_urbanist text-[10px] lg:text-sm '>
                    <span className='hidden lg:block'>{product.variants?.length} Color(s)</span>
                    <span className="lg:hidden px-1.5 py-0.5 border text-red-500 text-[9px] font_urbanist rounded-full">Earn 20 UF-Points</span>
                    <span>${props.product.price}</span>
                </div>
                <span className="hidden lg:flex w-full justify-center items-center border text-red-500 text-xs md:text-sm font_urbanist px-2 py-1 rounded-full">Earn 20 UF-Points</span>
            </div>
        </Link>
    </div>
}

export function SmallShoppingcard(props) {
    const { product } = props
    const { addItem, inCart } = useCart()
    const { wishList, addToWishList, removeFromWishList, inWishList } = useUser()

    return <div {...props} className={`relative bg-gray-100 border ${props.classes} w-full min-h-[212px] h-[230px] 2xl:h-[250px] ${props.margin ? props.margin : 'my-3 md:my-5'} rounded-xl hover:scale-[1.01] hover:rounded-lg transition-all duration-500 overflow-hidden`} >
        <button title='Add to Cart' onClick={() => {
            if (inCart(`${product.variants[0]._id}${product.variants[0].sizes[0].size}`)) return toaster('info', 'This item is already in the cart!');
            addItem({ product_id: product._id, original_id: product.variants[0]._id, id: `${product.variants[0]._id}${product.variants[0].sizes[0].size}`, name: product.name, price: product.price, shipping_fee: product.shipping_details.fees, stock: product.variants[0].stock, size: product.variants[0].sizes[0].size, sizes: product.variants[0].sizes, color: product.variants[0].color_name, images: product.variants[0].images }, 1); toaster('success', "Your item is added to the Cart")
        }} className="group w-8 h-8 absolute top-1 right-2 z-20 transition-all duration-300 rounded-full flex justify-center items-center bg-transparent hover:bg-white/60 hover:shadow-xl">
            <Image src={bag} alt='cart' className='w-4' />
        </button>
        <button onClick={() => {
            if (inWishList(product._id)) {
                removeFromWishList(product._id)
                return toaster("info", 'Product removed from WishList')
            }
            else {
                if (wishList.length > 79) return toaster("info", "You've reached your maximum limit.")
                addToWishList(product._id)
                return toaster("success", 'Product added to WishList')
            }
        }} title='Add to Wishlist' className="group w-8 h-8 absolute top-1 left-2 z-20 transition-all duration-300 rounded-full flex justify-center items-center bg-transparent hover:bg-white/60 hover:shadow-xl">
            <Image src={inWishList(product._id) ? redHeart : heart} alt='wishlist' className='w-4 md:w-5' />
        </button>
        <Link href={props.link || `/products/product/${product._id}?timestamp=${Date.now()}`}>
            <div className="relative w-full h-4/5 pt-3">
                <Image src={product.cover_image} width={640} height={853} className="h-full object-contain object-center" alt={product.name} />
            </div>
            <div className="w-full h-1/5 py-2 px-3 text-black flex flex-col items-center">
                <span className="w-full font_urbanist_medium text-[10px] text-center truncate" >
                    {props.product.name}
                </span>
                <div className='w-full mt-1.5 flex justify-between font_urbanist_light text-[8px] '>
                    <span className='tracking-[0.15em]'>{product.variants.length} Color(s)</span>
                    <span className='tracking-[0.15em]'>${product.price}</span>
                </div>
            </div>
        </Link>
    </div>
}
