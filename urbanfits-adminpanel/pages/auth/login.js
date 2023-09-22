import React, { useState, useRef } from 'react'
import AuthPage from '.'
import Link from 'next/link'
import Button from '@/components/buttons/simple_btn'
import Head from 'next/head'
import Tooltip from '@/components/tooltips/tooltip'
import toaster from '@/utils/toast_function'
import AlertPage from '@/components/alertPage'
import axios from 'axios'
import { useRouter } from 'next/router'
import useSession from '@/hooks/useSession'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import jwt from 'jsonwebtoken';

export const metadata = {
    title: "Urban Fits - Login"
}
export default function Login() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const { user, updateUser } = useSession()
    const [showPass, setShowPass] = useState(false)

    const passRef = useRef()

    const onsubmit = async (values, x, oAuthQuery) => {
        try {
            setLoading(true)
            const { data } = await axios.post(`${process.env.HOST}/api/admin/login${oAuthQuery ? oAuthQuery : ''}`, values)
            if (data.redirect_url && !data.payload) router.push(data.redirect_url)
            else if (data.payload) {
                await updateUser(data.payload, true)
                const userData = jwt.decode(data.payload)?._doc
                if (userData.role === "administrator") {
                    router.push('/')
                    toaster("success", data.msg)
                } else return setLoading(false)
            }
            else {
                const { data } = res.response
                toaster("error", data.msg)
            }
        }
        catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        setLoading(false)
    }

    const loginSchema = Yup.object({
        email: Yup.mixed().test('valid', 'Invalid email or username', function (value) {
            const { path, createError } = this;
            if (Yup.string().required('Email or Username is required').email().isValidSync(value)) return true;
            if (Yup.string().required('Email or Username is required').min(5, 'Username must be atleast 5 characters').matches(/^[a-zA-Z0-9_]+$/, 'Invalid username').isValidSync(value)) return true;
            return createError({ path, message: 'Invalid Email or Username' });
        }),
        password: Yup.string().min(8).max(30).required('Please enter your password'),
        remember_me: Yup.boolean()
    })
    const initialSignupValues = { email: '', password: '', remember_me: false, register_provider: 'urbanfits' }
    const { values, errors, touched, handleBlur, handleChange, handleReset, handleSubmit } = useFormik({
        initialValues: initialSignupValues,
        validationSchema: loginSchema,
        onSubmit: onsubmit
    })

    const sessionValidity = (e) => {
        const checked = e.target.checked
        localStorage.setItem('remember_me', checked)
    }

    if (user && user.email) return <AlertPage type="success" heading="You are signed in!" />
    return <>
        <Head><title>Urban Fits - Login</title></Head>
        <AuthPage loading={loading} mblNav="/auth/signup" mblNavName="Register">
            <form className="w-full h-full lg:h-auto bg-white p-2 lg:p-0 font_futura text-base flex flex-col justify-between md:justify-around lg:block" onReset={handleReset} onSubmit={handleSubmit} >
                <section className="w-full mb-6 md:mb-0">
                    <h1 className="lg:hidden text-[22px] mb-5 text-left font_futura">Login</h1>
                    <div className={`relative data_field lex items-center border-b ${touched.new_email && errors.new_email ? "border-red-500" : "focus:border-yellow-700 hover:border-yellow-600"} transition py-2 mb-4`}>
                        {touched.email && errors.email ? <Tooltip classes="form-error" content={errors.email} /> : null}
                        <input className="w-full outline-none border-none" name="email" id="email" value={values.email} onBlur={handleBlur} onChange={handleChange} placeholder='Username or Email' />
                    </div>
                    <div className={`relative data_field flex items-center border-b ${touched.new_email && errors.new_email ? "border-red-500" : "focus:border-yellow-700 hover:border-yellow-600"} transition py-2 mb-4`}>
                        {touched.password && errors.password ? <Tooltip classes="form-error" content={errors.password} /> : null}
                        <input ref={passRef} className={`w-full outline-none border-none ${values.password ? "tracking-2" : null}`} type={showPass ? "text" : "password"} id="password" value={values.password} onBlur={handleBlur} onChange={handleChange} placeholder='Password' />
                        <i onClick={() => {
                            passRef.current.focus();
                            return setShowPass(!showPass);
                        }} className={`fa-regular ${showPass ? "fa-eye-slash" : "fa-eye"} text-black font-bold cursor-pointer select-none`} />
                    </div>
                    <div className="my-3 text-gray-400 text-xs md:text-sm text-left">
                        Password must be at least 8 characters and can’t be easy to guess - commonly used or risky passwords are not premitted.
                    </div>
                </section>

                <section>
                    <div className="relative w-full mb-2 flex items-center">
                        {touched.accept_policies && errors.accept_policies ? <Tooltip classes="form-error" content={errors.accept_policies} /> : null}
                        <div className="w-full flex justify-between items-center text-gray-400 text-sm">
                            <div className='flex items-center gap-x-2'>
                                <span>
                                    <input className='rounded' type="checkbox" id="accept_policies" name="accept_policies" value={values.accept_policies} onChange={(e) => { handleChange(e); sessionValidity(e) }} />
                                </span>
                                <label htmlFor='accept_policies' className="w-full -translate-y-0.5 cursor-pointer text-gray-400">Remember me</label>
                            </div>
                            <Link href="/auth/resetpassword">Forgot Password?</Link>
                        </div>
                    </div>
                    <Button loading={loading} my="my-4" classes='w-full' type="submit">Login</Button>
                </section>
            </form>
        </AuthPage>
    </>
}