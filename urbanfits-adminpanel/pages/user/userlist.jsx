import React from "react";
import Link from "next/link";
import CardAdmin from "@/components/cards/cardadmin";
import Button from "@/components/buttons/simple_btn";
import GenericTable1 from "@/components/GenericTables/GenericTable1";
import {
    userListTableColumns,
    userListTableData,
} from "@/mock/tablesdata";

const Userlist = () => {
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

        <CardAdmin classes="px-[40px] py-[42px] mt-[20px] ">
            {/* <div className="flex flex-col  ">
                <GenericTable1
                    border={true}
                    columns={userListTableColumns}
                    data={userListTableData}
                />
            </div> */}
        </CardAdmin>
    </>
};

export default Userlist;