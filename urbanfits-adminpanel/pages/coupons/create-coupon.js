import React, { useState } from "react";
import CardAdmin from "@/components/cards/cardadmin";
import { InputText } from "@/components/InputText";
import Link from "next/link";
import InputTextArea from "@/components/InputTextArea";
import Button from "@/components/buttons/simple_btn";
import QuestionIcon from "@/public/icons/QuestionIcon";
import useProduct from "@/hooks/useProduct";
import { InputSelect } from "@/components/InputSelect";
import { CouponProductItem } from "@/components/coupon_comps";


import { useFormik } from "formik";
import { couponSchema } from '@/mock/yupSchemas'
import toaster from '@/utils/toast_function'
import mongoose from "mongoose";

export default function CreateCoupon() {
    const { getOneProduct, productLoading } = useProduct()
    const [checked, setChecked] = useState(1);
    const handleSectionPosition = (checked) => {
        if (checked == 1) return "translate-x-0"
        else if (checked == 2) return "-translate-x-1/3"
        else return "-translate-x-[66.66%]"
    }

    const { values, touched, errors, handleChange, handleBlur, handleReset, handleSubmit, setFieldValue, setFieldError } = useFormik({
        initialValues: {
            coupon_code: '',
            description: '',
            coupon_value: 0,
            coupon_config: {
                minimum_spend: null,
                maximum_spend: null,
                free_shipping: false,
                conjunction_use: false,
                exclude_sales: false,
                allowed_products: [''],
                exclude_products: [''],
                allowed_categories: [''],
                exclude_categories: [''],
            },
            expiration_date: '',
        },
        validationSchema: couponSchema,
        onSubmit: async (values) => {
            console.log(values)
        }
    })
    console.log(values, errors)

    const handleRemoveArrayItem = (index, pathname) => {
        const newArray = [...eval(`values.${pathname}`)];
        newArray.splice(index, 1);
        setFieldValue(pathname, newArray);
    };

    const getCorrspondingProduct = async (e, setState) => {
        handleChange(e)
        if (!mongoose.Types.ObjectId.isValid(e.target.value)) return setFieldError(e.target.name, "Invalid product id.");
        else await getOneProduct(e.target.value, (product) => setState(product))
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

        <form onSubmit={handleSubmit} onReset={handleReset}>
            <CardAdmin classes="p-10 mt-[30px]">
                <div className="flex flex-col gap-[20px] ">
                    <p className="text-[22px] font-[500] ">Add New Coupon</p>
                    <InputText name="coupon_code" value={values.coupon_code} onChange={handleChange} onBlur={handleBlur} error={errors.coupon_code && touched.coupon_code ? errors.coupon_code : null} h="h-[56px]" placeholder="Coupon Code (Case Sensitive)" />

                    <InputTextArea
                        mt="mt-[0px]"
                        placeholder="Description (optional)"
                        h="h-[96px]"
                        width="w-[100%]"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.description && touched.description ?
                            (errors.description) : null
                        }
                    />
                </div>
            </CardAdmin>
            <CardAdmin classes={`${values.coupon_code?.length < 5 ? "-max-h-0 opacity--0" : "-max-h-screen"} p-10 mt-[30px] overflow-clip transition-all duration-700`}>
                <h1 className="text-xl">Coupon Configuration</h1>
                <div className="text-sm flex gap-[30px]">
                    <button type="button" className={checked == 1 && "gradient_txt_2"} onClick={() => setChecked(1)}>General</button>
                    <button type="button" className={checked == 2 && "gradient_txt_2"} onClick={() => setChecked(2)}>Usage Restriction</button>
                    <button type="button" className={checked == 3 && "gradient_txt_2"} onClick={() => setChecked(3)}>Usage limits</button>
                </div>

                <main className={`w-[300%] flex ${handleSectionPosition(checked)} transition-all duration-300`}>
                    <section className={`w-1/3 h-[15rem] ${checked !== 1 && "opacity-0"} grid grid-cols-2 place-content-center items-center gap-10 transition-all duration-300`}>
                        <InputText
                            label="Coupon Amount"
                            placeholder="0"
                            type="number" name="description"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.description && touched.description ?
                                (errors.description) : null
                            }
                        />
                        <InputText
                            label="Coupon expire date"
                            type="date"
                            placeholder="YYYY-MM-DD" name="description"
                            value={values.expiration_date}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.expiration_date && touched.expiration_date ? errors.expiration_date : null}
                        />
                        <nav className="flex gap-[10px] mt-[10px] ">
                            <input id="free_shipping" type="checkbox" />
                            <label htmlFor="free_shipping" className="text-sm cursor-pointer">Allow Free Shipping</label>
                        </nav>
                    </section>
                    <section className={`w-1/3 ${checked !== 2 && "opacity-0"} grid grid-cols-2 gap-10 transition-all duration-300`}>
                        <InputText
                            label="Minimum spend"
                            placeholder="No minimum"
                            type="number"
                            name="coupon_config.minimum_spend"
                            value={values.coupon_config?.minimum_spend}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors?.coupon_config?.minimum_spend && touched?.coupon_config?.minimum_spend ? errors?.coupon_config?.minimum_spend : null}
                        />
                        <InputText
                            label="Maximum spend"
                            postlabel={<QuestionIcon />}
                            placeholder="No maximum"
                            type="number"
                            name="coupon_config.maximum_spend"
                            value={values.coupon_config?.maximum_spend}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors?.coupon_config?.maximum_spend && touched?.coupon_config?.maximum_spend ? errors?.coupon_config?.maximum_spend : null}
                        />
                        <div className="" >
                            <p className="flex items-center text-[14px] font-[500] gap-[30px]">Individual use only</p>
                            <div className="flex items-center gap-[10px] text-sm mt-[21px]">
                                <input id="conjunction_use" name="coupon_config.conjunction_use" value={values.coupon_config?.conjunction_use} onChange={handleChange} onBlur={handleBlur} error={errors?.coupon_config?.conjunction_use && touched?.coupon_config?.conjunction_use ? errors?.coupon_config?.conjunction_use : null} type="checkbox" />
                                <label htmlFor="conjunction_use" className="cursor-pointer">Check this box if the coupon cannot be used in conjunction with other. </label>
                            </div>
                        </div>
                        <div className="" >
                            <p className="flex items-center text-[14px] font-[500] gap-[30px] " > <p> Exclude sale items</p> <QuestionIcon /> </p>
                            <div className="flex items-center gap-[10px] text-sm mt-[21px] " >
                                <input id="exclude_sales" name="coupon_config.exclude_sales" value={values.coupon_config?.exclude_sales} onChange={handleChange} onBlur={handleBlur} error={errors?.coupon_config?.exclude_sales && touched?.coupon_config?.exclude_sales ? errors?.coupon_config?.exclude_sales : null} type="checkbox" />
                                <label htmlFor="exclude_sales" className="cursor-pointer">Check this box if the coupon should not apply to items on sales. &nbsp; &nbsp; &nbsp; </label>
                            </div>
                        </div>

                        <section className="col-span-full w-full px-6 py-4 border rounded-lg">
                            <h3 className="text-2xl mb-4">Allowed Products</h3>
                            {values.coupon_config?.allowed_products?.map((p_id, index) => <CouponProductItem nameExtension="allowed_products" values={values} errors={errors} index={index} handleBlur={handleBlur} handleRemoveArrayItem={handleRemoveArrayItem} getCorrspondingProduct={getCorrspondingProduct} productLoading={productLoading} />)}
                            <button type="button" className='group text-xs text-white bg-slate-400 px-2 py-1 rounded-md my-4 transition-all duration-300' onClick={() => setFieldValue('coupon_config.allowed_products', [...values.coupon_config.allowed_products, ''])}><i className="fa-solid fa-plus text-white group-hover:rotate-90 group-hover:mr-1 transition-all duration-300" />&nbsp;add another one</button>
                        </section>

                        <section className="col-span-full w-full px-6 py-4 border rounded-lg">
                            <h3 className="text-2xl mb-4">Exclude Products</h3>
                            {values.coupon_config?.exclude_products?.map((p_id, index) => <CouponProductItem nameExtension="exclude_products" values={values} errors={errors} index={index} handleBlur={handleBlur} handleRemoveArrayItem={handleRemoveArrayItem} getCorrspondingProduct={getCorrspondingProduct} productLoading={productLoading} />)}
                            <button type="button" className='group text-xs text-white bg-slate-400 px-2 py-1 rounded-md my-4 transition-all duration-300' onClick={() => setFieldValue('coupon_config.exclude_products', [...values.coupon_config.exclude_products, ''])}><i className="fa-solid fa-plus text-white group-hover:rotate-90 group-hover:mr-1 transition-all duration-300" />&nbsp;add another one</button>
                        </section>

                        <div className="col-span-full w-full">
                            <InputText
                                label="Allowed Categories"
                                placeholder="Any categories"
                            />
                        </div>
                        <div className="col-span-full w-full">
                            <InputText
                                label="Exclude categories"
                                postlabel={<QuestionIcon />}
                                placeholder="No categories"
                            />
                        </div>
                        <div className="col-span-full w-full">
                            <InputText
                                label="Allowed emails"
                                placeholder="No restriction"
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
                <Button type="submit"> Save Changes </Button>
            </div>
        </form>
    </>
};