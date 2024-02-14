import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import toaster from "@/utils/toast_function";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { parse } from "cookie"

const useSession = create(persist((set, get) => ({
    admin: null,
    adminLoading: false,
    authToken: null,
    authHeader: {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer null`
        }
    },
    country: { name: "United Arab Emirates", code: "+971", country: "ae", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/AE.jpg" },
    isLoggedIn: () => {
        const { "is_logged_in": isLoggedIn } = parse(document.cookie);
        console.log("the login cookie: ", isLoggedIn)
        return isLoggedIn && isLoggedIn === "true";
    },
    setGeoSelectedByUser: (bool) => set(() => ({ geo_selected_by_user: bool })),
    setCountry: (value) => set(() => ({ country: value })),

    getMe: async () => {
        const { isLoggedIn, updateAdmin } = get();
        if (!isLoggedIn()) return;
        set(() => ({ adminLoading: true }));
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/get/me`)
            await updateAdmin(data.payload, true)
        }
        catch (error) {
            console.log(error)
            toaster("error", error.response?.data.msg || (navigator.onLine ? "Oops! somethign went wrong." : "Network Error"))
        } finally { set(() => ({ adminLoading: false })); }
    },

    signIn: async (credentials, callback, router) => {
        const { isLoggedIn, updateAdmin } = get();
        if (isLoggedIn()) return toaster("info", "You are already logged in.");
        set(() => ({ adminLoading: true }));
        try {
            const axiosData = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/auth/login`, credentials)
            const { data } = axiosData;
            console.log("the login data: ", data, axiosData)
            if (data.redirect_url && !data.payload) router.push(data.redirect_url)
            else if (data.payload) {
                await updateAdmin(data.payload, true)
                router.replace("/")
                console.log("i reached here that means i redirected user to the home page")
                toaster("success", data.msg)
                if (callback) callback(data)
            }
        }
        catch (error) {
            console.log(error)
            toaster("error", error.response?.data.msg || (navigator.onLine ? "Oops! somethign went wrong." : "Network Error"))
        } finally { set(() => ({ adminLoading: false })); }
    },

    updateAdmin: async (valuesObj, updateLocally = false,) => {
        if (updateLocally) {
            try {
                const userData = jwt.decode(valuesObj)
                if (userData.role !== "administrator") return toaster("error", "401 Admin Unauthorized. Only administrator allowed.")
                else set(() => ({ admin: userData }))
            } catch (e) {
                console.log(e)
                toaster("error", "Error 403: Admin acces denied. Please try again.")
            }
        }
        else {
            try {
                const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/user/update`, valuesObj)
                const userData = jwt.decode(data.payload)
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
    logOut: async (router) => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/auth/logout`);
            router.replace("/");
        } catch (e) { console.log("Coouldn't log out.", e) }
        finally {
            localStorage.clear()
            sessionStorage.clear()
            set(() => ({ admin: null, adminLoading: false }))
            toaster("success", "You are signed out !")
        }
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