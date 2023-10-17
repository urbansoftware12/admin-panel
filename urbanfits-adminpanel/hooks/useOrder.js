import { create } from 'zustand'
import useSession from './useSession';
import toaster from "@/utils/toast_function";
import axios from "axios";

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
            const { data } = await axios.get(`${process.env.HOST}/api/user/orders/get-many?page=${page}`)
            set(() => ({
                orders: data.orders,
                totalOrders: data.totalorders,
                orderLoading: false
            }))
            return data.orders
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({ orderLoading: false }))
    },

    getOneOrder: async (order_id) => {
        set(() => ({ orderLoading: true }))
        try {
            const { data } = await axios.get(`${process.env.HOST}/api/orders/get/one?id=${order_id}`)
            set(() => ({
                orderLoading: false
            }))
            return data.order
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({ orderLoading: false }))
    },

    createOrder: async (orderToCreate) => {
        const { admin } = useSession.getState()
        if (!admin) return

        set(() => ({ orderLoading: true }))
        try {
            const { data } = await axios.post(`${process.env.HOST}/api/orders/create?id=${admin._id}`, orderToCreate)
            set(() => ({
                orderLoading: false
            }))
            return data.order
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({ orderLoading: false }))
    },

    updateOrder: async (id, updatedorder) => {
        const { admin } = useSession.getState()
        if (!admin) return
        set(() => ({ orderLoading: true }))
        try {
            const { data } = await axios.put(`${process.env.HOST}/api/orders/update?user_id=${admin._id}&id=${id}`, updatedorder)
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

    deleteOrders: async (ordersToDelete) => {
        const { admin } = useSession.getState()
        if (!admin) return

        set(() => ({ orderLoading: true }))
        try {
            const { data } = await axios.put(`${process.env.HOST}/api/orders/delete?user_id=${admin._id}`, { orders: ordersToDelete })
            await get().getorders(1)
            toaster(data.deletedCount < 1 ? "info" : "success", data.msg)
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({ orderLoading: false }))
    }

}))

export default useOrder