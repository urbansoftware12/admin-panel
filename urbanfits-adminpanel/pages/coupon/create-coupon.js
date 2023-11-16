import React, { useState } from "react";
import CardAdmin from "@/components/cards/cardadmin";
import { InputText } from "@/components/InputText";
import Link from "next/link";
import InputTextArea from "@/components/InputTextArea";
import Button from "@/components/buttons/simple_btn";
import QuestionIcon from "@/public/icons/QuestionIcon";
import { InputSelect } from "@/components/InputSelect";
// import { UpArrowIcon } from "@/public/icons/UpArrowIcon";
// import { TriangleIcon } from "@/public/icons/TriangleIcon";
// import { DownArrowIcon2 } from "@/public/icons/DownArrowIcon2";

const AllCoupon = () => {
    const [checked, setChecked] = useState(1);

    const handlemenueclick = (id) => {
        setChecked(id);
    };
    const handleSectionPosition = (checked) => {
        if (checked == 1) return "translate-x-0"
        if (checked == 2) return "-translate-x-1/3"
        if (checked == 3) return "-translate-x-[66.66%]"
    }

    return <>
        <div className="mt-4 flex flex-col">
            <h2 className="font_futura text-[22px]">Create Coupon</h2>
            <div className="flex items-center mt-4 font_futura text-sm gap-x-3">
                <Link href="/">Home</Link> <i className="fa-solid fa-chevron-right" />
                <span >Coupons</span> <i className="fa-solid fa-chevron-right" />
                <Link href="/allproducts">Create Coupon</Link>
            </div>
        </div>

        <CardAdmin classes="p-10 mt-[30px]">
            <div className="flex flex-col gap-[20px] ">
                <p className="text-[22px] font-[500] ">Add New Coupon</p>
                <InputText h="h-[56px]" placeholder="Coupon Code" />

                <Button classes="w-[179px] " my="my-[0px]" fontSize="text-[12px]">
                    {" "}
                    generate Coupon Code{" "}
                </Button>

                <InputTextArea
                    mt="mt-[0px]"
                    placeholder="Description (optional)"
                    h="h-[96px]"
                    width="w-[100%]"
                />
            </div>
        </CardAdmin>
        <CardAdmin classes="p-10 mt-[30px] overflow-clip">
            <h1 className="text-xl">Coupon Data</h1>
            <div className="text-sm flex gap-[30px]">
                <button className={checked == 1 && "gradient_txt_2"} onClick={() => handlemenueclick(1)}>General</button>
                <button className={checked == 2 && "gradient_txt_2"} onClick={() => handlemenueclick(2)}>Usage Restriction</button>
                <button className={checked == 3 && "gradient_txt_2"} onClick={() => handlemenueclick(3)}>Usage limits</button>
            </div>

            <main className={`w-[300%] flex ${handleSectionPosition(checked)} transition-all duration-300`}>
                <section className={`w-1/3 ${checked !== 1 && "opacity-0"} grid grid-cols-2 gap-10 transition-all duration-300`}>
                    <div className="flex flex-col gap-[30px]">
                        <InputSelect
                            width="w-[100%]"
                            label="Discount type-"
                            postlabel={<QuestionIcon />}
                            options={["Fixed cart down", "others"]}
                        />
                        <div>
                            <p className="text-base flex items-center gap-[5px]">Allow free shipping <QuestionIcon /></p>
                            <div className="flex gap-[10px] mt-[10px] ">
                                <span className="mt-[0px]">
                                    <input type="checkbox" />
                                </span>
                                <p className="text-[14px] font-[400] ">
                                    Check this box if the coupon grants free shipping. A free
                                    shipping method must be enabled in your shipping zone and
                                    be set to require “a valid free shipping coupon” (see the
                                    “Free Shipping Requires” Settings.)
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[30px]">
                        <InputText
                            label="Coupon Amount"
                            postlabel={<QuestionIcon />}
                            placeholder="0"
                            type="number"
                        />
                        <InputText
                            label="Coupon expire date"
                            postlabel={<QuestionIcon />}
                            type="date"
                            placeholder="YYYY-MM-DD"
                        />
                    </div>
                </section>
                <section className={`w-1/3 ${checked !== 2 && "opacity-0"} grid grid-cols-2 gap-10 transition-all duration-300`}>
                    <div className="flex flex-col gap-[39px]" >
                        <InputText
                            label="Minimum spend"
                            postlabel={<QuestionIcon />}
                            placeholder="No minimum"
                            type="number"

                        />
                        <div className="" >
                            <p className="flex items-center text-[14px] font-[500] gap-[30px] " > <p> Individual use only</p> <QuestionIcon /> </p>
                            <div className="flex  gap-[10px] text-[14px] font-[400] mt-[21px] " >
                                <input type="checkbox" />
                                <p>Check this box if the coupon cannot be used in conjunction with other. </p>
                            </div>
                        </div>
                        <InputText
                            label="Product"
                            postlabel={<QuestionIcon />}
                            placeholder="Search for a product"
                        />
                        <InputText
                            label="Product categories"
                            postlabel={<QuestionIcon />}
                            placeholder="Any categories"
                        />
                        <InputText
                            label="Allowed emails"
                            postlabel={<QuestionIcon />}
                            placeholder="No restriction"
                        />



                    </div>

                    <div className="flex flex-col gap-[39px]" >
                        <InputText
                            label="Maximum spend"
                            postlabel={<QuestionIcon />}
                            placeholder="No maximum"
                            type="number"

                        />
                        <div className="" >
                            <p className="flex items-center text-[14px] font-[500] gap-[30px] " > <p> Exclude sale item</p> <QuestionIcon /> </p>
                            <div className="flex  gap-[10px] text-[14px] font-[400] mt-[21px] " >
                                <input type="checkbox" />
                                <p>Check this box if the coupon should not apply to items on sales. &nbsp; &nbsp; &nbsp; </p>
                            </div>
                        </div>
                        <InputText
                            label="Exclude product"
                            postlabel={<QuestionIcon />}
                            placeholder="Search for a product"
                        />
                        <InputText
                            label="Exclude categories"
                            postlabel={<QuestionIcon />}
                            placeholder="No categories"
                        />

                    </div>
                </section>
                <section className={`w-1/3 ${checked !== 3 && "opacity-0"} grid grid-cols-2 gap-10 transition-all duration-300`}>
                    <InputText
                        label="Usage limit coupon"
                        postlabel={<QuestionIcon />}
                        placeholder="Unlimited usage"
                        type="number"

                    />
                    <InputText
                        label="Usage limit per user"
                        postlabel={<QuestionIcon />}
                        placeholder="Unlimited usage"
                        type="number"

                    />
                </section>
            </main>
        </CardAdmin>
        <div className="flex justify-end" >
            <Button> Save Changes </Button>
        </div>
    </>
};
export default AllCoupon