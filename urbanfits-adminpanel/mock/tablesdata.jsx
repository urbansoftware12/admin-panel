import Image from "next/image";

import tableAvatarMan1 from "@/public/tableAvatarMan1.png";
import tableAvatarMan2 from "@/public/tableAvatarMan2.png";
import tableAvatarMan3 from "@/public/tableAvatarMan3.png";
import tableAvatarGirl1 from "@/public/tableAvatarGirl1.png";
import tableAvatarGirl2 from "@/public/tableAvatarGirl2.png";
import smartWatch from "@/public/smartWatch.png";
import sneakers from "@/public/sneakers.png";

import MenuButton from "@/components/buttons/menuButton";
import ActionButton from "@/components/buttons/ActionButton";
import StatusBadge from "@/components/GenericTables/StatusBadge";
import Infotip from '@/components/tooltips/infotip'
import { VisaIcon } from "@/public/icons/VisaIcon";
import { AmexIcon } from "@/public/icons/AmexIcon";
import { MastercardIcon } from "@/public/icons/MastercardIcon";
import { Dots3Icon } from "@/public/icons/Dots3Icon";

export const userListTableColumns = [
  {
    selector: row => row.avatar,
    name: "Avatar",
    cell: (row) => <span className='w-10 aspect-square rounded-lg overflow-hidden' >
      <Image className='w-full h-full object-cover' width={80} height={80} alt={row.name} src={row.avatar || process.env.NEXT_PUBLIC_DEFAULT_PFP} />
    </span>,
    width: '10%',
    sortable: true
  },
  {
    selector: row => row.name,
    cell: row => <div className="w-full group relative flex justify-start">
      <span className='w-full whitespace-nowrap truncate cursor-default'>
        {row.name}
        <Infotip>{row.fullname}</Infotip>
      </span>
    </div>,
    name: "Name",
    sortable: true,
  },
  {
    selector: row => row.email,
    cell: row => <div className="w-full group relative flex justify-start">
      <span className='w-full whitespace-nowrap truncate cursor-default'>
        {row.email}
        <Infotip>{row.email}</Infotip>
      </span>
    </div>,
    name: "Email",
    sortable: true,
  },
  {
    selector: row => row.phone,
    name: "Phone no.",
    cell: row => <div className="w-full group relative flex justify-start">
      <span className='w-full whitespace-nowrap truncate cursor-default'>
        {row.phone}
        <Infotip>{row.phone}</Infotip>
      </span>
    </div>,
    sortable: true,
  },
  {
    selector: row => row.purchases,
    name: "Total Purchases",
    sortable: true,
  },
  {
    selector: row => row.status,
    name: "Status",
    cell: row => <span style={{ background: row.status ? "#22c55e" : "#f3f4f6", color: row.status ? "white" : "black" }} className="text-xs bg-gray-100 text-white px-2 py-0.5 rounded-full">{row.status ? "Online" : "Offline"}</span>,
    sortable: true,
  },
  {
    selector: row => row.joined_at,
    cell: row => <div className="w-full group relative flex justify-start">
      <span className='w-full whitespace-nowrap truncate cursor-default'>
        {row.joined_at}
      </span>
      <Infotip positions="w-auto whitespace-nowrap right-5 -bottom-full">{row.joined_at}</Infotip>
    </div>,
    name: "Joined at",
    sortable: true,
  },
  {
    selector: row => row.actions,
    name: "Action",
    cell: (row) => <ActionButton infoLink={row.infoLink} handleInfo={row.handleInfo} options={row.actions} />
  }
]

export const userListTableData = [
  {
    profile: <Image alt="product image" src={tableAvatarMan1} />,
    name: "John",
    email: "Bilawalashraf@gmail.com",
    phone: "+91-989-325-8652",
    totalbuy: "1845",
    status: "Active",
    joinon: "Active",
    action: <ActionButton />,
  },
  {
    profile: <Image alt="product image" src={tableAvatarGirl1} />,
    name: "Artur",
    email: "Bilawalashraf@gmail.com",
    phone: "+91-989-325-8652",
    totalbuy: "1845",
    status: "Active",
    joinon: "Active",
    action: <ActionButton />,
  },
  {
    profile: <Image alt="product image" src={tableAvatarGirl2} />,
    name: "Arthur",
    email: "Bilawalashraf@gmail.com",
    phone: "+91-989-325-8652",
    totalbuy: "1845",
    status: "Active",
    joinon: "Active",
    action: <ActionButton />,
  },
  {
    profile: <Image alt="product image" src={tableAvatarMan2} />,
    name: "Doe John",
    email: "Bilawalashraf@gmail.com",
    phone: "+91-989-325-8652",
    totalbuy: "1845",
    status: "Active",
    joinon: "Active",
    action: <ActionButton />,
  },
  {
    profile: <Image alt="product image" src={tableAvatarMan3} />,
    name: "Willson",
    email: "Bilawalashraf@gmail.com",
    phone: "+91-989-325-8652",
    totalbuy: "1845",
    status: "Active",
    joinon: "Active",
    action: <ActionButton />,
  },
  {
    profile: <Image alt="product image" src={tableAvatarMan1} />,
    name: "Dikra Willson",
    email: "Bilawalashraf@gmail.com",
    phone: "+91-989-325-8652",
    totalbuy: "1845",
    status: "Active",
    joinon: "Active",
    action: <ActionButton />,
  },
  {
    profile: <Image alt="product image" src={tableAvatarGirl1} />,
    name: "Sara Khan",
    email: "Bilawalashraf@gmail.com",
    phone: "+91-989-325-8652",
    totalbuy: "1845",
    status: "Active",
    joinon: "Active",
    action: <ActionButton />,
  },
  {
    profile: <Image alt="product image" src={tableAvatarGirl2} />,
    name: "Natellie",
    email: "Bilawalashraf@gmail.com",
    phone: "+91-989-325-8652",
    totalbuy: "1845",
    status: "Active",
    joinon: "Active",
    action: <ActionButton />,
  },
  {
    profile: <Image alt="product image" src={tableAvatarMan2} />,
    name: "Mark Gomis",
    email: "Bilawalashraf@gmail.com",
    phone: "+91-989-325-8652",
    totalbuy: "1845",
    status: "Active",
    joinon: "Active",
    action: <ActionButton />,
  },
];

const orderStatusColors = { pending: { bg: "#a3a3a3", text: "#ffffff" }, readytoship: { bg: "#eede00", text: "#ffffff" }, shipped: { bg: "#f85b00", text: "#ffffff" }, returned: { bg: "#f30000", text: "#ffffff" }, delivered: { bg: "#00f37a", text: "#ffffff" } }
export const ordersTableColumns = [
  {
    selector: row => row.id,
    name: "ID",
    cell: (row) => <div className="w-full group relative flex justify-start">
      <span className='w-full whitespace-nowrap truncate cursor-default'>
        {row.id}
        <Infotip>{row.id}</Infotip>
      </span>
    </div>,
    width: '10%',
    sortable: true
  },
  {
    selector: row => row.item,
    name: "Item(s)",
    cell: (row) => <div className="flex items-center gap-x-2">
      <span className={`${row.image?.endsWith("_metal_bg") && row.image} w-10 aspect-square rounded-lg overflow-hidden`}>
        {!row.image?.endsWith("_metal_bg") && <Image className='w-full h-full object-cover' width={80} height={80} alt={row.name} src={row.image} />}
      </span>
      {row.name}
    </div>,
    width: '25%',
    sortable: true
  },
  {
    selector: row => row.email,
    cell: row => <div className="w-full group relative flex justify-start">
      <span className='w-full whitespace-nowrap truncate cursor-default'>
        {row.email}
        <Infotip>{row.email}</Infotip>
      </span>
    </div>,
    name: "Customer email",
    width: '18%',
    sortable: true,
  },
  {
    selector: row => row.price,
    name: "Total Price",
    sortable: true,
  },
  {
    selector: row => row.status,
    name: "Status",
    cell: row => { const lowerStatus = row.status.toLowerCase(); return <span style={{ background: orderStatusColors[lowerStatus].bg, color: orderStatusColors[lowerStatus].text }} className="text-xs px-2 py-0.5 rounded-full">{row.status}</span> },
    sortable: true,
  },
  {
    selector: row => row.date,
    cell: row => {
      const date = new Date(row.date)
      return <div className="w-full group relative flex justify-start">
        <span className='w-full whitespace-nowrap truncate cursor-default'>
          {date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()}
        </span>
        <Infotip positions="w-auto whitespace-nowrap right-5 -bottom-full">{row.date}</Infotip>
      </div>
    },
    name: "Joined at",
    sortable: true,
  },
  {
    selector: row => row.actions,
    name: "Action",
    cell: (row) => <ActionButton infoLink={row.infoLink} handleInfo={row.handleInfo} options={row.actions} />
  }
];

export const orderHistoryTableColumns = [
  {
    accessor: "id",
    Header: <span className="select-none " >ID</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "customer",
    Header: <span className="select-none " >Customer</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "email",
    Header: <span className="select-none " >Email</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "item",
    Header: <span className="select-none " >Item</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "price",
    Header: <span className="select-none " >Price</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "payment",
    Header: <span className="select-none " >Payment</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "status",
    Header: <span className="select-none " >Status</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "date",
    Header: <span className="select-none " >Date</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "action",
    Header: <span className="select-none " >Action</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
];

export const orderHistoryTableData = [
  {
    id: <p className="text-[14px] "> 354 </p>,
    customer: <p className="font-[400] "> Bilawal Ashraf </p>,
    email: <p className=" ">Bilawalashraf@gmail.com</p>,
    item: <p className="text-[14px] "> 0 </p>,
    price: <p className="text-[14px] "> $845 </p>,
    payment: <p className="text-[14px] font-[400] ">PAID</p>,
    status: <StatusBadge status="delivered" />,
    date: <p className="text-[14px] "> 2021-10-30</p>,
    action: <ActionButton />,
  },
  {
    id: <p className="text-[14px] "> 354 </p>,
    customer: <p className="font-[400] "> Bilawal Ashraf </p>,
    email: <p className=" ">Bilawalashraf@gmail.com</p>,
    item: <p className="text-[14px] "> 0 </p>,
    price: <p className="text-[14px] "> $845 </p>,
    payment: <p className="text-[14px] font-[400] ">PAID</p>,
    status: <StatusBadge status="delivered" />,
    date: <p className="text-[14px] "> 2021-10-30</p>,
    action: <ActionButton />,
  },
  {
    id: <p className="text-[14px] "> 354 </p>,
    customer: <p className="font-[400] "> Bilawal Ashraf </p>,
    email: <p className=" ">Bilawalashraf@gmail.com</p>,
    item: <p className="text-[14px] "> 0 </p>,
    price: <p className="text-[14px] "> $845 </p>,
    payment: <p className="text-[14px] font-[400] ">PAID</p>,
    status: <StatusBadge status="delivered" />,
    date: <p className="text-[14px] "> 2021-10-30</p>,
    action: <ActionButton />,
  },
  {
    id: <p className="text-[14px] "> 354 </p>,
    customer: <p className="font-[400] "> Bilawal Ashraf </p>,
    email: <p className=" ">Bilawalashraf@gmail.com</p>,
    item: <p className="text-[14px] "> 0 </p>,
    price: <p className="text-[14px] "> $845 </p>,
    payment: <p className="text-[14px] font-[400] ">PAID</p>,
    status: <StatusBadge status="delivered" />,
    date: <p className="text-[14px] "> 2021-10-30</p>,
    action: <ActionButton />,
  },
  {
    id: <p className="text-[14px] "> 354 </p>,
    customer: <p className="font-[400] "> Bilawal Ashraf </p>,
    email: <p className=" ">Bilawalashraf@gmail.com</p>,
    item: <p className="text-[14px] "> 0 </p>,
    price: <p className="text-[14px] "> $845 </p>,
    payment: <p className="text-[14px] font-[400] ">PAID</p>,
    status: <StatusBadge status="delivered" />,
    date: <p className="text-[14px] "> 2021-10-30</p>,
    action: <ActionButton />,
  },
  {
    id: <p className="text-[14px] "> 354 </p>,
    customer: <p className="font-[400] "> Bilawal Ashraf </p>,
    email: <p className=" ">Bilawalashraf@gmail.com</p>,
    item: <p className="text-[14px] "> 0 </p>,
    price: <p className="text-[14px] "> $845 </p>,
    payment: <p className="text-[14px] font-[400] ">PAID</p>,
    status: <StatusBadge status="delivered" />,
    date: <p className="text-[14px] "> 2021-10-30</p>,
    action: <ActionButton />,
  },
  {
    id: <p className="text-[14px] "> 354 </p>,
    customer: <p className="font-[400] "> Bilawal Ashraf </p>,
    email: <p className=" ">Bilawalashraf@gmail.com</p>,
    item: <p className="text-[14px] "> 0 </p>,
    price: <p className="text-[14px] "> $845 </p>,
    payment: <p className="text-[14px] font-[400] ">PAID</p>,
    status: <StatusBadge status="delivered" />,
    date: <p className="text-[14px] "> 2021-10-30</p>,
    action: <ActionButton />,
  },
  {
    id: <p className="text-[14px] "> 354 </p>,
    customer: <p className="font-[400] "> Bilawal Ashraf </p>,
    email: <p className=" ">Bilawalashraf@gmail.com</p>,
    item: <p className="text-[14px] "> 0 </p>,
    price: <p className="text-[14px] "> $845 </p>,
    payment: <p className="text-[14px] font-[400] ">PAID</p>,
    status: <StatusBadge status="delivered" />,
    date: <p className="text-[14px] "> 2021-10-30</p>,
    action: <ActionButton />,
  },
  {
    id: <p className="text-[14px] "> 354 </p>,
    customer: <p className="font-[400] "> Bilawal Ashraf </p>,
    email: <p className=" ">Bilawalashraf@gmail.com</p>,
    item: <p className="text-[14px] "> 0 </p>,
    price: <p className="text-[14px] "> $845 </p>,
    payment: <p className="text-[14px] font-[400] ">PAID</p>,
    status: <StatusBadge status="delivered" />,
    date: <p className="text-[14px] "> 2021-10-30</p>,
    action: <ActionButton />,
  },
  {
    id: <p className="text-[14px] "> 354 </p>,
    customer: <p className="font-[400] "> Bilawal Ashraf </p>,
    email: <p className=" ">Bilawalashraf@gmail.com</p>,
    item: <p className="text-[14px] "> 0 </p>,
    price: <p className="text-[14px] "> $845 </p>,
    payment: <p className="text-[14px] font-[400] ">PAID</p>,
    status: <StatusBadge status="delivered" />,
    date: <p className="text-[14px] "> 2021-10-30</p>,
    action: <ActionButton />,
  },

];

export const orderProductDetailTableColumns = [
  {
    selector: row => row.id,
    name: "ID",
    cell: (row) => <div className="w-full group relative flex justify-start">
      <span className='w-full whitespace-nowrap truncate cursor-default'>
        {row.id}
        <Infotip>{row.id}</Infotip>
      </span>
    </div>,
    width: '10%'
  },
  {
    selector: row => row.image,
    name: "Image",
    cell: (row) => <span className='w-10 aspect-square rounded-lg overflow-hidden'>
      <Image className='w-full h-full object-cover' width={80} height={80} alt={row.name} src={row.image} />
    </span>,
    width: '10%',
  },
  {
    selector: row => row.name,
    name: "Product",
    cell: (row) => <span className='flex flex-col text-xs text-gray-400'>
      <p className="text-sm text-black">{row.name}</p>
      Variant: {row.variant}
    </span>,
    width: '35%',
  },
  {
    selector: row => row.quantity,
    name: "Quantity",
    width: '9%'
  },
  {
    selector: row => row.weight,
    name: "Weight (grams)",
    width: '13%',
  },
  {
    selector: row => row.price,
    name: "Price/Unit",
    width: '12%',
  },
  {
    selector: row => row.price * row.quantity,
    name: "Subtotal",
    width: '10%'
  },
];



export const transactionTableColumns = [
  {
    accessor: "transid",
    Header: <span className="select-none " >Trans-ID</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "paid",
    Header: <span className="select-none " >Paid</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "method",
    Header: <span className="select-none " >Method</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "date",
    Header: <span className="select-none " >Date</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "date2",
    Header: <span className="select-none " >Date</span>,
    Cell: ({ cell: { value }, row }) => <span  > {value} </span>,
  },
]

export const transactionTableData = [
  {
    transid: "#1",
    paid: <p className="text-[14px] font-[400]"> $354.00 </p>,
    method: <p className="text-[14px] font-[400] flex items-center gap-[7px]"> <VisaIcon /> <p> Visa </p></p>,
    date: <p className="text-[14px] font-[400]"> 16.12.2018, 14:21 </p>,
    date2: <span className="w-[80px] h-[25px] rounded-[5px] border-[1px]
     flex justify-center items-center cursor-pointer " >
      <p className="text-[14px] font-[400]"> Details </p>
    </span>
  },
  {
    transid: "#2",
    paid: <p className="text-[14px] font-[400]"> $354.00 </p>,
    method: <p className="text-[14px] font-[400] flex items-center gap-[7px]"> <AmexIcon /> <p> Visa </p></p>,
    date: <p className="text-[14px] font-[400]"> 16.12.2018, 14:21 </p>,
    date2: <span className="w-[80px] h-[25px] rounded-[5px] border-[1px]
     flex justify-center items-center cursor-pointer " >
      <p className="text-[14px] font-[400]"> Details </p>
    </span>
  },
  {
    transid: "#3",
    paid: <p className="text-[14px] font-[400]"> $354.00 </p>,
    method: <p className="text-[14px] font-[400] flex items-center gap-[7px]"> <MastercardIcon /> <p> Visa </p></p>,
    date: <p className="text-[14px] font-[400]"> 16.12.2018, 14:21 </p>,
    date2: <span className="w-[80px] h-[25px] rounded-[5px] border-[1px]
     flex justify-center items-center cursor-pointer " >
      <p className="text-[14px] font-[400]"> Details </p>
    </span>
  },
  {
    transid: "#4",
    paid: <p className="text-[14px] font-[400]"> $354.00 </p>,
    method: <p className="text-[14px] font-[400] flex items-center gap-[7px]"> <VisaIcon /> <p> Visa </p></p>,
    date: <p className="text-[14px] font-[400]"> 16.12.2018, 14:21 </p>,
    date2: <span className="w-[80px] h-[25px] rounded-[5px] border-[1px]
     flex justify-center items-center cursor-pointer " >
      <p className="text-[14px] font-[400]"> Details </p>
    </span>
  },
  {
    transid: " #5",
    paid: <p className="text-[14px] font-[400]"> $354.00 </p>,
    method: <p className="text-[14px] font-[400] flex items-center gap-[7px]"> <VisaIcon /> <p> Visa </p></p>,
    date: <p className="text-[14px] font-[400]"> 16.12.2018, 14:21 </p>,
    date2: <span className="w-[80px] h-[25px] rounded-[5px] border-[1px]
     flex justify-center items-center cursor-pointer " >
      <p className="text-[14px] font-[400]"> Details </p>
    </span>
  },
  {
    transid: " #6",
    paid: <p className="text-[14px] font-[400]"> $354.00 </p>,
    method: <p className="text-[14px] font-[400] flex items-center gap-[7px]"> <VisaIcon /> <p> Visa </p></p>,
    date: <p className="text-[14px] font-[400]"> 16.12.2018, 14:21 </p>,
    date2: <span className="w-[80px] h-[25px] rounded-[5px] border-[1px]
     flex justify-center items-center cursor-pointer " >
      <p className="text-[14px] font-[400]"> Details </p>
    </span>
  },
  {
    transid: "#7",
    paid: <p className="text-[14px] font-[400]"> $354.00 </p>,
    method: <p className="text-[14px] font-[400] flex items-center gap-[7px]"> <VisaIcon /> <p> Visa </p></p>,
    date: <p className="text-[14px] font-[400]"> 16.12.2018, 14:21 </p>,
    date2: <span className="w-[80px] h-[25px] rounded-[5px] border-[1px]
     flex justify-center items-center cursor-pointer " >
      <p className="text-[14px] font-[400]"> Details </p>
    </span>
  },
  {
    transid: "#8",
    paid: <p className="text-[14px] font-[400]"> $354.00 </p>,
    method: <p className="text-[14px] font-[400] flex items-center gap-[7px]"> <VisaIcon /> <p> Visa </p></p>,
    date: <p className="text-[14px] font-[400]"> 16.12.2018, 14:21 </p>,
    date2: <span className="w-[80px] h-[25px] rounded-[5px] border-[1px]
     flex justify-center items-center cursor-pointer " >
      <p className="text-[14px] font-[400]"> Details </p>
    </span>
  },
  {
    transid: "#9",
    paid: <p className="text-[14px] font-[400]"> $354.00 </p>,
    method: <p className="text-[14px] font-[400] flex items-center gap-[7px]"> <VisaIcon /> <p> Visa </p></p>,
    date: <p className="text-[14px] font-[400]"> 16.12.2018, 14:21 </p>,
    date2: <span className="w-[80px] h-[25px] rounded-[5px] border-[1px]
     flex justify-center items-center cursor-pointer " >
      <p className="text-[14px] font-[400]"> Details </p>
    </span>
  },
  {
    transid: "#10",
    paid: <p className="text-[14px] font-[400]"> $354.00 </p>,
    method: <p className="text-[14px] font-[400] flex items-center gap-[7px]"> <VisaIcon /> <p> Visa </p></p>,
    date: <p className="text-[14px] font-[400]"> 16.12.2018, 14:21 </p>,
    date2: <span className="w-[80px] h-[25px] rounded-[5px] border-[1px]
     flex justify-center items-center cursor-pointer " >
      <p className="text-[14px] font-[400]"> Details </p>
    </span>
  },
  {
    transid: "#11",
    paid: <p className="text-[14px] font-[400]"> $354.00 </p>,
    method: <p className="text-[14px] font-[400] flex items-center gap-[7px]"> <VisaIcon /> <p> Visa </p></p>,
    date: <p className="text-[14px] font-[400]"> 16.12.2018, 14:21 </p>,
    date2: <span className="w-[80px] h-[25px] rounded-[5px] border-[1px]
     flex justify-center items-center cursor-pointer " >
      <p className="text-[14px] font-[400]"> Details </p>
    </span>
  },

]




export const invoiceTableColumns = [
  {
    accessor: "id",
    Header: <span className="select-none " >#</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "image",
    Header: <span className="select-none " >Image</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "item",
    Header: <span className="select-none " >Item</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "description",
    Header: <span className="select-none " >Description</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "quantity",
    Header: <span className="select-none " >Quantity</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "unicost",
    Header: <span className="select-none " >Uni-Const</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "total",
    Header: <span className="select-none " >Total</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
]

export const invoiceTableData = [
  {
    id: <p className="text-[14px] font-[400]"> 1 </p>,
    image: <Image alt="product image" src={smartWatch} />,
    item: <p className="text-[14px] font-[400]"> Digital Watch </p>,
    description: <p className="text-[14px] font-[400]"> Amazing Watch with 10 days replacement warranty </p>,
    quantity: <p className="text-[14px] font-[400]"> 4 </p>,
    unicost: <p className="text-[14px] font-[400]"> $50.00 </p>,
    total: <p className="text-[14px] font-[400]"> $200.00 </p>,

  },
  {
    id: <p className="text-[14px] font-[400]"> 2</p>,
    image: <Image alt="product image" src={smartWatch} />,
    item: <p className="text-[14px] font-[400]"> Digital Watch </p>,
    description: <p className="text-[14px] font-[400]"> Amazing Watch with 10 days replacement warranty </p>,
    quantity: <p className="text-[14px] font-[400]"> 4 </p>,
    unicost: <p className="text-[14px] font-[400]"> $50.00 </p>,
    total: <p className="text-[14px] font-[400]"> $200.00 </p>,

  },
  {
    id: <p className="text-[14px] font-[400]"> 3 </p>,
    image: <Image alt="product image" src={smartWatch} />,
    item: <p className="text-[14px] font-[400]"> Digital Watch </p>,
    description: <p className="text-[14px] font-[400]"> Amazing Watch with 10 days replacement warranty </p>,
    quantity: <p className="text-[14px] font-[400]"> 4 </p>,
    unicost: <p className="text-[14px] font-[400]"> $50.00 </p>,
    total: <p className="text-[14px] font-[400]"> $200.00 </p>,

  },
  {
    id: <p className="text-[14px] font-[400]"> 4 </p>,
    image: <Image alt="product image" src={smartWatch} />,
    item: <p className="text-[14px] font-[400]"> Digital Watch </p>,
    description: <p className="text-[14px] font-[400]"> Amazing Watch with 10 days replacement warranty </p>,
    quantity: <p className="text-[14px] font-[400]"> 4 </p>,
    unicost: <p className="text-[14px] font-[400]"> $50.00 </p>,
    total: <p className="text-[14px] font-[400]"> $200.00 </p>,

  },
  {
    id: <p className="text-[14px] font-[400]"> 5 </p>,
    image: <Image alt="product image" src={smartWatch} />,
    item: <p className="text-[14px] font-[400]"> Digital Watch </p>,
    description: <p className="text-[14px] font-[400]"> Amazing Watch with 10 days replacement warranty </p>,
    quantity: <p className="text-[14px] font-[400]"> 4 </p>,
    unicost: <p className="text-[14px] font-[400]"> $50.00 </p>,
    total: <p className="text-[14px] font-[400]"> $200.00 </p>,

  },

]

export const recentOrdersTableColumns = [
  {
    accessor: "orderid",
    Header: <span className="select-none " >Order Id</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "productname",
    Header: <span className="select-none " >Product Name</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "units",
    Header: <span className="select-none " >Units</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "orderdate",
    Header: <span className="select-none " >Order Date</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "ordercost",
    Header: <span className="select-none " >Order Cost</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "status",
    Header: <span className="select-none " >Status</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
  {
    accessor: "action",
    Header: <span className="select-none " >Action</span>,
    Cell: ({ cell: { value }, row }) => <span> {value} </span>,
  },
]

export const recentOrdersTableData = [

  {
    orderid: <p className="text-[14px] font-[400]"> 24541 </p>,
    productname: " Coach Swagger ",
    units: <p className="text-[14px] font-[400]"> 1 Units </p>,
    orderdate: <p className="text-[14px] font-[400]"> Oct 20, 2018 </p>,
    ordercost: <p className="text-[14px] font-[400]"> $230 </p>,
    status: <StatusBadge status="delivered" />,
    action: <p className="text-[14px] font-[400]"> <Dots3Icon /> </p>,

  },
  {
    orderid: <p className="text-[14px] font-[400]"> 24541 </p>,
    productname: " Coach Swagger ",
    units: <p className="text-[14px] font-[400]"> 1 Units </p>,
    orderdate: <p className="text-[14px] font-[400]"> Oct 20, 2018 </p>,
    ordercost: <p className="text-[14px] font-[400]"> $230 </p>,
    status: <StatusBadge status="delivered" />,
    action: <p className="text-[14px] font-[400]"> <Dots3Icon /> </p>,

  },
  {
    orderid: <p className="text-[14px] font-[400]"> 24541 </p>,
    productname: " Coach Swagger ",
    units: <p className="text-[14px] font-[400]"> 1 Units </p>,
    orderdate: <p className="text-[14px] font-[400]"> Oct 20, 2018 </p>,
    ordercost: <p className="text-[14px] font-[400]"> $230 </p>,
    status: <StatusBadge status="delivered" />,
    action: <p className="text-[14px] font-[400]"> <Dots3Icon /> </p>,

  },
  {
    orderid: <p className="text-[14px] font-[400]"> 24541 </p>,
    productname: " Coach Swagger ",
    units: <p className="text-[14px] font-[400]"> 1 Units </p>,
    orderdate: <p className="text-[14px] font-[400]"> Oct 20, 2018 </p>,
    ordercost: <p className="text-[14px] font-[400]"> $230 </p>,
    status: <StatusBadge status="delivered" />,
    action: <p className="text-[14px] font-[400]"> <Dots3Icon /> </p>,

  },
  {
    orderid: <p className="text-[14px] font-[400]"> 22 </p>,
    productname: "  kali swagger  ",
    units: <p className="text-[14px] font-[400]"> 1 Units </p>,
    orderdate: <p className="text-[14px] font-[400]"> Oct 20, 2018 </p>,
    ordercost: <p className="text-[14px] font-[400]"> $230 </p>,
    status: <StatusBadge status="delivered" />,
    action: <p className="text-[14px] font-[400]"> <Dots3Icon /> </p>,

  },
  {
    orderid: <p className="text-[14px] font-[400]"> 24541 </p>,
    productname: " Coach Swagger ",
    units: <p className="text-[14px] font-[400]"> 1 Units </p>,
    orderdate: <p className="text-[14px] font-[400]"> Oct 20, 2018 </p>,
    ordercost: <p className="text-[14px] font-[400]"> $230 </p>,
    status: <StatusBadge status="delivered" />,
    action: <p className="text-[14px] font-[400]"> <Dots3Icon /> </p>,

  },

]



export const productListTableColumns = [
  {
    selector: row => row.product,
    name: "Product",
    cell: (row) => <span className='w-12 aspect-square rounded-lg overflow-hidden' >
      <Image className='w-full h-full object-cover' width={250} height={250} alt={row.name} src={row.product} />
    </span>,
    sortable: true,
    width: '10%'
  },
  {
    selector: row => row.name,
    cell: row => <div className="w-full group relative flex justify-start">
      <span className='w-full whitespace-nowrap truncate cursor-default'>
        {row.name}
        <Infotip>{row.name}</Infotip>
      </span>
    </div>,
    name: "Name",
    sortable: true,
  },
  {
    selector: row => row.price,
    name: "Price",
    cell: (row) => `${row.price}د.إ`,
    sortable: true,
  },
  {
    selector: row => row.offer,
    name: "Offer",
    cell: (row) => `${row.offer}% off`,
    sortable: true,
  },
  {
    selector: row => row.purchased,
    name: "Purchased",
    sortable: true,
  },
  {
    selector: row => row.stock,
    name: "Stock",
    sortable: true,
  },
  {
    selector: row => row.status,
    name: "Status",
    sortable: true,
  },
  {
    selector: row => row.date,
    cell: row => <div className="w-full group relative flex justify-start">
      <span className='w-full whitespace-nowrap truncate cursor-default'>
        {row.date}
      </span>
      <Infotip positions="w-auto whitespace-nowrap right-5 -bottom-full">Created At: {row.date} <br /> Updated At: {row.updatedAt}</Infotip>
    </div>,
    name: "Date",
    sortable: true,
  },
  {
    selector: row => row.actions,
    name: "Action",
    cell: (row) => <ActionButton infoLink={row.infoLink} handleInfo={row.handleInfo} options={row.actions} />
  }
]


export const productCategoriesTableColumns00 = [
  {
    accessor: "id",
    Header: ({ getToggleAllRowsSelectedProps }) => (
      <>
        <input id="selectall" type="checkbox" {...getToggleAllRowsSelectedProps()} />
        <label htmlFor="selectall" className="select-none">ID</label>
      </>
    ),
    Cell: ({ cell: { value }, row }) => <div className="group relative z-30 flex justify-start gap-x-2" > <input value={value} id={value} type="checkbox" {...row.getToggleRowSelectedProps()} /> <label htmlFor={value} className='w-10 truncate cursor-pointer'>
      {value}
      <Infotip>{value}</Infotip>
    </label> </div>,
    disableSortBy: true,
  },
  {
    accessor: "name",
    Header: <span className="select-none " >Name</span>,
    Cell: ({ cell: { value } }) => <span className='max-w-[80px] truncate cursor-pointer'>{value}</span>,
  },
  {
    accessor: "description",
    Header: <span className="select-none " >Description</span>,
    Cell: ({ cell: { value }, r }) => <span className='max-w-[80px] truncate cursor-pointer'>{value}</span>,
  },
  {
    accessor: "slug",
    Header: <span className="select-none " >Slug</span>,
    Cell: ({ cell: { value } }) => <span className='max-w-[80px] truncate cursor-pointer'>{value}</span>,
  },
  {
    accessor: "order",
    Header: <span className="select-none " >Order</span>,
    Cell: ({ cell: { value } }) => <span>{value}</span>,
  },
  {
    accessor: "action",
    Header: <span className="select-none " >Action</span>,
    Cell: ({ cell: { value } }) => value,
  }
]
export const productCategoriesTableColumns = [
  {
    selector: row => row.id,
    name: <span className="text-[15px]" >ID</span>,
    cell: (row) => {
      const value = row.id
      return <div className="w-full group relative flex justify-start">
        <span className='w-full whitespace-nowrap truncate overflow-hidden cursor-default'>
          {value}
          <Infotip>{value}</Infotip>
        </span>
      </div>
    },
    sortable: true,
    width: "16%"
  },
  {
    selector: row => row.name,
    name: <span className="select-none text-[15px]">Name</span>,
    sortable: true,
    width: "16%"
  },
  {
    selector: row => row.description,
    name: <span className="select-none text-[15px]" >Description</span>,
    sortable: true,
    width: "16%"
  },
  {
    selector: row => row.slug,
    name: <span className="select-none text-[15px]" >Slug</span>,
    sortable: true,
    width: "16%"
  },
  {
    selector: row => row.order,
    name: <span className="select-none text-[15px]" >Order</span>,
    sortable: true,
    width: "16%"
  },
  {
    selector: row => row.action,
    name: <span className="select-none text-[15px]" >Action</span>,
    cell: (row) => <MenuButton options={row.actions} />,
    sortable: true,
    width: "16%"
  }
]