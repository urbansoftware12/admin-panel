import { create } from 'zustand'
import useSession from './useSession';
import toaster from "@/utils/toast_function";
import axios from "axios";

const useProduct = create((set, get) => ({

    products: [],
    productInfo: null,
    productLoading: false,
    totalProducts: 0,
    selectedProducts: [],
    setSelectedProducts: (newArray) => set(() => ({ selectedProducts: newArray })),
    setProductInfo: (info) => set(() => ({ productInfo: info })),

    getProducts: async (page = 1, category_id = null) => {
        set(() => ({
            productLoading: true
        }))
        try {
            if (category_id) {
                console.log(page, category_id)
                const { data } = await axios.get(`${process.env.HOST}/api/products/get/bycategory?id=${category_id}&page=${page}`)
                set(() => ({
                    products: data.products,
                    totalProducts: data.totalProducts,
                    productLoading: false
                }))
                return data.products
            }
            else {
                const { data } = await axios.get(`${process.env.HOST}/api/products/get/many?page=${page}`)
                set(() => ({
                    products: data.products,
                    totalProducts: data.totalProducts,
                    productLoading: false
                }))
                return data.products
            }
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({
            productLoading: false
        }))
    },

    getOneProduct: async (product_id) => {
        set(() => ({
            productLoading: true
        }))
        try {
            const { data } = await axios.get(`${process.env.HOST}/api/products/get/one?id=${product_id}`)
            set(() => ({
                productLoading: false
            }))
            return data.product
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({
            productLoading: false
        }))
    },

    createProduct: async (productToCreate) => {
        const { user } = useSession.getState()
        if (!user) return

        set(() => ({
            productLoading: true
        }))
        try {
            const { data } = await axios.post(`${process.env.HOST}/api/products/create?id=${user._id}`, productToCreate)
            set(() => ({
                productLoading: false
            }))
            return data.product
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({
            productLoading: false
        }))
    },

    updateProduct: async (id, updatedProduct) => {
        const { user } = useSession.getState()
        if (!user) return

        set(() => ({
            productLoading: true
        }))
        try {
            const { data } = await axios.put(`${process.env.HOST}/api/products/update?user_id=${user._id}&id=${id}`, updatedProduct)
            set(() => ({
                productLoading: false,
                productInfo: data.product
            }))
            toaster("success", data.msg)
            return data.product
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({
            productLoading: false
        }))
    },

    deleteProducts: async (productsToDelete) => {
        const { user } = useSession.getState()
        if (!user) return

        set(() => ({
            productLoading: true
        }))
        try {
            const { data } = await axios.put(`${process.env.HOST}/api/products/delete?user_id=${user._id}`, { products: productsToDelete })
            await get().getProducts(1)
            toaster(data.deletedCount < 1 ? "info" : "success", data.msg)
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({
            productLoading: false
        }))
    }

}))

export default useProduct