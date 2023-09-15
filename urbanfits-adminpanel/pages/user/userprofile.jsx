import React, { useState } from "react";
import { RightArrowIcon } from "@/public/sidebaricons/RightArrowIcon";
import CardAdmin from "@/components/cards/cardadmin";
import Image from "next/image";
import Button from "@/components/buttons/simple_btn";
import { AvatarIcon } from "@/public/sidebaricons/AvatarIcon";
import { AvatarSIcon } from "@/public/icons/AvatarSIcon";
import { CartIcon } from "@/public/sidebaricons/CartIcon";
import { CartLIcon } from "@/public/sidebaricons/CartLIcon";
import { DiamondLIcon } from "@/public/icons/DiamondLIcon";
import { RefreshIcon } from "@/public/icons/RefreshIcon";
import { Dots3Icon } from "@/public/icons/Dots3Icon";
import { ClockIcon } from "@/public/icons/ClockIcon";
import { InputText } from "@/components/InputText";
import { TelegramIcon } from "@/public/icons/TelegramIcon";
import { TwitterIcon } from "@/public/icons/TwitterIcon";
import { FacebookIcon } from "@/public/icons/FacebookIcon";
import { InstagramIcon } from "@/public/icons/InstagramIcon";
const ProfilePic = "https://urban-fits.s3.eu-north-1.amazonaws.com/website-copyrights/default-pfp.jpg";

export default function UserProfile() {
  const [checked, setChecked] = useState(1);

  const handlemenueclick = (id) => {
    setChecked(id);
  };

  return <>
    <div className="flex mt-[15px] justify-between items-center ">
      <div>
        <div className="font_futura">
          <p className="not-italic text-[22px]  font-medium text-black">
            Shipping
          </p>
        </div>
        <div className=" flex items-center mt-[15px] ">
          <li className="  not-italic text-[14px] text-center font-medium text-black list-none">
            Home
          </li>
          <li className=" ml-[12px] not-italic text-[14px] text-center font-medium text-black list-none">
            <RightArrowIcon />
          </li>
          <li className=" ml-[12px] not-italic text-[14px] text-center font-medium text-black list-none">
            User Profile
          </li>
          <li className=" ml-[12px] not-italic text-[14px] text-center font-medium text-black list-none">
            <RightArrowIcon />
          </li>
        </div>
      </div>
      {/*  */}
      <div>
        <Button classes=" w-[85px] " my="my-[0px]"> Edit</Button>
      </div>
      {/*  */}
    </div>

    <CardAdmin classes=" grid grid-cols-6 mt-[20px] ">
      {checked == 1 && (
        <section className="col-span-2  border-r-[1px] border-r-slate-200 p-[40px] flex flex-col  font-[400]">
          <div className="flex flex-col items-center">
            <span className="w-[45px] h-[45px] rounded-[10px] ">
              <Image width={150} height={150} className="w-11 h-11 aspect-square" alt="user avatar" src={ProfilePic} />
            </span>
            <p className="text-[14px] mt-[20px] ">John Deo</p>
            <p className="text-[14px]">John.example@gmail.com</p>
          </div>

          <p className="text-[16px] mt-[60px] ">Contact Information</p>
          <p className="text-[14px] mt-[30px] ">Email Address</p>
          <p className="text-[12px] mt-[5px]  ">John.example@gmail.com</p>

          <p className="text-[14px] mt-[30px] ">Phone Number</p>
          <p className="text-[12px] mt-[5px] ">+00 1234 5678 91</p>

          <p className="text-[14px] mt-[30px] ">Birthday</p>
          <p className="text-[12px] mt-[5px] ">Dec 10, 1991</p>
        </section>
      )}
      {checked == 2 &&
        <section className="col-span-2  border-r-[1px] border-r-slate-200 p-[40px] flex flex-col  font-[400]">
          <div className="flex flex-col items-center">
            <span className="w-[45px] h-[45px] rounded-[10px] ">
              <Image width={150} height={150} alt="user avatar" src={ProfilePic} />
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
      }
      {/*  */}
      <section className="col-span-4 p-[40px]  " style={{ marginTop: "0px" }}>
        <div className="" >
          <div className="flex gap-[62px] z-[-1] text-[16px] ">
            <p
              className={`${checked == 1
                ? "font-[500] border-b-4  border-b-[#f1d73e] "
                : "font-[300] "
                } z-50 px-[16px] pb-[10px] cursor-pointer `}
              onClick={() => handlemenueclick(1)}
            >
              Profile
            </p>
            <p
              className={`${checked == 2
                ? "font-[500] border-b-4  border-b-[#f1d73e]"
                : "font-[300] "
                } z-50 px-[16px] pb-[10px] cursor-pointer`}
              onClick={() => handlemenueclick(2)}
            >
              Setting
            </p>
          </div>
          <hr className=" border-none h-[1px] bg-[#CCCCCC] translate-y-[-1px]   " />
        </div>

        {/*  */}
        <div>
          {checked == 1 && (
            <section>
              <div className="mt-[40px] grid grid-cols-3 gap-[48.06px] ">
                <CardAdmin classes="px-[20px] py-[25px] ">
                  <div className="flex  gap-[20px]  ">
                    <div className="w-[50px] h-[50px] flex justify-center items-center bg_btn_gold_2  rounded-[10px] ">
                      <AvatarSIcon />
                    </div>

                    <div className="flex flex-col  justify-between">
                      <p className="text-[22px] font-[500]">5300</p>
                      <p className="text-[14px] font-[400] ">Bought</p>
                    </div>
                  </div>
                </CardAdmin>
                <CardAdmin classes="px-[20px] py-[25px] ">
                  <div className="flex  gap-[20px]  ">
                    <div className="w-[50px] h-[50px] flex justify-center items-center bg_btn_gold_2  rounded-[10px] ">
                      <CartLIcon />
                    </div>

                    <div className="flex flex-col  justify-between">
                      <p className="text-[22px] font-[500]">5300</p>
                      <p className="text-[14px] font-[400] ">Bought</p>
                    </div>
                  </div>
                </CardAdmin>
                <CardAdmin classes="px-[20px] py-[25px] ">
                  <div className="flex  gap-[20px]  ">
                    <div className="w-[50px] h-[50px] flex justify-center items-center bg_btn_gold_2  rounded-[10px] ">
                      <DiamondLIcon />
                    </div>

                    <div className="flex flex-col  justify-between">
                      <p className="text-[22px] font-[500]">5300</p>
                      <p className="text-[14px] font-[400] ">Bought</p>
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
              <section className="grid grid-cols-1 gap-[20px] ">
                <div className="flex gap-[79px] items-center ">
                  <p className="font-[500] text-[400] ">User Image</p>
                  <InputText
                    mt="mt-[0px]"
                    placeholder="Currently working on it .. "
                    width="100%"
                  />
                </div>

                <div className="grid grid-cols-2 gap-[100px]  ">
                  <InputText label="First Name" placeholder="First Name" />
                  <InputText label="Last Name" placeholder="Last Name" />
                </div>

                <div className="grid grid-cols-1">
                  <InputText label="User Name" placeholder="Last Name" />
                  <p className="font-[300] text-[300] mt-[10px] ">
                    Accusamus nobis at omnis consequuntur culpa tempore saepe
                    animi.
                  </p>
                </div>
                <InputText
                  label="Email"
                  placeholder="Urbanfit.example@gmail.com"
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