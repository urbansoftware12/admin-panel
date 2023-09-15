import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/buttons/simple_btn";
import { BasketIcon } from "@/public/sidebaricons/BasketIcon";
import useSession from "@/hooks/useSession";
import CustomTab from "@/components/CustomTabs/CustomTab";
import uploadImage from '@/utils/uploadImage'
import Spinner from '@/components/loaders/spinner'

import { profileTabData } from "@/mock/customtabData";
import { Button2 } from "@/components/buttons/Button2";
import { Badge1 } from "@/components/buttons/badges/Badge1";
import CardAdmin from "@/components/cards/cardadmin";
import CustomModal from "@/components/modals/CustomModal";
import QrCode from "@/public/QrCode.png";
import { InputText } from "@/components/InputText";
const ProfilePic = "https://urban-fits.s3.eu-north-1.amazonaws.com/website-copyrights/default-pfp.jpg";


export default function Profile({ children }) {
  const { user, updateUser } = useSession()
  const [authmodal, setAuthmodal] = useState(false);
  const [imgSpinner, setImgSpinner] = useState(null);
  const [pfp, setPfp] = useState(user.image && user.image !== '' ? user.image : ProfilePic);

  const toggleauthmodal = () => {
    setAuthmodal(!authmodal);
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0]
    setImgSpinner(<Spinner />)
    const imgUrl = await uploadImage(file, user._id, 'user-profiles/')
    setPfp(imgUrl)
    await updateUser({ image: imgUrl })
    setImgSpinner(null)
  }

  return <>
    <div className={` mt-[40px] flex items-center font_futura `}>
      <div className="w-36 h-36 rounded-2xl p-1 bg-gold border border-white flex justify-center items-center overflow-hidden">
        {imgSpinner}
        <Image width={150} height={150} className="w-full h-full rounded-xl object-cover" alt="avatar" src={pfp} />
      </div>
      <div className="ml-[30px]">
        <p className=" text-[22px] mb-0  ">{user?.firstname}&nbsp;{user?.lastname}</p>

        <div className="flex items-center mt-4 ">
          <label htmlFor="pfp" className="px-5 py-2 rounded-full bg-gold-land cursor-pointer text-white">Change Avatar</label>
          <input onChange={onFileChange} type="file" id='pfp' name='pfp' accept="image/*" className="opacity-0 appearance-none w-0 h-0 pointer-events-none " />
          <span className="ml-[20px]">
            <BasketIcon />
          </span>
        </div>

        <p className="text-[14px] mt-[10px] ">
          For best results use an image at least 256px by 256px in either .jpg
          or .png format
        </p>
      </div>
    </div>

    <div className="mt-[43px]" >
      <CustomTab tabdata={profileTabData}  >
        {children}


        <CardAdmin
          classes=" mt-[30px]  p-[40px] rounded-[25px] "
          round="rouded-[25px]"
        >
          <div className="font_futura">
            <p className="text-[22px]  "> Two-Factor Authentication </p>
            <p className="text-[14px] mt-[9px]   max-w-[1121px] ">
              Two-factor authentication is a method for protection your web
              account. When it is activated you need to enter not only your
              password, but also a special code. You can receive this code by in
              mobile app. Even if third person will find your password, then can't
              access with that code.
            </p>

            <div className="flex justify-between">
              <span className="mt-[30px]">
                <Button2
                  onClick={toggleauthmodal}
                  width="w-[160px]">Enable 2FA</Button2>

              </span>
              <div className="flex items-center">
                <p className="text-black text-[12px] "  >CURRENT STATUS:</p>
                <span className="ml-[10px]" >
                  <Badge1>DISABALED</Badge1>

                </span>
              </div>
            </div>
          </div>
        </CardAdmin>

      </CustomTab>
    </div>

    {/*  */}

    <CustomModal
      px="px-[50px]"
      py="py-[40px]"
      width="w-[686.4px]"
      show={authmodal}
      toggleModal={toggleauthmodal}
    >
      <div className="grid grid-cols-1 gap-[20px] ">
        <p className="text-[22px]">Enable 2FA Authentication</p>
        <p className="text-[14px] font-[400]  ">
          Step 1: install this app from{" "}
          <span className="gradient_txt_2"> Google Play </span>or{" "}
          <span className="gradient_txt_2"> App Store </span>{" "}
        </p>

        <p className="text-[14px] font-[400] ">
          Step 2: Scan the QR Code by your Google Authenticator app,
          or you can add account manually.
        </p>

        <div className="flex items-center gap-[17px] " >
          <Image width={200} height={200} alt="qr code" src={QrCode} />

          <div className="grid grid-cols-1 gap-[15px]" >
            <p className="text-[14px] font-[500] " >Enter Google Authenticator Code</p>
            <InputText mt="mt-[0px]" placeholder="Enter the code to verify" width="w-[409.4px]" />
            <Button2 width="w-[170px]" >
              Confirm 2FA
            </Button2>
          </div>

        </div>
      </div>
    </CustomModal>
  </>
}
