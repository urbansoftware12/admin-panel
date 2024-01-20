import { create } from 'zustand'
import toaster from "@/utils/toast_function";
import axios from "axios";
import AuthHeader, { admin } from '@/utils/auth_header';

const useNotification = create((set, get) => ({

    adminNotifics: [],
    adminNotificLoading: false,

    getAdminNotifics: async () => {
        if (!admin) return
        set(() => ({ adminNotificLoading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/admin/notifications/get`, AuthHeader)
            set(() => ({ adminNotifics: data.notifications }))
        } catch (error) {
            console.log(error)
            if (error.response) toaster("error", error.response.data.msg)
            else toaster("error", "Network Error")
        } finally { set(() => ({ adminNotificLoading: false })) }
    },

    markRead: async (notifications) => {
        if (!admin) return
        try {
            let updatedNotifics = structuredClone(get().adminNotifics);
            for (let notific_id of notifications) {
                const notificIndex = updatedNotifics.findIndex(n => n._id === notific_id);
                updatedNotifics[notificIndex].seen = true;
                updatedNotifics[notificIndex].seen_by = {
                    admin_id: admin._id,
                    name: admin.username
                };
            }
            console.log("here is the udpated notifications array: ", updatedNotifics)
            set(() => ({ adminNotifics: updatedNotifics }))

            await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/admin/notifications/mark-read`, { notifications }, AuthHeader)
        } catch (error) {
            console.log(error)
            if (error.response) toaster("error", error.response.data.msg)
            else toaster("error", "Network Error")
        }
    }
}))

export default useNotification