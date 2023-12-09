import { create } from 'zustand'
import useSession from './useSession';
import toaster from "@/utils/toast_function";
import axios from "axios";
import AuthHeader, { admin } from '@/utils/auth_header';

const useCoupon = create((set, get) => ({

    couponLoading: false,
    selectedCoupons: [],
    setSelectedCoupons: (newArray) => set(() => ({ selectedCoupons: newArray })),

    getCoupons: async (callback) => {
        if (!admin) return
        set(() => ({ couponLoading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/coupon/get/many`, AuthHeader)
            callback(data.coupons)
            set(() => ({ couponLoading: false }))
            return data.coupons
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({ couponLoading: false }))
    },

    getOneCoupon: async (coupon_id, callback) => {
        set(() => ({ couponLoading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/coupon/get/one?id=${coupon_id}`)
            set(() => ({ couponLoading: false }))
            if (callback) callback(data.product)
            return data.product
        } catch (error) {
            console.log(error)
            toaster("error", error?.response?.data?.msg)
        }
        return set(() => ({ couponLoading: false }))
    },

    createCoupon: async (couponToCreate, callback) => {
        if (!admin) return

        set(() => ({ couponLoading: true }))
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/coupon/create`, couponToCreate, AuthHeader)
            if (callback) callback(data)
            toaster("success", data.msg)
            set(() => ({ couponLoading: false }))
            return data
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({ couponLoading: false }))
    }
}))

export default useCoupon