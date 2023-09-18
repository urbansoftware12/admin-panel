import React from "react";
import Profile from ".";
import CardAdmin from "@/components/cards/cardadmin";
import useSession from "@/hooks/useSession";
import { InputText } from "@/components/InputText";
import { InputSelect } from "@/components/InputSelect";
import { useFormik } from "formik";
import { myProfileSchema } from "@/mock/yupSchemas";

export default function MyProfile() {
    const { user } = useSession()

    const initialValues = {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        gender: user.gender,
        phone_prefix: user.phone_prefix,
        phone_number: user.phone_number,
        role: user.role,
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
                <CardAdmin classes="w-full px-[30px] py-14 rounded-[25px]" round="rouded-[25px]">
                    <h2 className=" font_futura text-[24px] font-[500] leading-[14px]">Basic Information</h2>

                    <div className="grid grid-cols-2 gap-[20px]" style={{ marginTop: "38px" }}>
                        <div className="flex flex-col gap-[20px]" >
                            <InputText label="First Name"
                                placeholder="First Name"
                                name="firstname"
                                value={values.firstname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.firstname && touched.firstname ?
                                    (errors.firstname) : null
                                } />

                            <InputText
                                label="Username"
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
                        </div>
                        <div className="flex flex-col gap-5" >
                            <InputText label="Last Name"
                                placeholder="Last Name"
                                name="lastname"
                                value={values.lastname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.lastname && touched.lastname ?
                                    (errors.lastname) : null
                                }
                            />
                            <InputSelect value={values.gender} width="w-full capitalize" label="Gender">
                                {["male", "female", "other"].map((gender, index) =>
                                    <option key={index} value={gender}>{gender}</option>
                                )}
                            </InputSelect>
                            <InputText label="Role"
                                placeholder="Role"
                                name="role"
                                value={values.role}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.role && touched.role ?
                                    (errors.role) : null
                                }
                            />
                        </div>
                    </div>

                </CardAdmin>
                <CardAdmin classes="w-full px-[30px] py-14 rounded-[25px] " round="rouded-[25px]">
                    <h2 className=" font_futura text-[24px] font-[500] leading-[14px] ">Contact</h2>

                    <div className="grid grid-cols-2 gap-[20px]" style={{ marginTop: "38px" }}>
                        <div className="flex flex-col gap-[20px]">
                            <InputText
                                label="Phone Prefix"
                                placeholder="Phone Prifix"
                                name="phone_prefix"
                                value={values.phone_prefix}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.phone_prefix && touched.phone_prefix ?
                                    (errors.phone_prefix) : null
                                }
                            />
                            <InputText
                                label="Address Line 1"
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
                        </div>

                        <div className="flex flex-col gap-[20px]">
                            <InputText
                                label="Phone No."
                                placeholder="Phone no."
                                name="phone_number"
                                value={values.phone_number}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.phone_number && touched.phone_number ?
                                    (errors.phone_number) : null
                                }
                            />
                            <InputText
                                label="Address Line 2"
                                postlabel="(Optional)"
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
                                label="Country"
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
                    </div>
                </CardAdmin>
            </div >
        </Profile >
    );
}
