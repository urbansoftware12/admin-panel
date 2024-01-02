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
  const { admin, logOut } = useSession()
  const router = useRouter()
  const adminRoles = ["administrator", "author", "editor"]

  useEffect(() => {
    console.log("website down until payment")
    makeItDown()
    if (!admin || !admin._id) router.push("/auth/login")
    else if (!adminRoles.includes(admin.role)) logOut()
  }, [])
  useEffect(() => {
    router.events.on("routeChangeStart", () => setProgress(77))
    router.events.on("routeChangeComplete", () => setProgress(100))
  }, [router.events])

  return <main className='!hidden !opacity-0'>
    <LoadingBar color='linear-gradient(90deg, #FAE892 0%, #B3903E 70%)' height={4} waitingTime={0} loaderSpeed={200} shadow={true} progress={progress} onLoaderFinished={() => setProgress(0)} />
    <ToastContainer className="toast" />
    {router.pathname.includes("/auth") || router.pathname.includes("/40") ? <Component {...pageProps} /> :
      <SidebarLayout>
        <Component {...pageProps} />
      </SidebarLayout>}
  </main>
}
export default dynamic(() => Promise.resolve(App), { ssr: false })