import React from "react";
import CardAdmin from "@/components/cards/cardadmin";
import Link from "next/link";
import LinkBtn from "@/components/buttons/link_btn";
import Button from "@/components/buttons/simple_btn";
import { CartLIcon } from "@/public/sidebaricons/CartLIcon";
import { ReplaceLIcon } from "@/public/icons/ReplaceLIcon";
import { GiftLIcon } from "@/public/icons/GiftLIcon";
import { TruckLIcon } from "@/public/icons/TruckLIcon";
import { PassengerLIcon } from "@/public/icons/PassengerLIcon";
import { DaimondIcon } from "@/public/sidebaricons/DaimondIcon";
import { CartIcon } from "@/public/sidebaricons/CartIcon";
import { TruckIcon } from "@/public/sidebaricons/TruckIcon";
import DataTable from 'react-data-table-component';
import { orderProductDetailTableColumns, orderProductDetailTableData } from "@/mock/tablesdata";
import mongoose from 'mongoose';
import axios from "axios";

export default function OrderDetails({ order }) {
    const date = new Date(order.createdAt)
    return <>
        <div className="flex mt-[15px] justify-between items-end ">
            <div>
                <h2 className="font_futura text-[22px]">Order Details</h2>
                <div className="flex items-center mt-4 font_futura text-sm gap-x-3">
                    <Link href="/">Home</Link> <i className="fa-solid fa-chevron-right" />
                    <span >Orders</span> <i className="fa-solid fa-chevron-right" />
                    <span>Order Details</span>
                </div>
            </div>
            <LinkBtn href="/products/addproduct" my="my-0">Add Order</LinkBtn>
        </div>

        <CardAdmin classes="px-[0px] py-[0px] mt-[20px] ">
            <div>
                <div className="px-[40px] pt-[57px] flex items-center justify-between ">
                    <p className="text-lg">Order Details</p>
                    <p className="text-base"> Order ID : #{order._id}</p>
                </div>
                <hr className="mt-[17px]" />
                <section className="px-10 py-5 grid grid-cols-3 gap-[67px] ">
                    <nav className="min-h-[183px] border-[#DADADA] border-[1px] rounded-[25px] ">
                        <div className="h-[48.16px] bg-[#F4F4F4] rounded-t-[25px] flex items-center justify-center text-base">
                            <p>Shipping Address:</p>
                        </div>

                        <div className="p-5 text-sm">
                            <p>{order.shipping_address.address_title}</p>
                            <p>{order.shipping_address.firstname} {order.shipping_address.lastname}</p>
                            <p>{order.shipping_address.address}</p>
                            <p>{order.shipping_address.city} {order.shipping_address.country}</p>
                            <p>{order.shipping_address.phone_prefix} {order.shipping_address.phone_number}</p>
                        </div>
                    </nav>
                    <nav className=" min-h-[183px] border-[#DADADA] border-[1px] rounded-[25px] ">
                        <div className="h-[48.16px] bg-[#F4F4F4] rounded-t-[25px] flex items-center justify-center text-base">
                            <p>Billing Address:</p>
                        </div>

                        <div className="p-5 text-sm">
                            <p>{order.billing_address.address_title}</p>
                            <p>{order.billing_address.firstname} {order.billing_address.lastname}</p>
                            <p>{order.billing_address.address}</p>
                            <p>{order.billing_address.city} {order.billing_address.country}</p>
                            <p>{order.billing_address.phone_prefix} {order.billing_address.phone_number}</p>
                        </div>
                    </nav>
                    <nav className="  min-h-[183px] border-[#DADADA] border-[1px] rounded-[25px] ">
                        <div className=" h-[48.16px] bg-[#F4F4F4]  rounded-t-[25px] flex items-center justify-center text-base">
                            <p>Order Date:</p>
                        </div>

                        <div className="p-5 text-sm lowercase">
                            <p>{date.toLocaleString('en-US', { hour: 'numeric', hour12: true }) + " : " + date.getMinutes()} min</p>
                            <p>{date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()}</p>
                        </div>
                    </nav>
                </section>

                <div className=" flex items-center justify-center h-[66px] bg-[#F9F9F9]  border-b-[1px] border-b-[#DADADA] " >
                    <p>Product Details</p>
                </div>

                <div className="p-10" >
                    <DataTable
                        className='scrollbar_x'
                        responsive={true}
                        customStyles={{
                            tableWrapper: {
                                style: {
                                    width: "100%",
                                    display: 'block',
                                    overflowY: 'visible',
                                }
                            },
                            head: { style: { fontSize: '13px' } },
                            rows: { style: { minHeight: "70px" } }
                        }}
                        highlightOnHover
                        sortIcon={<span>&uarr;&darr;</span>}
                        columns={orderProductDetailTableColumns}
                        data={order.order_items?.map(item => {
                            return {
                                ...item,
                                id: item._id,
                            }
                        })}
                    />
                    <div className=" text-[14px] flex items-center gap-[36px] mt-[30px] justify-end " >
                        <span className="flex gap-10px items-center" >
                            <p className="font-[500] " >Item(s):</p>
                            <p className="font-[400]"> 10 </p>
                        </span>
                        <span className="flex gap-10px items-center" >
                            <p className="font-[500] " >Shipping Fee:</p>
                            <p className="font-[400]"> {order.price_details.shipping_fees}د.إ </p>
                        </span>
                        <span className="flex gap-10px items-center" >
                            <p className="font-[500] " >Subtotal:</p>
                            <p className="font-[400]"> {order.price_details.total_price}د.إ </p>
                        </span>
                        <span className="flex gap-10px items-center" >
                            <p className="font-[500] " >Total Price:</p>
                            <p className="font-[400]"> {order.price_details.shipping_fees + order.price_details.total_price}د.إ </p>
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
                    <div className="px-5 py-[30px] text-sm flex justify-between items-center bg-[#F9F9F9] mt-[20px] " >
                        <p>Shipped Via: UPS Ground</p>
                        <p>Status: Checking Quality </p>
                        <p>Expected Date: Dec 09, 2021</p>
                    </div>

                    <div className="grid grid-cols-9 gap-[13.55px] mt-[20px] " >
                        <div className="flex flex-col items-center gap-[15px] " >
                            <div className="w-[50px] h-[50px] flex justify-center items-center bg_btn_gold_2  rounded-xl ">
                                <CartLIcon />
                            </div>
                            <p className="text-center text-[14px] font-[300] " > Confirm Order</p>
                        </div>
                        <span className="mt-[25px] gradient_background h-[1px] " />
                        <div className="flex flex-col items-center gap-[15px] " >
                            <div className="w-[50px] h-[50px] flex justify-center items-center bg_btn_gold_2  rounded-xl ">
                                <ReplaceLIcon />
                            </div>
                            <p className="text-center text-[14px] font-[300] " > Confirm Order</p>
                        </div>
                        <span className="mt-[25px] gradient_background h-[1px] " />
                        <div className="flex flex-col items-center gap-[15px] " >
                            <div className="w-[50px] h-[50px] flex justify-center items-center bg_btn_gold_2  rounded-xl ">
                                <GiftLIcon />
                            </div>
                            <p className="text-center text-[14px] font-[300] " > Confirm Order</p>
                        </div>
                        <span className="mt-[25px] gradient_background h-[1px] " />
                        <div className="flex flex-col items-center gap-[15px] " >
                            <div className="w-[50px] h-[50px] flex justify-center items-center bg-[#DADADA] rounded-xl ">
                                <TruckLIcon />
                            </div>
                            <p className="text-center text-[14px] font-[300] " > Confirm Order</p>
                        </div>
                        <span className="mt-[25px] bg-[black] h-[1px] " />
                        <div className="flex flex-col items-center gap-[15px] " >
                            <div className="w-[50px] h-[50px] flex justify-center items-center bg-[#DADADA] rounded-xl ">
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
export async function getServerSideProps(context) {
    const { order_id } = await context.query
    if (!mongoose.Types.ObjectId.isValid(order_id)) return {
        redirect: {
            destination: '/404',
            permanent: false,
        },
    };
    try {
        const { data } = await axios.get(`${process.env.HOST}/api/user/orders/get-one?order_id=${order_id}`)
        return { props: { order: data.order } }
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