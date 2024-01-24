import React, { useEffect, useState } from 'react';
import '@/styles/globals.css'
import SidebarLayout from '@/components/sidebar-layout';
import Link from "next/link";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import useSession from '@/hooks/useSession';
import useNotification from '@/hooks/useNotification';
import LoadingBar from 'react-top-loading-bar'
import { ToastContainer } from 'react-toastify'
import toaster from "@/utils/toast_function";
import { pusherClient, initBeamsClient } from "@/utils/pusher";

function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0)
  const { admin, emitPresenceEvent, logOut } = useSession();
  const router = useRouter()
  const adminRoles = ["administrator", "author", "editor"]

  useEffect(() => {
    (() => {
      if (!admin || !admin._id) return router.replace("/auth/login")
      else if (!adminRoles.includes(admin.role)) return logOut()
      emitPresenceEvent()

      const adminChannel = pusherClient.subscribe('admin-channel')
      adminChannel.bind('new-notification', (notific_data) => {
        useNotification.setState({ adminNotifics: [notific_data, ...useNotification.getState().adminNotifics] })
        toaster(notific_data.data?.type || "info", <span>{notific_data.data.msg}{notific_data.data?.href && <Link className="underline" href={notific_data.data.href}>&nbsp;Inspect</Link>}</span>, 'bottom-left')
      })
      initBeamsClient()
    })()

    const ignitePresence = () => emitPresenceEvent("user_left")
    window.addEventListener("beforeunload", ignitePresence)

    return () => {
      pusherClient.unsubscribe('admin-channel')
      window.removeEventListener("beforeunload", ignitePresence);
    }
  }, [admin])
  useEffect(() => {
    router.events.on("routeChangeStart", () => setProgress(77))
    router.events.on("routeChangeComplete", () => setProgress(100))
  }, [router.events])

  return <>
    <LoadingBar color='linear-gradient(90deg, #FAE892 0%, #B3903E 70%)' height={4} waitingTime={0} loaderSpeed={200} shadow={true} progress={progress} onLoaderFinished={() => setProgress(0)} />
    <ToastContainer className="toast" />
    {router.pathname.includes("/auth") || router.pathname.includes("/40") ? <Component {...pageProps} /> :
      <SidebarLayout>
        <Component {...pageProps} />
      </SidebarLayout>}
  </>
}
export default dynamic(() => Promise.resolve(App), { ssr: false })