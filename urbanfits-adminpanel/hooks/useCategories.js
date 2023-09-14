import { create } from 'zustand'
import toaster from "@/utils/toast_function";
import axios from "axios";
import useSession from './useSession';

const useCategories = create((set, get) => ({

    categories: [],
    categLoading: false,

    getCategories: async () => {
        const { user } = useSession.getState()
        if (!user) return

        set(() => ({
            categLoading: true
        }))
        try {
            const { data } = await axios.get(`${process.env.HOST}/api/categories/get?id=${user._id}`)
            set(() => (
                { categories: data.categories }
            ))
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({
            categLoading: false
        }))
    },

    createCategory: async (category) => {
        const { user } = useSession.getState()
        if (!user || user.role === "customer") return

        set(() => ({
            categLoading: true
        }))
        try {
            const { data } = await axios.post(`${process.env.HOST}/api/categories/create?id=${user._id}`, category)
            set(() => (
                { categories: data.categories }
            ))
            toaster("success", data.msg)
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({
            categLoading: false
        }))
    },

    updateCategory: async (update) => {
        const { user } = useSession.getState()
        if (!user || user.role === "customer") return

        set(() => ({
            categLoading: true
        }))
        try {
            const { data } = await axios.put(`${process.env.HOST}/api/categories/update?id=${user._id}`, update)
            set(() => (
                { categories: data.categories }
            ))
            toaster("success", data.msg)
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({
            categLoading: false
        }))
    },

    deleteCategories: async (categoriesToDelete) => {
        const { user } = useSession.getState()
        if (!user || user.role === "customer") return

        set(() => ({
            categLoading: true
        }))
        try {
            const { data } = await axios.put(`${process.env.HOST}/api/categories/delete?id=${user._id}`, { categories: categoriesToDelete })
            set(() => (
                { categories: data.categories }
            ))
            toaster(data.deletedCount < 1 ? "info" : "success", data.msg)
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({
            categLoading: false
        }))
    }

}))

export default useCategories