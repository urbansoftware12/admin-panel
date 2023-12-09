import { create } from 'zustand'
import toaster from "@/utils/toast_function";
import axios from "axios";
import AuthHeader, { admin } from '@/utils/auth_header';

const useOrder = create((set, get) => ({

    orders: [],
    orderInfo: null,
    orderLoading: false,
    totalOrders: 0,
    selectedOrders: [],
    setSelectedOrders: (newArray) => set(() => ({ selectedOrders: newArray })),
    setOrderInfo: (info) => set(() => ({ orderInfo: info })),

    getOrders: async (page = 1) => {
        set(() => ({ orderLoading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/orders/get-many?page=${page}`)
            set(() => ({
                orders: data.orders,
                totalOrders: data.totalorders,
                orderLoading: false
            }))
            return data.orders
        } catch (error) {
            console.log(error)
            if (error.response) toaster("error", error.response.data.msg)
        }
        return set(() => ({ orderLoading: false }))
    },

    getOneOrder: async (order_id) => {
        set(() => ({ orderLoading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/orders/get-one?order_id=${order_id}`)
            set(() => ({ orderLoading: false }))
            return data.order
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({ orderLoading: false }))
    },

    createOrder: async (orderToCreate) => {
        if (!admin) return

        set(() => ({ orderLoading: true }))
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/orders/create`, orderToCreate, AuthHeader)
            set(() => ({ orderLoading: false }))
            return data.order
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({ orderLoading: false }))
    },

    updateOrder: async (id, updatedorder) => {
        if (!admin) return
        set(() => ({ orderLoading: true }))
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/orders/update?id=${id}`, updatedorder, AuthHeader)
            set(() => ({
                orderLoading: false,
                orderInfo: data.order
            }))
            toaster("success", data.msg)
            return data.order
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({ orderLoading: false }))
    },

    deleteOrders: async (orderIds) => {
        if (!admin) return

        set(() => ({ orderLoading: true }))
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/user/orders/delete`, { orders: orderIds }, AuthHeader)
            await get().getOrders(1)
            toaster(data.deletedCount < 1 ? "info" : "success", data.msg)
        } catch (error) {
            console.log(error)
            if (error.response && error.response.data) toaster("error", error.response.data.msg)
        }
        return set(() => ({ orderLoading: false }))
    }

}))

export default useOrder