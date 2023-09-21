import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Link from "next/link";
import CardAdmin from "@/components/cards/cardadmin";
import Spinner from "@/components/loaders/spinner";
import Button from "@/components/buttons/simple_btn";
import { SearchIcon } from "@/public/sidebaricons/SearchIcon";
import useSession from "@/hooks/useSession";
import useUser from "@/hooks/useUser";
import { userListTableColumns } from "@/mock/tablesdata";
import toaster from "@/utils/toast_function";

const Userlist = () => {
    const session = useSession()
    const { users, getUsers, totalUsers, totalOnline, usersLoading } = useUser()
    const [query, setQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        if (!users.length) getUsers()
    }, [])

    const filteredUsers = users.filter((user) => {
        if (query !== '') {
            const { _id, firstname, email } = user
            return (firstname && firstname.toLowerCase().includes(query.toLowerCase())) || _id.includes(query) || email.toLowerCase().includes(query.toLowerCase())
        }
        else return true
    });

    return <>
        <div className="flex mt-[15px] justify-between items-center ">
            <div>
                <h2 className="font_futura text-[22px]">User List</h2>
                <div className="flex items-center mt-4 font_futura text-sm gap-x-3">
                    <Link href="/admin">Home</Link> <i className="fa-solid fa-chevron-right" />
                    <span >Users</span> <i className="fa-solid fa-chevron-right" />
                    <span>Product List</span>
                </div>
            </div>
            <Button my="my-[0px]">Add User</Button>
        </div>

        <CardAdmin classes="px-10 py-[42px] mt-5 ">
            <div className="flex justify-between">
                <div className="w-full flex items-center justify-between">
                    <section className="flex items-center gap-4">
                        <div className='flex flex-col'>
                            <select name="category" className="w-48 h-10 px-3 border rounded-full outline-none bg-gray-50 text-black cursor-pointer" placeholder="Category">
                                {/* {[{ _id: false, path: "All Products" }, ...categories]?.map((category) => ({ value: category._id, name: category.path }))
                                .map((obj, index) => ( */}
                                <option key={1}>All users</option>
                                {/* ))} */}
                            </select>
                        </div>
                        <div className='w-64 h-10 py-2 px-5 gap-2 flex items-center bg-gray-50 border border-gray-300 rounded-full' >
                            <SearchIcon />
                            <input
                                type="text"
                                id="search"
                                value={query}
                                onChange={(e) => { setQuery(e.target.value) }}
                                className="w-full h-4 flex items-center text-sm font_futuralt bg-transparent outline-none"
                                placeholder="Search (ID or Name)..."
                            />
                        </div>
                        <div className="h-10 p-[0.8px] text-sm bg-gold-land flex justify-center items-center rounded-full">
                            <span className="w-full h-full px-5 flex justify-center items-center bg-white rounded-full">
                                Total Online:&nbsp;{totalOnline}
                            </span>
                        </div>
                    </section>
                    <Button my="my-0" disabled={usersLoading} fontSize="text-sm" onClick={() => getUsers(currentPage)}>
                        Refresh&nbsp;&nbsp;
                        <i className={`fa-solid fa-arrows-rotate ${usersLoading ? "fa-spin" : null}`}></i>
                    </Button>
                </div>
            </div>
            <DataTable
                className='scrollbar_x'
                responsive={true}
                customStyles={{
                    tableWrapper: {
                        style: {
                            width: "100%",
                            display: 'block',
                            overflowY: 'visible',
                            paddingBottom: "6rem"
                        }
                    },
                    head: { style: { fontSize: '13px' } },
                    rows: { style: { minHeight: "60px" } }
                }}
                pagination
                paginationServer
                paginationDefaultPage={1}
                paginationTotalRows={totalUsers}
                paginationPerPage={50}
                paginationRowsPerPageOptions={[50]}
                onChangePage={(page) => { getUsers(page); setCurrentPage(page) }}
                progressPending={usersLoading}
                progressComponent={<Spinner forBtn={true} variant="border-black" />}
                highlightOnHover
                sortIcon={<span>&uarr;&darr;</span>}
                columns={userListTableColumns}
                data={filteredUsers?.map(user => {
                    return {
                        id: user._id,
                        avatar: user.image,
                        name: user.firstname || user.username,
                        fullname: user.firstname && user.lastname ? user.firstname + ' ' + user.lastname : user.username,
                        email: user.email,
                        phone: user.phone_prefix ? user.phone_prefix + ' ' + user.phone_number : 'N/A',
                        purchases: user.purchases || 0,
                        status: user.is_active,
                        joined_at: user.createdAt,
                        handleInfo: () => { },
                        infoLink: `/user/${user._id}?admin_id=${session.user._id}`,
                        actions: [
                            {
                                name: "View Profile",
                                link: `/user/${user._id}?admin_id=${session.user._id}`,
                                onClick: () => { }
                            },
                            {
                                name: "Copy User ID",
                                onClick: () => navigator.clipboard.writeText(user._id)
                            },
                            {
                                name: "Copy Email",
                                onClick: () => navigator.clipboard.writeText(user.email)
                            },
                            {
                                name: "Copy Phone",
                                onClick: () => {
                                    if (!user.phone_prefix) return toaster("info", "This user did not provide a phone number.")
                                    navigator.clipboard.writeText(user.phone_prefix + ' ' + user.phone_number)
                                }
                            },
                        ]
                    }
                })}
            />
        </CardAdmin>
    </>
};

export default Userlist;