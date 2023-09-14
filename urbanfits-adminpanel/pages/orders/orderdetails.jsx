import React from "react";
import CardAdmin from "@/components/cards/cardadmin";
import { RightArrowIcon } from "@/public/sidebaricons/RightArrowIcon";
import Button from "@/components/buttons/simple_btn";
import GenericTable2 from "@/components/GenericTables/GenericTable2";
import { orderProductDetailTableColumns, orderProductDetailTableData } from "@/mock/tablesdata";
import { DaimondIcon } from "@/public/sidebaricons/DaimondIcon";
import { CartIcon } from "@/public/sidebaricons/CartIcon";
import { CartLIcon } from "@/public/sidebaricons/CartLIcon";
import { ReplaceLIcon } from "@/public/icons/ReplaceLIcon";
import { TruckIcon } from "@/public/sidebaricons/TruckIcon";
import { GiftLIcon } from "@/public/icons/GiftLIcon";
import { TruckLIcon } from "@/public/icons/TruckLIcon";
import { PassengerLIcon } from "@/public/icons/PassengerLIcon";

const orderdetails = () => {
  return <>
    <div className="flex mt-[15px] justify-between items-center ">
      <div>
        <div className="font_futura">
          <p className="not-italic text-[22px]  font-medium text-black">
            Order Details
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
            Order Details
          </li>
          <li className=" ml-[12px] not-italic text-[14px] text-center font-medium text-black list-none">
            <RightArrowIcon />
          </li>
        </div>
      </div>
      {/*  */}
      <div>
        <span>
          <Button my="my-[0px]"> Add Oder</Button>
        </span>
      </div>
      {/*  */}
    </div>

    <CardAdmin classes="px-[0px] py-[0px] mt-[20px] ">
      <div>
        <div className="px-[40px] pt-[57px] flex items-center justify-between ">
          <p className="text-[18px] font-[400] ">Order Details</p>
          <p className="text-[16px] font-[300] "> Order ID : #1092</p>
        </div>
        <hr className="mt-[17px]" />
        <div className="px-[40px] py-[20px] grid grid-cols-4 gap-[67px] ">
          <section className=" min-h-[183px] border-[#DADADA] border-[1px] rounded-[25px] ">
            <div
              className=" h-[48.16px] bg-[#F4F4F4]  rounded-t-[25px] 
                flex items-center justify-center text-[16px] font-[500]  "
            >
              <p>Customer:</p>
            </div>

            <div className="p-[20px] text-[14px] font-[400]  ">
              <p>Twitter, Inc.</p>
              <p>795 Falsom Ave, Suit 600 San Francisco, CA 94107</p>
              <p>P: ( 23) 456-7890</p>
            </div>
          </section>
          <section className=" min-h-[183px] border-[#DADADA] border-[1px] rounded-[25px] ">
            <div
              className=" h-[48.16px] bg-[#F4F4F4]  rounded-t-[25px] 
                flex items-center justify-center text-[16px] font-[500]  "
            >
              <p>Shipped To:</p>
            </div>

            <div className="p-[20px] text-[14px] font-[400]  ">
              <p>Elaine Hernandez</p>
              <p>P Sherman 42, Wallaby way, Sydney</p>
              <p>P: ( 123 ) 456-7890</p>
            </div>
          </section>
          <section className=" min-h-[183px] border-[#DADADA] border-[1px] rounded-[25px] ">
            <div
              className=" h-[48.16px] bg-[#F4F4F4]  rounded-t-[25px] 
                    flex items-center justify-center text-[16px] font-[500]  "
            >
              <p>Payment Method:</p>
            </div>

            <div className="p-[20px] text-[14px] font-[400]  ">
              <p>Visa ending ****1234</p>
              <p>h.Elain@gmail.com</p>
            </div>
          </section>
          <section className="  min-h-[183px] border-[#DADADA] border-[1px] rounded-[25px] ">
            <div
              className=" h-[48.16px] bg-[#F4F4F4]  rounded-t-[25px] 
                    flex items-center justify-center text-[16px] font-[500]  "
            >
              <p>Order Date:</p>
            </div>

            <div className="p-[20px] text-[14px] font-[400]  ">
              <p>4:34 PM,</p>
              <p>Wed, Aug 13, 2020</p>
            </div>
          </section>
        </div>

        <div className=" flex items-center justify-center h-[66px] 
          bg-[#F9F9F9]  border-b-[1px] border-b-[#DADADA] " >
          <p>Product Details</p>
        </div>

        <div className="p-[40px] " >

          <GenericTable2 columns={orderProductDetailTableColumns} data={orderProductDetailTableData} />


          <div className=" text-[14px] flex items-center gap-[36px] mt-[30px] justify-end " >
            <span className="flex gap-10px items-center  " >
              <p className="font-[500] " >Unit:</p>
              <p className="font-[400]"> 10 </p>
            </span>
            <span className="flex gap-10px items-center  " >
              <p className="font-[500] " >VAT:</p>
              <p className="font-[400]"> $10.00 </p>
            </span>
            <span className="flex gap-10px items-center  " >
              <p className="font-[500] " >Total Price:</p>
              <p className="font-[400]"> $2400.00 </p>
            </span>
            <span className="flex gap-10px items-center  " >
              <p className="font-[500] " >Payment Status:</p>
              <p className="font-[400]"> Paid </p>
            </span>
            <span className="flex gap-10px items-center  " >
              <p className="font-[500] " >Taxes:</p>
              <p className="font-[400]"> N/A </p>
            </span>
          </div>

        </div>
      </div>
    </CardAdmin>

    <CardAdmin classes="mt-[20px]" >
      <div>
        <div className="flex justify-center items-center text-[14px] font-[400] mt-[43px] mb-[13.5px] " >
          <p>Tracking Order No - 34VB5540K83</p>
        </div>
        <hr />

        <div className="px-[40px] pt-[20x] pb-[30px]   " >
          <div className="px-[20px] py-[30px]  text-[14px] font-[400]
        flex justify-between items-center bg-[#F9F9F9] mt-[20px] " >
            <p>Shipped Via: UPS Ground</p>
            <p>Status: Checking Quality </p>
            <p>Expected Date: Dec 09, 2021</p>
          </div>

          <div className="grid grid-cols-9 gap-[13.55px] mt-[20px] " >
            <div className="flex flex-col items-center gap-[15px] " >
              <div className="w-[50px] h-[50px] flex justify-center items-center bg_btn_gold_2 
               rounded-[10px] ">
                <CartLIcon />
              </div>
              <p className="text-center text-[14px] font-[300] " > Confirm Order</p>
            </div>
            <span className="mt-[25px] gradient_background h-[1px] " />
            <div className="flex flex-col items-center gap-[15px] " >
              <div className="w-[50px] h-[50px] flex justify-center items-center bg_btn_gold_2 
               rounded-[10px] ">
                <ReplaceLIcon />
              </div>
              <p className="text-center text-[14px] font-[300] " > Confirm Order</p>
            </div>
            <span className="mt-[25px] gradient_background h-[1px] " />
            <div className="flex flex-col items-center gap-[15px] " >
              <div className="w-[50px] h-[50px] flex justify-center items-center bg_btn_gold_2 
               rounded-[10px] ">
                <GiftLIcon />
              </div>
              <p className="text-center text-[14px] font-[300] " > Confirm Order</p>
            </div>
            <span className="mt-[25px] gradient_background h-[1px] " />
            <div className="flex flex-col items-center gap-[15px] " >
              <div className="w-[50px] h-[50px] flex justify-center items-center bg-[#DADADA]
               rounded-[10px] ">
                <TruckLIcon />
              </div>
              <p className="text-center text-[14px] font-[300] " > Confirm Order</p>
            </div>
            <span className="mt-[25px] bg-[black] h-[1px] " />
            <div className="flex flex-col items-center gap-[15px] " >
              <div className="w-[50px] h-[50px] flex justify-center items-center bg-[#DADADA]
               rounded-[10px] ">
                <PassengerLIcon />
              </div>
              <p className="text-center text-[14px] font-[300] " > Confirm Order</p>
            </div>
          </div>
        </div>
      </div>
    </CardAdmin>
  </>
};

export default orderdetails;

