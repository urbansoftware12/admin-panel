import React, { useState } from 'react';
import Link from "next/link";
import LinkBtn from '@/components/buttons/link_btn';
import Image from "next/image";
import useUser from '@/hooks/useUser';
import useSession from '@/hooks/useSession';
import mongoose from "mongoose";
import axios from "axios";

const TaskItem = ({ task, userId, setUserTasks }) => {
    const { approveTask } = useUser()
    const [image, setImage] = useState(false);
    const status = {
        bg: task.completed ? "#22c55e" : (task.image_submitted && !task.completed ? "#f97316" : "#94a3b8"),
        text: task.completed ? "completed" : (task.image_submitted && !task.completed ? "need approval" : "pending")
    }
    return <div key={task.name} style={{opacity: task.completed? 0.6: 1}} className='w-full px-4 py-2 border rounded-lg flex flex-col'>
        <div className="mb-2 flex justify-between">
            <h3 className="text-base font-semibold">{task.title}</h3>
            <span style={{ background: status.bg }} className="px-3 py-0.5 rounded-xl text-xs leading-normal text-white">{status.text}</span>
        </div>
        <p className="text-sm">{task.description}</p>
        <div className="flex justify-between text-sm">
            <span className="font-semibold">Reward:</span>
            {task.reward || "System Generated"}
        </div>
        {task.image_submitted && !task.completed ? <div className="relative mt-2 flex justify-between text-sm">
            <div className={`fixed z-50 inset-0 bg-black/50 ${!image && "opacity-0 pointer-events-none"} w-full h-full py-6 flex justify-center items-center transition-all duration-500`}>
                <button onClick={() => setImage(false)} className="absolute top-5 right-8 text-white text-3xl fa-solid fa-xmark"></button>
                <div className={`w-3/5 ${!image && "scale-0"} transition-all duration-500`}>
                    <Image width={680} height={750} className='w-full object-contain rounded-xl' src={process.env.NEXT_PUBLIC_BASE_IMG_URL + task.image} alt={task.name} />
                </div>
            </div>
            <button onClick={() => setImage(true)} className="px-3 py-1 border rounded-3xl text-slate-700"><i className="fa-solid fa-play" />&nbsp; View Image</button>
            <button onClick={() => approveTask({ task_name: task.name, user_id: userId }, (data) => setUserTasks(data.tasks.tasks))} className="bg-gold-land px-3 py-1 text-white rounded-3xl"><i className="fa-solid fa-user-check" />&nbsp; Approve</button>
        </div> : null}
    </div>
}

export default function UserUfTasks({ tasksDoc }) {
    const [userTasks, setUserTasks] = useState(tasksDoc)
    return <>
        <div className="w-full mt-[15px] flex justify-between items-center">
            <nav>
                <p className="font_futura not-italic text-[22px]  font-medium text-black">{userTasks.user_id.firstname || userTasks.user_id.username}'s Tasks</p>
                <section className="flex justify-between items-center">
                    <div className="flex items-center mt-4 font_futura text-sm gap-x-3">
                        <Link href="/">Home</Link> <i className="fa-solid fa-chevron-right" />
                        <span>Users</span> <i className="fa-solid fa-chevron-right" />
                        <Link href="/user/tasks">Users Tasks</Link> <i className="fa-solid fa-chevron-right" />
                        <span>{userTasks.user_id.firstname || userTasks.user_id.username}'s Tasks</span>
                    </div>
                </section>
            </nav>
            <LinkBtn href={`/user/${tasksDoc.user_id._id}?auth_token=${useSession.getState().authToken}`}>View {tasksDoc.user_id.username}'s Profile</LinkBtn>
        </div>

        <section className="bg-white equillibrium_shadow mt-5 px-5 py-8 rounded-3xl grid grid-cols-2 gap-6">
            {userTasks.tasks.map(task => <TaskItem task={task} userId={userTasks.user_id._id} setUserTasks={setUserTasks} />)}
        </section>
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
        return { props: { tasksDoc: data.tasks } }
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