import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import useNewsletter from './useNewsletter';
import toaster from "@/utils/toast_function";
import axios from 'axios';
import jwt from 'jsonwebtoken';

const useSession = create(persist((set, get) => ({
    user: null,
    country: { name: "United Arab Emirates", code: "+971", country: "ae", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/AE.jpg" },
    geo_selected_by_user: false,
    setGeoSelectedByUser: (bool) => set(() => ({ geo_selected_by_user: bool })),
    setCountry: (value) => set(() => ({ country: value })),

    getUsers: async (page) => {
        try {
            const { data } = await axios.get(`${process.env.HOST}/api/user/get/many?user_id${get().user._id}&page=${page}`)
            console.log(data.users)
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
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
    },
    logOut: (redirect) => {
        const { clearNewsletterData } = useNewsletter.getState()
        localStorage.clear()
        window.location.href = redirect || '/'
        clearNewsletterData()
        set(() => ({ user: null }))
        toaster("success", "You are signed out !")
        sessionStorage.clear()
    },
    matchOtpAndUpdate: async (values) => {
        try {
            const { data } = await axios.put(`${process.env.HOST}/api/user/auth-otp-and-change-email`, values)
            const userData = jwt.decode(data.payload)?._doc
            delete userData.password
            set(() => ({ user: userData }))
            toaster("success", data.msg)
            window.location.href = '/auth/login'
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
    }
}),
    { name: "authToken" }
))
export default useSession