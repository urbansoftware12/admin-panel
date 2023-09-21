import React, { useState, useEffect } from "react";
import CardAdmin from "@/components/cards/cardadmin";
import Image from "next/image";
import Button from "@/components/buttons/simple_btn";
import Loader from "@/components/loaders/loader";
import BounceLoader from "@/components/loaders/bounceLoader";
import { AvatarSIcon } from "@/public/icons/AvatarSIcon";
import { CartLIcon } from "@/public/sidebaricons/CartLIcon";
import { DiamondLIcon } from "@/public/icons/DiamondLIcon";
import { ClockIcon } from "@/public/icons/ClockIcon";
import { InputText } from "@/components/InputText";
import { InputSelect } from "@/components/InputSelect";
import countryCodes from "@/mock/countryCodes";
import { useFormik } from 'formik';
import * as Yup from 'yup'
const ProfilePic = "https://urban-fits.s3.eu-north-1.amazonaws.com/website-copyrights/default-pfp.jpg";
import useSession from "@/hooks/useSession";
import useUser from "@/hooks/useUser";
import timeAgo from "@/utils/timestamp_duration";
import uploadImage from "@/utils/uploadImage";
import axios from "axios";
import mongoose from "mongoose";
import Link from "next/link";
import toaster from "@/utils/toast_function";

export default function UserProfile(props) {
    const { updateUser, getUserNotifications } = useUser()
    const admin = useSession()
    const [userData, setUserData] = useState(props.userData);
    const [userNotifics, setUserNotifics] = useState([]);
    const [checked, setChecked] = useState(1);
    const [loading, setLoading] = useState(false);
    const [notificLoading, setNotificLoading] = useState(false);

    const handlemenueclick = (id) => {
        setChecked(id);
    };

    const validatedSchema = Yup.object({
        image: Yup.object().nullable(0),
        username: Yup.string().min(5, 'Username must be at least 5 characters long').max(24, 'Username cannot exceed 24 characters').matches(/^[A-Za-z0-9_]+$/, 'Username must contain only letters, numbers, and underscores').notOneOf([' ', '-'], 'Username should not contain any spaces or hyphen symbols').required('Username is required'),
        email: Yup.string().email().required('Please enter your email address'),
        firstname: Yup.string().min(2).required("Please enter your First name"),
        lastname: Yup.string().min(2).required("Please enter your Last name"),
        phone_prefix: Yup.string().required('Phone prefix is required to save'),
        phone_number: Yup.string().min(6, 'Phone number can be a minimum of 6 digits').max(14, 'Phone number can be a maximum of 14 digits').required('Phone number is required to save')
    })
    const { values, errors, touched, handleBlur, handleChange, handleReset, handleSubmit, setFieldValue, setValues } = useFormik({
        initialValues: {
            image: userData.image || '',
            firstname: userData.firstname || '',
            lastname: userData.lastname || '',
            username: userData.username || '',
            email: userData.email || '',
            phone_prefix: userData.phone_prefix || 'Select Country Code',
            phone_number: userData.phone_number || ''
        },
        validationSchema: validatedSchema,
        onSubmit: async (values) => {
            console.log(values)
            setLoading(true)
            let imgUrl = null;
            if (values.image && values.image.name) {
                imgUrl = await uploadImage(values.image, userData._id, 'user-profiles/')
            } else delete values.image
            const newUserData = await updateUser(userData._id, { ...values, ...(imgUrl && { image: imgUrl }) })
            setUserData(newUserData)
            setLoading(false)
        }
    })

    const { values: passValues, errors: passErrors, touched: passTouched, handleChange: passHandleChange, handleReset: passHandleReset, handleSubmit: passHandleSubmit } = useFormik({
        initialValues: {
            admin_password: '',
            new_password: '',
            confirm_password: ''
        },
        validationSchema: Yup.object({
            admin_password: Yup.string().min(8).max(30).required('Please enter your password'),
            new_password: Yup.string().min(8).max(30).required('Please enter your password'),
            confirm_password: Yup.string().oneOf([Yup.ref("new_password"), null], "password must match").required("Please enter your password."),
        }),
        onSubmit: async (values) => {
            console.log(values)
            setLoading(true)
            try {
                const { data } = await axios.put(`${process.env.HOST}/api/user/update/password-via-admin`, {
                    ...values,
                    admin_id: admin.user._id,
                    user_id: userData._id
                })
                toaster("success", data.msg)
                passHandleReset()
            } catch (error) {
                console.log(error)
                toaster('error', error.response.data.msg)
            }
            setLoading(false)
        }
    })

    const getNotifics = async () => {
        setNotificLoading(true)
        const notifics = await getUserNotifications(userData._id)
        setUserNotifics(notifics)
        setNotificLoading(false)
    }
    useEffect(() => {
        getNotifics()
    }, [])

    return <>
        {loading ? <Loader /> : null}
        <div className="mt-[15px] ">
            <p className="font_futura not-italic text-[22px]  font-medium text-black capitalize">{userData.firstname || userData.username}&apos;s Profile</p>
            <section className="flex justify-between items-center">
                <div className="flex items-center mt-4 font_futura text-sm gap-x-3">
                    <Link href="/">Home</Link> <i className="fa-solid fa-chevron-right" />
                    <span>Users</span> <i className="fa-solid fa-chevron-right" />
                    <Link href="/user/userlist">Users List</Link> <i className="fa-solid fa-chevron-right" />
                    <span>User Profile</span>
                </div>
            </section>
        </div>

        <CardAdmin classes=" grid grid-cols-6 mt-[20px] ">
            <section className="col-span-2 border-r border-r-slate-200 p-[40px] flex flex-col  font-[400]">
                <div className="flex flex-col items-center">
                    <span className="w-16 aspect-square rounded-xl overflow-hidden ">
                        <Image width={2000} height={2000} className="w-full h-full object-cover object-center" alt="user avatar" src={userData.image || ProfilePic} />
                    </span>
                    <p className="text-sm mt-[20px] ">{userData.firstname || null}&nbsp;{userData.lastname || userData.username}</p>
                    <p className="text-sm">{userData.email}</p>
                </div>

                <p className="text-base mt-[60px] ">Contact Information</p>
                <p className="text-sm mt-[30px] ">Email Address</p>
                <p className="text-xs mt-[5px]  ">{userData.email}</p>

                <p className="text-sm mt-[30px] ">Phone Number</p>
                <p className="text-xs mt-[5px] ">{userData.phone_prefix || null}&nbsp;{userData.phone_number || "N/A"}</p>

                <p className="text-sm mt-[30px] ">Gender</p>
                <p className="text-xs mt-[5px] ">{userData.gender || "N/A"}</p>

                <p className="text-sm mt-[30px] ">User ID</p>
                <button onClick={() => navigator.clipboard.writeText(userData._id)} className="group relative text-xs mt-[5px] text-left">
                    {userData._id.slice(0, 14)}••••••••••&nbsp;&nbsp;<i className="fa-regular fa-copy" />
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 translate-y-7 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 px-2 py-0.5 rounded-lg text-[10px] bg-gray-700 text-white transition-all duration-300">Copy</span>
                </button>
            </section>
            <section className="col-span-4 p-10 !pt-0 overflow-hidden">
                <div className="flex gap-[62px] z-[-1] text-base ">
                    <button className={`w-20 px-4 flex flex-col justify-between items-center`} onClick={() => handlemenueclick(1)}>
                        Profile
                        <span className={`${checked == 1 ? "w-full" : 'w-0'} h-1 mt-3 bg-gold-land transition-all duration-300`} />
                    </button>
                    <button className={`w-20 px-4 flex flex-col justify-between items-center`} onClick={() => handlemenueclick(2)}>
                        Setting
                        <span className={`${checked == 2 ? "w-full" : 'w-0'} h-1 mt-3 bg-gold-land transition-all duration-300`} />
                    </button>
                </div>
                <hr className="h-px border-none bg-gray-200 translate-y-[-1px]" />

                <div className={`w-[200%] flex transition-all duration-700 ${checked == 1 ? null : "-translate-x-1/2"}`}>
                    <section className={`w-1/2 ${checked == 2 ? "opacity-0" : ''} transition-all duration-500`}>
                        <div className="mt-10 grid grid-cols-3 gap-10">
                            <CardAdmin classes="px-5 py-[25px] ">
                                <div className="flex gap-5">
                                    <div className="w-[50px] h-[50px] flex justify-center items-center bg-gold rounded-[10px]">
                                        <AvatarSIcon />
                                    </div>
                                    <div className="flex flex-col justify-between">
                                        <p className="text-[22px]">{userData.uf_points}</p>
                                        <p className="text-sm">UF-points</p>
                                    </div>
                                </div>
                            </CardAdmin>
                            <CardAdmin classes="px-5 py-[25px] ">
                                <div className="flex gap-5">
                                    <div className="w-[50px] h-[50px] flex justify-center items-center bg-gold rounded-[10px]">
                                        <CartLIcon />
                                    </div>
                                    <div className="flex flex-col justify-between">
                                        <p className="text-[22px]">{userData.purchases}</p>
                                        <p className="text-sm">Bought</p>
                                    </div>
                                </div>
                            </CardAdmin>
                            <CardAdmin classes="px-5 py-[25px] ">
                                <div className="flex gap-5">
                                    <div className="w-[50px] h-[50px] flex justify-center items-center bg-gold rounded-[10px]">
                                        <DiamondLIcon />
                                    </div>
                                    <div className="flex flex-col  justify-between">
                                        <p className="text-[22px]">{0}</p>
                                        <p className="text-sm">Vouchers</p>
                                    </div>
                                </div>
                            </CardAdmin>
                        </div>

                        <CardAdmin classes=" p-[30px] mt-[40px] ">
                            <div className="flex justify-between items-center">
                                <h3 className="text-[22px]">Latest Notifications</h3>
                                <button className={`fa-solid fa-arrows-rotate ${notificLoading ? "fa-spin" : null}`} type="button" onClick={getNotifics}></button>
                            </div>

                            <hr className="mt-10" />

                            <div className="flex flex-col gap-y-7 mt-10 transition-all duration-300">
                                {notificLoading ? <div className="flex justify-center"><BounceLoader /></div> : null}
                                {!userNotifics ? <div className="w-full text-center h-40">No notifications to show :/</div> :
                                    userNotifics.map((notific, i) => (
                                        <div key={i} className="w-full flex gap-x-4 items-center">
                                            <div className="w-[50px] h-[50px] flex justify-center items-center bg-gold rounded-[10px] ">
                                                <CartLIcon />
                                            </div>

                                            <div className="flex-1 flex flex-col">
                                                <div className="mb-2 flex justify-between">
                                                    <h3 className="text-base">{notific.heading}</h3>
                                                    <div className="text-[10px] flex items-center gap-1">
                                                        <i className="fa-regular fa-clock" /> <p>{timeAgo(notific.timestamp)}</p>
                                                    </div>
                                                </div>
                                                <p className="text-sm">{notific.message}</p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </CardAdmin>
                    </section>
                    <CardAdmin classes={`w-1/2 p-[30px] mt-10 ${checked == 1 ? "opacity-0" : ''} transition-all duration-500`}>
                        <section className="grid grid-cols-1 gap-5">
                            <form className="grid grid-cols-1 gap-5" onSubmit={handleSubmit} onReset={handleReset}>
                                <div className="w-full flex gap-5 items-center">
                                    <p>User Image</p>
                                    <div className={`w-4/5 relative flex`}>
                                        <span className="w-3/4 max-w-[75%] pl-[10px] truncate py-2 rounded-lg rounded-r-none border border-r-0 border-gray-300 transition outline-none">{values?.image?.name || userData.image}</span>
                                        <input type="file" id='pfp' name='image' accept="image/*" onChange={(e) => setFieldValue("image", e.target.files[0])} className="opacity-0 w-0 h-0 appearance-none" />
                                        <label htmlFor="pfp" className="w-1/4 py-2 text-sm text-white cursor-pointer rounded-r-lg flex justify-center items-center bg-gold-land">Browse</label>
                                        <p className='absolute text-red-400 bottom-[-19px] left-[10px] text-[11px]'></p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-[100px]">
                                    <InputText label="First Name" placeholder="First Name" name="firstname" value={values.firstname} onChange={handleChange} onBlur={handleBlur} error={errors.firstname && touched.firstname ? (errors.firstname) : null} />
                                    <InputText label="Last Name" placeholder="Last Name" name="lastname" value={values.lastname} onChange={handleChange} onBlur={handleBlur} error={errors.lastname && touched.lastname ? (errors.lastname) : null} />
                                </div>

                                <div className="grid grid-cols-1">
                                    <InputText label="User Name" placeholder="Last Name" name="username" value={values.username} onChange={handleChange} onBlur={handleBlur} error={errors.username && touched.username ? (errors.username) : null} />
                                    <p className="mt-2 font_futura_light text-sm">Username must be unique with no spaces.</p>
                                </div>
                                <InputText label="Email" placeholder="example@domain.com" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} error={errors.email && touched.email ? errors.email : null} />
                                <div className="grid grid-cols-2 gap-[100px]  ">
                                    <InputSelect defaultValue="Select country code" value={values.phone_prefix} onChange={handleChange} name="phone_prefix" label="Phone Prefix" error={errors.phone_prefix && touched.phone_prefix ? errors.phone_prefix : null}>
                                        {countryCodes.map((item) => {
                                            if (!item.code) return <option disabled>{item.name}</option>
                                            return <option value={item.code}>{item.name} {item.code}</option>
                                        })}
                                    </InputSelect>
                                    <InputText label="Phone Number" placeholder="Phone Number" name="phone_number" value={values.phone_number} onChange={handleChange} onBlur={handleBlur} error={errors.phone_number && touched.phone_number ? errors.phone_number : null} />
                                </div><div className="w-full flex justify-end gap-2">
                                    <Button type="reset" bg="bg-gray-100" text="black" classes="w-full md:w-1/4" font='font_urbanist_medium'>Cancel</Button>
                                    <Button type="submit" classes="w-full md:w-1/4" font='font_urbanist_medium'>Save</Button>
                                </div>
                            </form>

                            <div className="w-full mt-4 flex justify-between items-center font_urbanist text-sm">
                                <span className="w-1/3 h-px bg-gray-400"></span>
                                Change Password
                                <span className="w-1/3 h-px bg-gray-400"></span>
                            </div>
                            {userData.register_provider === "urbanfits" ? <form className="grid grid-cols-1 gap-5" onSubmit={passHandleSubmit} onReset={passHandleReset}>
                                <InputText autoComplete='off' onChange={passHandleChange} value={passValues.admin_password} name="admin_password" label="Admin (Your) Password" placeholder="Enter your password" error={passErrors.admin_password && passTouched.admin_password ? passErrors.admin_password : null} />
                                <InputText autoComplete='off' onChange={passHandleChange} value={passValues.new_password} name="new_password" label="New User Password" placeholder="New user password" error={passErrors.new_password && passTouched.new_password ? passErrors.new_password : null} />
                                <InputText autoComplete='off' onChange={passHandleChange} value={passValues.confirm_password} name="confirm_password" label="Confirm User Password" placeholder="Confirm user password" error={passErrors.confirm_password && passTouched.confirm_password ? passErrors.confirm_password : null} />
                                <Button type="submit" font='font_urbanist_medium'>Update User Password</Button>
                            </form> : <span className="text-sm text-gray-500">This user's account is associated with Google registration provider, you cannot change the password of such users who signed up with google as they don't need password to login.</span>}
                        </section>
                    </CardAdmin>
                </div>
            </section>
        </CardAdmin>
    </>
};
export async function getServerSideProps(context) {
    const { admin_id, user_to_get } = await context.query
    if (!admin_id || !user_to_get || !mongoose.Types.ObjectId.isValid(admin_id) || !mongoose.Types.ObjectId.isValid(user_to_get)) return {
        redirect: {
            destination: '/404',
            permanent: false,
        },
    };
    try {
        const { data } = await axios.get(`${process.env.HOST}/api/user/get/byid?user_to_get=${user_to_get}&admin_id=${admin_id}`)
        return { props: { userData: data.user } }
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