import React from "react";
import Profile from ".";
import CardAdmin from "@/components/cards/cardadmin";
import { InputText } from "@/components/InputText";
import { InputSelect } from "@/components/InputSelect";
import { useFormik } from "formik";
import { myProfileSchema } from "@/mock/yupSchemas";

export default function MyProfile() {

    const initialValues = {
        name: "",
        username: "",
        email: "",
        description: "",
        phone: "",
        mobileno: "",
        addressline1: "",
        addressline2: "",
        city: "",
        state: "",
        country: "",
    }
    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: myProfileSchema
    })

    return (
        <Profile>
            <div className="w-[100%] flex gap-x-[20px] font_futura">
                <CardAdmin
                    classes="w-[100%] p-[30px] rounded-[25px]"
                    round="rouded-[25px]">
                    <p className=" font_futura text-[24px] font-[500] leading-[14px]">
                        Basic Information
                    </p>

                    <div className="grid grid-cols-2 gap-[20px]" style={{ marginTop: "38px" }}>
                        <div className="flex flex-col gap-[20px]" >
                            <InputText label="Name"
                                placeholder="Name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.name && touched.name ?
                                    (errors.name) : null
                                }
                            />

                            <InputText
                                label="User Name"
                                placeholder="username"
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.username && touched.username ?
                                    (errors.username) : null
                                }
                            />
                            <InputText label="Email "
                                placeholder="email"
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.email && touched.email ?
                                    (errors.email) : null
                                } />
                            <h3 className="text-sm" >Date of Birth</h3>
                            <div className="grid grid-cols-3 gap-3">
                                <InputSelect>
                                    {["20", "19"].map((role, index) =>
                                        <option key={index} value={role}>{role}</option>
                                    )}
                                </InputSelect>
                                <InputSelect>
                                    {["Jan", "Other"].map((role, index) =>
                                        <option key={index} value={role}>{role}</option>
                                    )}
                                </InputSelect>
                                <InputSelect>
                                    {["1998", "Other"].map((role, index) =>
                                        <option key={index} value={role}>{role}</option>
                                    )}
                                </InputSelect>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5" >
                            <InputSelect label="Role">
                                {["Staff", "Other"].map((role, index) =>
                                    <option key={index} value={role}>{role}</option>
                                )}
                            </InputSelect>
                            <InputSelect label="Status">
                                {["Active", "Other"].map((role, index) =>
                                    <option key={index} value={role}>{role}</option>
                                )}
                            </InputSelect>
                            <InputSelect label="Department">
                                {["Development", "Other"].map((role, index) =>
                                    <option key={index} value={role}>{role}</option>
                                )}
                            </InputSelect>
                        </div>
                    </div>




                    <div style={{ marginTop: "20px" }}>
                        <p className="font_futura text-sm ">Gender</p>
                        <div className="flex gap-[28px] " style={{ marginTop: "20px" }}>
                            <div className="flex items-center">
                                <input className="" type="checkbox" name="" id="" />
                                <label className=" ml-[15px] text-[14px] font_futura ">
                                    Male{" "}
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input className="" type="checkbox" name="" id="" />
                                <label className=" ml-[15px] text-[14px] font_futura ">
                                    Female{" "}
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input className="" type="checkbox" name="" id="" />
                                <label className=" ml-[15px] text-[14px] font_futura ">
                                    Other
                                </label>
                            </div>
                        </div>
                    </div>
                </CardAdmin>
                {/*  second card right start   */}
                <CardAdmin
                    classes=" w-[100%]  p-[30px] rounded-[25px] "
                    round="rouded-[25px]"
                >
                    <p className=" font_futura text-[24px] font-[500] leading-[14px] ">
                        Contact
                    </p>

                    <div
                        className="grid  grid-cols-2 gap-[20px] "
                        style={{ marginTop: "38px" }}
                    >
                        <div className="flex flex-col gap-[20px]">
                            <InputText
                                label="Phone"
                                // width="100%"
                                placeholder="phone"
                                name="phone"
                                value={values.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.phone && touched.phone ?
                                    (errors.phone) : null
                                }
                            />
                            <InputText
                                label="Address Line 1"
                                // width=""
                                placeholder="Address"
                                name="addressline1"
                                value={values.addressline1}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.addressline1 && touched.addressline1 ?
                                    (errors.addressline1) : null
                                }
                            />
                            <InputText
                                label="City "
                                // width=""
                                placeholder="City"
                                name="city"
                                value={values.city}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.city && touched.city ?
                                    (errors.city) : null
                                }
                            />
                            <InputText
                                label="Country"
                                // width=""
                                placeholder="&nbsp;"
                                name="country"
                                value={values.country}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.country && touched.country ?
                                    (errors.country) : null
                                }
                            />
                        </div>

                        <div className="flex flex-col gap-[20px]">
                            <InputText
                                label="Mobile No."
                                // width=""
                                placeholder="Mobile no."
                                name="mobileno"
                                value={values.mobileno}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.mobileno && touched.mobileno ?
                                    (errors.mobileno) : null
                                }
                            />
                            <InputText
                                label="Address Line 2"
                                postlabel="(Optional)"
                                // width=""
                                placeholder="Address"
                                name="addressline2"
                                value={values.addressline2}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.addressline2 && touched.addressline2 ?
                                    (errors.addressline2) : null
                                }
                            />
                            <InputText
                                label="State "
                                // width=""
                                placeholder="Name"
                                name="state"
                                value={values.state}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.state && touched.state ?
                                    (errors.state) : null
                                }
                            />
                        </div>
                    </div>
                </CardAdmin>
            </div >
        </Profile >
    );
}
