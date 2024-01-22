import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import toaster from "@/utils/toast_function";
import axios from 'axios';
import jwt from 'jsonwebtoken';

const useSession = create(persist((set, get) => ({
    admin: null,
    authToken: null,
    authHeader: {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer null`
        }
    },
    country: { name: "United Arab Emirates", code: "+971", country: "ae", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/AE.jpg" },
    geo_selected_by_user: false,
    setGeoSelectedByUser: (bool) => set(() => ({ geo_selected_by_user: bool })),
    setCountry: (value) => set(() => ({ country: value })),

    updateAdmin: async (valuesObj, updateLocally = false,) => {
        if (updateLocally) {
            try {
                const userData = jwt.decode(valuesObj)?._doc
                set(() => ({
                    authToken: valuesObj,
                    authHeader: {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': "Bearer " + valuesObj
                        }
                    }
                }))
                delete userData.password
                if (userData.role !== "administrator") return toaster("error", "403 Forbidden. Only administrator allowed.")
                else set(() => ({ admin: userData }))
            } catch (e) {
                console.log(e)
                toaster("error", "Error 403: Admin acces denied. Please try again.")
            }
        }
        else {
            try {
                const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/user/update?id=${get().admin._id}`, valuesObj)
                const userData = jwt.decode(data.payload)?._doc
                delete userData.password
                if (userData.role !== "administrator") return toaster("error", "403 Forbidden. Only administrator allowed.")
                else {
                    set(() => ({ admin: userData }))
                    toaster("success", data.msg)
                }
            } catch (error) {
                console.log(error)
                toaster("error", error.response.data.msg)
            }
        }
    },
    emitPresenceEvent: async (event_name = "user_joined") => {
        const { admin } = get()
        if (!admin) return
        try {
            axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/user/presence`, {
                event: {
                    name: event_name,
                    user_id: admin._id
                }
            })
        } catch (e) { console.log("Error emitting presence event: ", e) }
    },
    logOut: (redirect) => {
        localStorage.clear()
        window.location.href = redirect || '/'
        set(() => ({ admin: null }))
        toaster("success", "You are signed out !")
        sessionStorage.clear()
    },
    matchOtpAndUpdate: async (values) => {
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/user/auth-otp-and-change-email`, values)
            const userData = jwt.decode(data.payload)?._doc
            delete userData.password
            set(() => ({ admin: userData }))
            toaster("success", data.msg)
            window.location.href = '/auth/login'
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
    }
}),
    { name: "authToken", storage: createJSONStorage(() => sessionStorage) }
))
export default useSession