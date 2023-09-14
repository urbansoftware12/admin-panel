import React, { useState } from "react";
import { RightArrowIcon } from "@/public/sidebaricons/RightArrowIcon";
import CardAdmin from "@/components/cards/cardadmin";
import { InputText } from "@/components/InputText";
import InputTextArea from "@/components/InputTextArea";
import Button from "@/components/buttons/simple_btn";
import { QuestionIcon } from "@/public/icons/QuestionIcon";
import { InputSelect } from "@/components/InputSelect";
import { UpArrowIcon } from "@/public/icons/UpArrowIcon";
import { TriangleIcon } from "@/public/icons/TriangleIcon";
import { DownArrowIcon2 } from "@/public/icons/DownArrowIcon2";

const allcoupon = () => {
  const [checked, setChecked] = useState(1);

  const handlemenueclick = (id) => {
    setChecked(id);
  };

  return <>
    <div className="font_futura">
      <p className="not-italic text-[22px] mt-[15px] font-medium text-black">
        Coupon
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
        Coupon
      </li>
      <li className=" ml-[12px] not-italic text-[14px] text-center font-medium text-black list-none">
        <RightArrowIcon />
      </li>
      <li className=" ml-[12px] not-italic text-[14px] text-center font-medium text-black list-none">
        Add Coupon
      </li>
    </div>

    <CardAdmin classes="p-[40px] mt-[30px] ">
      <div className="flex flex-col gap-[20px]  ">
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
    <CardAdmin classes="p-[40px] mt-[30px] ">

      <p className="text-[16px] font-[500] bg-[#DADADA] p-[10px]  ">
        <p> Coupon Data </p>
      </p>

      <div className="text-[14px] font-[500] flex gap-[30px]">
        <p
          className={`${checked == 1 && "gradient_txt_2"} cursor-pointer `}
          onClick={() => handlemenueclick(1)}
        >
          General
        </p>
        <p
          className={`${checked == 2 && "gradient_txt_2"} cursor-pointer `}
          onClick={() => handlemenueclick(2)}
        >
          Usage Restriction
        </p>
        <p
          className={`${checked == 3 && "gradient_txt_2"} cursor-pointer `}
          onClick={() => handlemenueclick(3)}
        >
          Usage limits
        </p>
      </div>

      <main>
        {checked == 1 && (
          <section className="grid grid-cols-2 gap-[40px]">
            <div className="flex flex-col gap-[30px]">
              <InputSelect
                width="w-[100%]"
                label="Discount type-"
                postlabel={<QuestionIcon />}
                options={["Fixed cart down", "others"]}
              />
              <div>
                <p className="text-[16px] font-[500] flex items-center gap-[5px] ">
                  {" "}
                  <p> Allow free shipping</p> <QuestionIcon />{" "}
                </p>
                <div className="flex gap-[10px] mt-[10px] ">
                  <span className="mt-[0px]">
                    <input type="checkbox" />
                  </span>
                  <p className="text-[14px] font-[400] ">
                    Check this box if the coupon grants free shipping. A free
                    shipping method must be enabled in your shipping zone and
                    be set to require “a valid free shipping coupon” (see the
                    “Free Shipping Requires” Settings.{" "}
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
        )}
        {checked == 2 &&
          <section className="grid grid-cols-2 gap-[40px]">
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
          </section>}
        {checked == 3 &&
          <section className="grid grid-cols-2 gap-[40px] " >
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
        }
      </main>
    </CardAdmin>
    <div className="flex justify-end" >
      <Button> Save Changes </Button>
    </div>
  </>
};

export default allcoupon;
