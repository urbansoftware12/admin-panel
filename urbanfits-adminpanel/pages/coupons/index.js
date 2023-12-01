import React, { useState } from "react";
import CardAdmin from "@/components/cards/cardadmin";
import Link from "next/link";
import LinkBtn from "@/components/buttons/link_btn";

export default function AllCoupons() {

    return <>
        <div className="flex mt-[15px] justify-between items-center">
            <nav>
                <h2 className="font_futura text-[22px]">Coupons List</h2>
                <div className="flex items-center mt-4 font_futura text-sm gap-x-3">
                    <Link href="/">Home</Link> <i className="fa-solid fa-chevron-right" />
                    <span >Coupons</span> <i className="fa-solid fa-chevron-right" />
                    <span>Coupon List</span>
                </div>
            </nav>
            <LinkBtn href="/coupons/create-coupon">Create Coupon</LinkBtn>
        </div>

        <CardAdmin classes="p-[40px] mt-[30px] min-h-[80vh]">
        </CardAdmin>
    </>
};