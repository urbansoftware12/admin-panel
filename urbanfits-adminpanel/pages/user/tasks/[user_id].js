import React from 'react';
import Link from "next/link";
import CardAdmin from '@/components/cards/cardadmin';
import mongoose from "mongoose";
import axios from "axios";

export default function UserUfTasks({ userTasks }) {
    console.log("YOO here is the user tasks doc: ", userTasks)

    return <>
        <div className="mt-[15px]">
            <p className="font_futura not-italic text-[22px]  font-medium text-black">{userTasks.user_id.firstname || userTasks.user_id.username}'s Tasks</p>
            <section className="flex justify-between items-center">
                <div className="flex items-center mt-4 font_futura text-sm gap-x-3">
                    <Link href="/">Home</Link> <i className="fa-solid fa-chevron-right" />
                    <span>Users</span> <i className="fa-solid fa-chevron-right" />
                    <Link href="/user/tasks">Users Tasks</Link> <i className="fa-solid fa-chevron-right" />
                    <span>{userTasks.user_id.firstname || userTasks.user_id.username}'s Tasks</span>
                </div>
            </section>
        </div>

        <CardAdmin classes="mt-5 p-5 py-40">
            <span className="mx-auto">
                Under Devlopment
            </span>
        </CardAdmin>
    </>
}
export async function getServerSideProps(context) {
    const { user_id } = await context.query
    if (!mongoose.Types.ObjectId.isValid(user_id)) return {
        redirect: {
            destination: '/403',
            permanent: false,
        }
    };
    try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/tasks/get/user-tasks?user_id=${user_id}`)
        return { props: { userTasks: data.tasks } }
    }
    catch (error) {
        console.error(error);
        return {
            redirect: {
                destination: '/404',
                permanent: false,
            }
        };
    }
}