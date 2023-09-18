import { create } from 'zustand'
import useSession from './useSession';
import toaster from "@/utils/toast_function";
import axios from 'axios';
import jwt from 'jsonwebtoken';

const useUser = create((set, get) => ({
    users: [],
    totalUsers: 0,
    totalOnline: 0,
    usersLoading: false,

    getUsers: async (page = 1) => {
        const { user } = useSession.getState()
        set(() => ({ usersLoading: true }))
        try {
            const { data } = await axios.get(`${process.env.HOST}/api/user/get/many?user_id=${user._id}&page=${page}`)
            set(() => ({
                users: data.users,
                totalUsers: data.totalUsers,
            }))
            await get().getTotalOnlineUsers()
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        set(() => ({ usersLoading: false }))
    },

    getTotalOnlineUsers: async () => {
        const { user } = useSession.getState()
        try {
            const { data } = await axios.get(`${process.env.HOST}/api/user/get/online-users?user_id=${user._id}`)
            set(() => ({ totalOnline: data.online_users }))
        } catch (error) { console.log(error) }
    },

    updateUser: async (valuesObj, updateLocally = false) => {
        if (updateLocally) {
            const userData = jwt.decode(valuesObj)?._doc
            console.log(userData)
            delete userData.password
            set(() => ({ user: userData }))
        }
        else {
            try {
                const { data } = await axios.put(`${process.env.HOST}/api/user/update?id=${get().user._id}`, valuesObj)
                const userData = jwt.decode(data.payload)?._doc
                delete userData.password
                set(() => ({ user: userData }))
                toaster("success", data.msg)
            } catch (error) {
                console.log(error)
                toaster("error", error.response.data.msg)
            }
        }
    }
}))
export default useUser