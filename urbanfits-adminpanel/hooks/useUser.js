import { create } from 'zustand'
import useSession from './useSession';
import toaster from "@/utils/toast_function";
import axios from 'axios';

const useUser = create((set, get) => ({
    users: [],
    totalUsers: 0,
    totalOnline: 0,
    usersLoading: false,
    selectedUsers: [],
    setSelectedUsers: (newArray) => set(() => ({ selectedUsers: newArray })),

    getUsers: async (page = 1) => {
        const { admin } = useSession.getState()
        set(() => ({ usersLoading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/get/many?user_id=${admin._id}&page=${page}`)
            set(() => ({
                users: data.users,
                totalUsers: data.totalUsers,
            }))
            await get().getTotalOnlineUsers()
        } catch (error) {
            console.log(error)
            if (error.response) toaster("error", error.response.data.msg)
        }
        set(() => ({ usersLoading: false }))
    },

    getTotalOnlineUsers: async () => {
        const { admin } = useSession.getState()
        set(() => ({ usersLoading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/get/online-users?user_id=${admin._id}`)
            set(() => ({ totalOnline: data.online_users }))
        } catch (error) { console.log(error) }
        set(() => ({ usersLoading: false }))
    },

    getUserUfBalance: async (user_id, card_number, callback) => {
        set(() => ({ usersLoading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/uf-wallet/get-balance?user_id=${user_id}&card_number=${card_number}`)
            set(() => ({ usersLoading: false }))
            callback(data.balance)
            return data.balance
        } catch (e) { console.log(e) }
        set(() => ({ usersLoading: false }))
    },

    addPointsToUserWallet: async (pointsData, callback) => {
        set(() => ({ usersLoading: true }))
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/user/uf-wallet/add-points`, pointsData)
            set(() => ({ usersLoading: false }))
            callback(data)
            return toaster("success", data.msg)
        } catch (e) { console.log(e) }
        set(() => ({ usersLoading: false }))
    },

    getUserNotifications: async (user_id) => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/notifications/get?user_id=${user_id}`)
            return data.notification_data.notifications
        } catch (error) {
            console.log(error)
            if (error.response) toaster("error", "Error fetching notifications.")
        }
    },

    updateUser: async (user_id, valuesObj) => {
        const { admin } = useSession.getState()
        set(() => ({ usersLoading: true }))
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/user/update/via-admin?admin_id=${admin._id}&user_id=${user_id}`, valuesObj)
            toaster("success", data.msg)
            set(() => ({ usersLoading: false }))
            return data.user
        } catch (error) {
            console.log(error)
            if (error.response) toaster("error", error.response.data.msg)
        }
        set(() => ({ usersLoading: false }))
    },

    resetUser2fa: async (user_id) => {
        const { admin } = useSession.getState()
        set(() => ({ usersLoading: true }))
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/2fa/reset-user-2fa?admin_id=${admin._id}&user_id=${user_id}`)
            toaster("success", data.msg)
            set(() => ({ usersLoading: false }))
            return data.user
        } catch (error) {
            console.log(error)
            if (error.response) toaster("error", error.response.data.msg)
        }
        set(() => ({ usersLoading: false }))
    },

    deleteUsers: async (usersToDelete) => {
        const { admin } = useSession.getState()
        if (!admin) return

        set(() => ({ usersLoading: true }))
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/user/delete/via-admin?user_id=${admin._id}`, { users: usersToDelete })
            toaster("success", data.msg)
        } catch (error) {
            console.log(error)
            if (error.response) toaster("error", error.response.data.msg)
        }
        return set(() => ({ usersLoading: false }))
    }
}))
export default useUser