import React, { useEffect, useState } from 'react';
import '@/styles/globals.css'
import SidebarLayout from '@/components/sidebar-layout';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import useSession from '@/hooks/useSession';
import LoadingBar from 'react-top-loading-bar'
import { ToastContainer } from 'react-toastify'

function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0)
  const {user} = useSession()
  const router = useRouter()
  const adminRoles = ["administrator", "author", "editor"]

  useEffect(() => {
    router.events.on("routeChangeStart", () => setProgress(77))
    router.events.on("routeChangeComplete", () => setProgress(100))
  }, [router.events])

  if(!user) return router.push("/auth/login")
  if(!user._id) return router.push("/auth/login")
  if(!adminRoles.includes(user.role)) return router.push("/auth/login")
  else return <>
    <LoadingBar color='linear-gradient(90deg, #FAE892 0%, #B3903E 70%)' height={4} waitingTime={0} loaderSpeed={200} shadow={true} progress={progress} onLoaderFinished={() => setProgress(0)} />
    <ToastContainer className="toast" />
    {router.pathname.includes("/auth") ? <Component {...pageProps} /> :
      <SidebarLayout>
        <Component {...pageProps} />
      </SidebarLayout>}
  </>
}
export default dynamic(() => Promise.resolve(App), { ssr: false })