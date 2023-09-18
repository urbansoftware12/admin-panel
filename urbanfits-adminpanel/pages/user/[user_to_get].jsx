import React, { useState } from "react";
import CardAdmin from "@/components/cards/cardadmin";
import Image from "next/image";
import Button from "@/components/buttons/simple_btn";
import { AvatarSIcon } from "@/public/icons/AvatarSIcon";
import { CartLIcon } from "@/public/sidebaricons/CartLIcon";
import { DiamondLIcon } from "@/public/icons/DiamondLIcon";
import { RefreshIcon } from "@/public/icons/RefreshIcon";
import { Dots3Icon } from "@/public/icons/Dots3Icon";
import { ClockIcon } from "@/public/icons/ClockIcon";
import { InputText } from "@/components/InputText";
const ProfilePic = "https://urban-fits.s3.eu-north-1.amazonaws.com/website-copyrights/default-pfp.jpg";
import axios from "axios";
import mongoose from "mongoose";
import Link from "next/link";

export default function UserProfile({ userData }) {
    const [checked, setChecked] = useState(1);

    const handlemenueclick = (id) => {
        setChecked(id);
    };

    return <>
        <div className="mt-[15px] ">
            <p className="font_futura not-italic text-[22px]  font-medium text-black capitalize">{userData.firstname || userData.username}&apos;s Profile</p>
            <section className="flex justify-between items-center">
                <div className="flex items-center mt-4 font_futura text-sm gap-x-3">
                    <Link href="/">Home</Link> <i className="fa-solid fa-chevron-right" />
                    <span>Users</span> <i className="fa-solid fa-chevron-right" />
                    <Link href="/user/userlist">Users List</Link> <i className="fa-solid fa-chevron-right" />
                    <span>User Profile</span>
                </div>
                <Button classes="w-[85px]" my="0">Edit</Button>
            </section>
        </div>

        <CardAdmin classes=" grid grid-cols-6 mt-[20px] ">
            <section className="col-span-2  border-r-[1px] border-r-slate-200 p-[40px] flex flex-col  font-[400]">
                <div className="flex flex-col items-center">
                    <span className="w-16 aspect-square rounded-xl overflow-hidden ">
                        <Image width={2000} height={2000} className="w-full h-full aspect-square" alt="user avatar" src={userData.image || ProfilePic} />
                    </span>
                    <p className="text-[14px] mt-[20px] ">{userData.firstname || null}&nbsp;{userData.lastname || userData.username}</p>
                    <p className="text-[14px]">{userData.email}</p>
                </div>

                <p className="text-[16px] mt-[60px] ">Contact Information</p>
                <p className="text-[14px] mt-[30px] ">Email Address</p>
                <p className="text-[12px] mt-[5px]  ">{userData.email}</p>

                <p className="text-[14px] mt-[30px] ">Phone Number</p>
                <p className="text-[12px] mt-[5px] ">{userData.phone_prefix || null}&nbsp;{userData.phone_number || "N/A"}</p>

                <p className="text-[14px] mt-[30px] ">Gender</p>
                <p className="text-[12px] mt-[5px] ">{userData.gender || "N/A"}</p>
            </section>
            {/* {checked == 2 &&
                <section className="col-span-2  border-r-[1px] border-r-slate-200 p-[40px] flex flex-col  font-[400]">
                    <div className="flex flex-col items-center">
                        <span className="w-[45px] h-[45px] rounded-[10px] ">
                            <Image width={150} height={150} alt="user avatar" src={userData.image || ProfilePic} />
                        </span>
                        <p className="text-[14px] mt-[20px] ">John Deo</p>
                        <p className="text-[14px]">John.example@gmail.com</p>
                        <Button classes="w-[150px]" my="my-[20px]"   > Follow </Button>
                        <div className="grid grid-cols-3 gap-[35px] font-[400] text-[14px] " >
                            <div className="flex flex-col gap-[15px] " >
                                <p> 1703 </p> <p> Friends</p>
                            </div>
                            <div className="flex flex-col gap-[15px] " >
                                <p> 3005 </p> <p> Followers</p>
                            </div>
                            <div className="flex flex-col gap-[15px] " >
                                <p> 1105 </p> <p> Following </p>
                            </div>

                        </div>
                    </div>

                    <hr className="mt-[17px] " />
                    <div className=" flex flex-col items-center " >
                        <div>
                            <p className="text-[16px] mt-[60px] ">Contact Information</p>
                            <p className="text-[14px] mt-[20px] ">Email Address</p>
                            <p className="text-[14px] mt-[10px]  ">John.example@gmail.com</p>

                            <p className="text-[14px] mt-[20px] ">Phone Number</p>
                            <p className="text-[14px] mt-[10px] ">+00 1234 5678 91</p>

                            <p className="text-[14px] mt-[20px] ">Birthday</p>
                            <p className="text-[14px] mt-[10px] ">Dec 10, 1991</p>

                            <p className="text-[14px] mt-[20px] ">Social</p>
                            <div className="mt-[10px] flex gap-[28px] items-center  " >
                                <TelegramIcon /> <TwitterIcon />  <FacebookIcon /> <InstagramIcon />
                            </div>

                        </div>
                    </div>
                </section>
            } */}
            {/*  */}
            <section className="col-span-4 p-10 !pt-0">
                <div className="" >
                    <div className="flex gap-[62px] z-[-1] text-[16px] ">
                        <button className={`w-20 px-4 flex flex-col justify-between items-center`} onClick={() => handlemenueclick(1)}>
                            Profile
                            <span className={`${checked == 1 && "w-full"} h-1 mt-3 bg-gold-land transition-all`} />
                        </button>
                        <button className={`w-20 px-4 flex flex-col justify-between items-center`} onClick={() => handlemenueclick(2)}>
                            Setting
                            <span className={`${checked == 2 && "w-full"} h-1 mt-3 bg-gold-land transition-all`} />
                        </button>
                    </div>
                    <hr className=" border-none h-[1px] bg-[#CCCCCC] translate-y-[-1px]   " />
                </div>

                <div>
                    {checked == 1 && (
                        <section>
                            <div className="mt-[40px] grid grid-cols-3 gap-10 ">
                                <CardAdmin classes="px-[20px] py-[25px] ">
                                    <div className="flex gap-5">
                                        <div className="w-[50px] h-[50px] flex justify-center items-center bg_btn_gold_2  rounded-[10px] ">
                                            <AvatarSIcon />
                                        </div>

                                        <div className="flex flex-col justify-between">
                                            <p className="text-[22px] font-[500]">{userData.uf_points}</p>
                                            <p className="text-[14px] font-[400] ">UF-points</p>
                                        </div>
                                    </div>
                                </CardAdmin>
                                <CardAdmin classes="px-[20px] py-[25px] ">
                                    <div className="flex gap-5">
                                        <div className="w-[50px] h-[50px] flex justify-center items-center bg_btn_gold_2  rounded-[10px] ">
                                            <CartLIcon />
                                        </div>

                                        <div className="flex flex-col justify-between">
                                            <p className="text-[22px] font-[500]">{userData.purchases}</p>
                                            <p className="text-[14px] font-[400] ">Bought</p>
                                        </div>
                                    </div>
                                </CardAdmin>
                                <CardAdmin classes="px-[20px] py-[25px] ">
                                    <div className="flex gap-5">
                                        <div className="w-[50px] h-[50px] flex justify-center items-center bg_btn_gold_2  rounded-[10px] ">
                                            <DiamondLIcon />
                                        </div>

                                        <div className="flex flex-col  justify-between">
                                            <p className="text-[22px] font-[500]">{0}</p>
                                            <p className="text-[14px] font-[400] ">Vouchers</p>
                                        </div>
                                    </div>
                                </CardAdmin>
                            </div>

                            <CardAdmin classes=" p-[30px] mt-[40px] ">
                                <div className="flex justify-between items-center ">
                                    <p className="font-[500] text-[22px] ">
                                        Latest Notification
                                    </p>
                                    <span className="flex gap-[14px] items-center ">
                                        {" "}
                                        <RefreshIcon /> <Dots3Icon />{" "}
                                    </span>
                                </div>

                                <hr className="mt-[10px]" />

                                <div className="flex flex-col gap-[20px] mt-[20px] ">
                                    {[...Array(7)].map((e, i) => (
                                        <div key={i} className="flex justify-between items-center">
                                            <div className="flex  gap-[20px]  ">
                                                <div className="w-[50px] h-[50px] flex justify-center items-center bg_btn_gold_2  rounded-[10px] ">
                                                    <CartLIcon />
                                                </div>

                                                <div className="flex flex-col  justify-between">
                                                    <p className="text-[14px] font-[400]">New Order</p>
                                                    <p className="text-[14px] font-[300] ">Bought</p>
                                                </div>
                                            </div>

                                            <div className="font-[400] text-[14px] flex items-center gap-[5px] ">
                                                <ClockIcon /> <p>10:00am</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardAdmin>
                        </section>
                    )}
                    {checked == 2 && (
                        <CardAdmin classes="p-[30px] mt-[40px] ">
                            <section className="grid grid-cols-1 gap-[20px]">
                                <div className="w-full flex gap-5 items-center">
                                    <p>User Image</p>
                                    <div className={`w-4/5 pl-[10px] relative flex rounded-lg border border-gray-300 overflow-hidden`}>
                                        <input className="w-3/4 h-full py-2 transition outline-none" />
                                        <button className="w-1/4 h-full py-[9px] text-sm text-white flex justify-center items-center bg-gold-land">Browse</button>
                                        <p className='absolute text-red-400 bottom-[-19px] left-[10px] text-[11px]'></p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-[100px]  ">
                                    <InputText label="First Name" placeholder="First Name" value={userData.firstname} />
                                    <InputText label="Last Name" placeholder="Last Name" value={userData.lastname} />
                                </div>

                                <div className="grid grid-cols-1">
                                    <InputText label="User Name" placeholder="Last Name" value={userData.username} />
                                    <p className="mt-2 font_futura_light text-sm">Username must be unique with no spaces.</p>
                                </div>
                                <InputText
                                    label="Email"
                                    placeholder="example@domain.com"
                                    value={userData.email}
                                />
                                <InputText label="Old Password" placeholder="" />
                                <InputText label="New Password" placeholder="" />
                                <InputText label="Confirm Password" placeholder="" />
                            </section>
                        </CardAdmin>
                    )}
                </div>
            </section>
        </CardAdmin>
    </>
};
export async function getServerSideProps(context) {
    const { user_id, user_to_get } = await context.query
    if (!user_id || !user_to_get || !mongoose.Types.ObjectId.isValid(user_id) || !mongoose.Types.ObjectId.isValid(user_to_get)) return {
        redirect: {
            destination: '/404',
            permanent: false,
        },
    };
    try {
        const { data } = await axios.get(`${process.env.HOST}/api/user/get/byid?user_to_get=${user_to_get}&user_id=${user_id}`)
        console.log(data.user)
        return { props: { userData: data.user } }
    }
    catch (error) {
        console.error(error);
        return {
            redirect: {
                destination: '/404',
                permanent: false,
            },
        };
    }
}