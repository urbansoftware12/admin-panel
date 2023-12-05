import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Logout from "./modals/logout";
import CardAdmin from "@/components/cards/cardadmin";
import useSession from "@/hooks/useSession";
import toaster from "@/utils/toast_function";
import { useRouter } from "next/router";
import logo_outlined from "@/public/icons/logo_outlined.svg";
import { sidebarItems, SearchQueryData } from "@/mock/navData";
import { RightArrowIcon } from "@/public/sidebaricons/RightArrowIcon";
import { DownArowSmallIcon } from "@/public/sidebaricons/DownArowSmallIcon";
import { SettingIcon } from "@/public/sidebaricons/SettingIcon";
import { BellIcon } from "@/public/sidebaricons/BellIcon";
import { SearchIcon } from "@/public/sidebaricons/SearchIcon";
import { LocationIcon } from "@/public/sidebaricons/LocationIcon";
import { CallIcon } from "@/public/sidebaricons/CallIcon";
import AvatarIconV from "@/public/icons/AvatarIconV";
import { ClockIcon } from "@/public/icons/ClockIcon";
import { Button2 } from "@/components/buttons/Button2";
import { pusherClient, presenceInstance } from "@/utils/pusher";

const SideBarItem = ({ item, sidebaropen }, props) => {
    const [expand, setExpand] = useState(false)
    return <div {...props}>
        <div onClick={() => setExpand(!expand)} style={{ margin: sidebarItems.length == props.key + 1 ? "36px 0" : "36px 0 0 0" }} className="flex cursor-pointer justify-between items-center select-none" >
            <Link href={item.navlink || "#"}>
                <div className="flex gap-[10px] items-center font_futura uppercase text-black text-[12px]">
                    <span>{item.icon}</span>
                    {sidebaropen ? item.label : null}
                </div>
            </Link>
            <div className={` cursor-pointer ${item.subrows ? "visible" : "hidden"}  ${sidebaropen ? "visible" : "hidden"}`} >
                <RightArrowIcon className={`${expand ? 'rotate-90' : null} transition-all duration-300`} />
            </div>
        </div>
        {item.subrows && sidebaropen ? item.subrows.map((subitem, index) => (
            <div key={index} className={`items-center gap-2  ${expand ? "max-h-[30vh] flex mt-6 pl-6" : "max-h-0"} select-none transition-all duration-300 overflow-hidden`} >
                <Link key={index} href={subitem.navlink || '#'} className={` font_futura uppercase text-black cursor-pointer text-[12px] font-[500] font-[Futura LT Pro]  ${expand ? "visible" : "hidden"} `}>
                    {subitem.label}
                </Link>
            </div>
        )) : null}
    </div>
}

export default function SidebarLayout({ children }) {
    const { admin } = useSession()
    const router = useRouter()
    const [showmenue, setshowMenue] = useState(false);
    const [shownotification, setShownotification] = useState(false);
    const [arrowmenue, setArrowmenu] = useState(false);
    const [logoutModal, setLogoutModal] = useState(false);

    useEffect(() => {
        const adminChannel = pusherClient.subscribe('admin-channel')
        adminChannel.bind('new-order-received', (data) => {
            toaster("info", <span>{data.msg}<Link className="underline" href='#'>&nbsp;view orders</Link></span>, 'bottom-left')
        })
        adminChannel.bind('new-signup', (data) => {
            toaster("info", <span>{data.msg}<Link className="underline" href={`/user/${data.user_id}?admin_id=${admin._id}` || "#"}>&nbsp;view profile</Link></span>, 'bottom-left')
        })
        adminChannel.bind('login', (data) => {
            toaster("info", <span>{data.msg}<Link className="underline" href={`/user/${data.user_id}?admin_id=${admin._id}` || "#"}>&nbsp;view profile</Link></span>, 'bottom-left')
        })

        const pusherPresenceInst = presenceInstance(admin)
        const presenceChannel = pusherPresenceInst.subscribe('presence-urbanifts')

        return () => {
            pusherClient.unsubscribe('admin-channel')
            presenceChannel.unsubscribe('presence-urbanifts')
        }
    }, [])

    const handlemenuclick = (menu) => {
        if (menu == "avatar") {
            setshowMenue(!showmenue);
            setArrowmenu(false);
            setShownotification(false);
        }
        else if (menu == "arrow") {
            setArrowmenu(!arrowmenue);
            setshowMenue(false);
            setShownotification(false);
        }
        else {
            setShownotification(!shownotification);
            setArrowmenu(false);
            setshowMenue(false);
        }

    }
    const [notchecked, setNotchecked] = useState(1);
    const handlenotmenuclick = (id) => {
        setNotchecked(id);
    };

    const [sidebaropen, setSidebaropen] = React.useState(true);
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const onSearch = (e) => {
        const term = e.target.value.toLowerCase()
        setQuery(term)
        const filteredResults = SearchQueryData.filter((link) => {
            const { label, navlink } = link
            console.log(label, navlink)
            return label.toLowerCase().includes(term) || navlink.toLowerCase().includes(term)
        })
        setResults(filteredResults)
    }

    if (router.asPath.includes("/auth")) return
    else if (!admin || !admin._id || admin._id.length < 18) router.replace("/auth/login")
    else return <div className="flex-col bg-[#F4F4F4] overflow-x-hidden overflow-y-scroll font_futura ">
        <Logout show={logoutModal} setLogout={setLogoutModal} />
        <div className={`fixed ${sidebaropen ? "w-[250px]" : "w-[80px]"} duration-300 ${sidebaropen && "rounded-r-[25px]"} bg-white h-screen`} >
            <div className="flex-col justify-between h-full">
                <div className={`h-[12%] bg-gold ${sidebaropen && "rounded-tr-[25px]"} flex justify-center items-center`} >
                    <Image width={37.05} height={37.05} className="" alt="Urban Fits" src={logo_outlined} />
                    <p className={`font_futura text-white ${!sidebaropen && "hidden"} size text-[22px] ml-[12px]`}>URBAN FITS</p>
                </div>

                <div className={`overflow-x-hidden overflow-y-scroll ${sidebaropen ? "h-3/5" : "h-full"} px-[30px]`} >
                    {sidebarItems.map((item, index) => <SideBarItem key={index} item={item} sidebaropen={sidebaropen} />)}
                </div>

                <div className="w-full h-[27%] pl-[30px] flex flex-col justify-center hide_scrollbar border-t border-gray-300">
                    <p className="font_futura text-[12px] font-[400] text-black ">
                        Language: English
                    </p>
                    <p className="font_futura text-[12px] font-[400] text-black mt-[10px]">
                        Shipping to: United Arab Emirates
                    </p>
                    <div className="flex items-center mt-[10px]">
                        &nbsp;<LocationIcon />
                        <p className="font_futura text-[12px] font-[400] text-black  ml-[15.88px] ">
                            Urban Fits (UAE)
                        </p>
                    </div>
                    <div className="flex items-center mt-[10px]">
                        &nbsp;<CallIcon />
                        <p className="font_futura text-[12px] font-[400] text-black  ml-[15.88px] ">
                            +971 52 700 1997
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div className={`min-h-[100vh] px-[30px] py-[44px] bg-[#F4F4F4] overflow-y-scroll ${sidebaropen ? "ml-[250px]" : "ml-[80px]"}  duration-300 `} >
            <div className={`flex justify-between items-center`}>
                <div className='flex items-center'>
                    <div className="w-1/2 md:w-1/4 flex justify-between">
                        <label className="switch w-[45px] md:w-11 h-6 "><input type="checkbox" name='toggle_sidebar' defaultChecked={true} onChange={() => setSidebaropen(!sidebaropen)} /><span className="slider"></span></label>
                    </div>
                    <div className='relative w-80 h-10 bg-white flex items-center px-3 border border-gray-300 rounded-full gap-x-3 transition-all duration'>
                        <SearchIcon />
                        <input
                            autoComplete="off"
                            type="text"
                            id="search"
                            value={query}
                            onChange={onSearch}
                            className="w-[139px] h-[17px] flex items-center text-[14px] font-[400] font_futuralt bg-transparent outline-none  "
                            placeholder="Search (Keyword, etc)"
                        />
                        {query !== '' ? <button onClick={() => setQuery('')} className='fa-regular fa-circle-xmark mr-2 text-sm absolute right-0 top-1/2 -translate-y-1/2' /> : null}
                    </div>
                </div>

                <div className='flex items-center'>
                    <span onClick={() => handlemenuclick("avatar")} className="w-10 border border-gray-400 aspect-square rounded-full overflow-hidden cursor-pointer" >
                        <Image src={process.env.NEXT_PUBLIC_BASE_IMG_URL + admin.image + "?timestamp=123"} className="w-full h-full object-cover" alt="user avatar" width={80} height={80} />
                    </span>
                    <div className={`duration-200 ${showmenue ? "visible" : "hidden"} absolute top-[89px] right-[154px] `} >
                        <CardAdmin classes="w-[150px] p-5" round="rounded-[15px]" >
                            <div className="flex flex-col gap-3 text-sm" >
                                <Link href="/profile/myprofile" className="group w-full flex flex-col" >My Profile<i className='h-0.5 w-0 group-hover:w-full bg-gold-land transition-all' /></Link>
                                <Link href="/profile/authentication" className="group w-full flex flex-col">Settings<i className='h-0.5 w-0 group-hover:w-full bg-gold-land transition-all' /></Link>
                                <button onClick={() => setLogoutModal(true)} className="group flex flex-col text-left">Log out<i className='h-0.5 w-0 group-hover:w-full bg-gold-land transition-all' /></button>
                            </div>
                        </CardAdmin>
                    </div>

                    <span onClick={() => handlemenuclick("arrow")} className={` cursor-pointer ml-[15px] `}>
                        <DownArowSmallIcon />
                    </span>
                    <div className={` duration-200 ${arrowmenue ? "visible" : "hidden"}   absolute top-[89px] right-[35px] `} >
                        <CardAdmin classes=" w-[150px] p-[20px] " round="rounded-[15px]" >
                            <div className="flex flex-col gap-y-3 text-xs" >
                                <Link href='/admin' className="group w-full flex flex-col">My Account<i className='h-0.5 w-0 group-hover:w-full bg-gold-land transition-all' /></Link>
                                <Link href='/profile/securitysettings' className="group w-full flex flex-col">Security<i className='h-0.5 w-0 group-hover:w-full bg-gold-land transition-all' /></Link>
                                <Link href='/profile/authentication' className="group w-full flex flex-col">2FA Authentication<i className='h-0.5 w-0 group-hover:w-full bg-gold-land transition-all' /></Link>
                            </div>
                        </CardAdmin>
                    </div>

                    <span onClick={() => handlemenuclick("bell")} className={` cursor-pointer ml-[20px] `}>
                        <BellIcon />
                    </span>
                    <div className={` z-[999] duration-200 ${shownotification ? "visible" : "hidden"}   absolute top-[89px] right-[92px] `} >
                        <CardAdmin classes=" w-[320px] p-[20px] z-50 " round="rounded-[15px]" >
                            <div  >
                                <p className=" text-[14px] font-[500] " > Notification </p>
                                <div>
                                    <div className="flex gap-[50px]  text-[16px] mt-[15px] ">
                                        <p
                                            className={`${notchecked == 1
                                                ? "  border-b-2 gradient_txt_2 border-b-[#ccb849] "
                                                : null
                                                }  text-[11px] font-[500] uppercase z-50  pb-[10px] cursor-pointer `}
                                            onClick={() => handlenotmenuclick(1)}
                                        >
                                            Activities
                                        </p>
                                        <p
                                            className={`${notchecked == 2
                                                ? " border-b-2 gradient_txt_2 border-b-[#ccb849]"
                                                : "font-[300] "
                                                } text-[11px] font-[500] uppercase z-50 px-[16px] pb-[10px] cursor-pointer`}
                                            onClick={() => handlenotmenuclick(2)}
                                        >
                                            Notes
                                        </p>
                                        <p
                                            className={`${notchecked == 3
                                                ? " border-b-2 gradient_txt_2 border-b-[#ccb849]"
                                                : "font-[300] "
                                                } text-[11px] font-[500] uppercase  px-[16px] pb-[10px] cursor-pointer`}
                                            onClick={() => handlenotmenuclick(3)}
                                        >
                                            Alerts
                                        </p>
                                    </div>
                                    <hr className=" border-none h-[1px] bg-[#CCCCCC] translate-y-[-1px]  " />
                                </div>
                                {notchecked == 1 &&
                                    <>
                                        {[...Array(5)].map((i) => (
                                            <div key={i} className="flex items-center gap-[15px] my-[9px] " >
                                                <div className="bg-[#B9BBC1] w-[25px] h-[25px] flex items-center justify-center rounded-[50px] " >
                                                    <AvatarIconV fill="white" stroke="white" w="8" h="10" />
                                                </div>
                                                <div  >
                                                    <p className=" text-[12px] font-[500] " >You Joined a Group</p>
                                                    <p className=" text-[10px] font-[300] flex gap-[5px] items-center "> <ClockIcon w="8" h="8" /> <p>Today</p></p>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                }
                                {notchecked == 2 &&
                                    <>
                                        {[...Array(5)].map((i) => (
                                            <div key={i} className="flex items-center gap-[15px] my-[9px] " >
                                                <div className="bg-[#B9BBC1] w-[25px] h-[25px] flex items-center justify-center rounded-[50px] " >
                                                    <AvatarIconV fill="white" stroke="white" w="8" h="10" />
                                                </div>
                                                <div>
                                                    <p className=" text-[12px] font-[500] " >You Joined a Group</p>
                                                    <p className=" text-[10px] font-[300] flex gap-[5px] items-center "> <ClockIcon w="8" h="8" /> <p>Today</p></p>
                                                </div>
                                            </div>

                                        ))}

                                    </>
                                }
                                {notchecked == 3 &&
                                    <>
                                        {[...Array(5)].map((i) => (
                                            <div key={i} className="flex items-center gap-[15px] my-[9px] " >
                                                <div className="bg-[#B9BBC1] w-[25px] h-[25px] flex items-center justify-center rounded-[50px] " >
                                                    <AvatarIconV fill="white" stroke="white" w="8" h="10" />
                                                </div>
                                                <div  >
                                                    <p className=" text-[12px] font-[500] " >You Joined a Group</p>
                                                    <p className=" text-[10px] font-[300] flex gap-[5px] items-center "> <ClockIcon w="8" h="8" /> <p>Today</p></p>
                                                </div>
                                            </div>

                                        ))}

                                    </>
                                }

                                <div className="flex gap-[20px] mt-[20px] " >
                                    <Button2 width="w-[130px]" > Mark All Read </Button2>
                                    <Button2 width="w-[130px]" > Delete All </Button2>
                                </div>
                            </div>
                        </CardAdmin>
                    </div>
                </div>
            </div>
            <hr className={`mt-[20px]`} />
            {/* ////////////////////////////Children START //////////////////////////////////////////////////////// */}
            {query == '' ? children :
                <div className="w-full mt-10 p-5 flex flex-col gap-y-4">
                    {results.map((result, index) => {
                        return <Link key={index} onClick={() => setQuery('')} href={result.navlink || ''} className="group font_futura flex justify-between items-center bg-white p-3 rounded-xl hover:rounded-md shadow-lg transition-all duration-500 overflow-hidden">
                            <div className="h-full">
                                <h2 className="text-lg mb-2 group-hover:translate-y-1/2 group-hover:text-xl transition-all duration-500">{result.label}</h2>
                                <p className="text-sm group-hover:translate-y-20 transition-all duration-500">{result.navlink}</p>
                            </div>
                            <i className="fa-solid fa-chevron-right mr-10 group-hover:translate-x-3 transition-all duration-500" />
                        </Link>
                    })}
                </div>
            }
            {/* ///////////////////////////////Children END///////////////////////////////////////////////////// */}
        </div>
        <div className={`text-center text-xs mb-10 flex justify-center 
      ${sidebaropen ? "w-[120%]" : "w-[105%]"}`} >
            <p>
                Urban Fits L.L.C., Company Reg. Number - 2447 LLC 2023, Registered
                Office Address - 500 4th St NW Suite 102 PMB 1958 Albuquerque, NM
                87102
                <br />
                Urban Fits L.L.C. © 2023-2024 All rights reserved.
            </p>
        </div>
    </div>
}