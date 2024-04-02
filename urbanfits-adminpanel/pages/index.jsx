import React, { useEffect, useState } from 'react'
import CardAdmin from '@/components/cards/cardadmin'
import LineChart from '@/components/charts/LineChart'
import DoughnutChart from '@/components/charts/DoughnutChart'
import LineChart2 from '@/components/charts/LineChart2'
import BarChart from '@/components/charts/BarChart'
import { GeoChart } from '@/components/charts/GeoChart'
import BarChartHor from '@/components/charts/BarChartHor'
import { RefreshIcon } from '@/public/icons/RefreshIcon'
import { Dots3Icon } from '@/public/icons/Dots3Icon'
import DownStickArrowIcon from '@/public/icons/DownStickArrowIcon'
// import { recentOrdersTableColumns, recentOrdersTableData } from '@/mock/tablesdata'
// import GenericTable3 from '@/components/GenericTables/GenericTable3'
import avatarYellow from '@/public/avatarYellow.png'
import pinkShoesAvatar from '@/public/pinkShoesAvatar.png'
import Image from 'next/image'
import AvatarIconV from '@/public/icons/AvatarIconV'
import PurseIcon from '@/public/icons/PurseIcon'
import VisitorsIcon from '@/public/icons/VisitorsIcon'
import WalletIcon from '@/public/icons/WalletIcon'
import { TruckLIcon } from '@/public/icons/TruckLIcon'
import DollarCardIcon from '@/public/icons/DollarCardIcon'
import { orderStatuses } from '@/uf.config'
import axios from 'axios';
import toaster from '@/utils/toast_function'

export default function Dashboard() {
    const [metrics, setMetrics] = useState({
        metricsLoading: false,
        avg_signups: 0,
        avg_visits: 0,
        total_orders: 0,
        cancelled_orders: 0,
        total_products: 0,
        total_category: 0
    })

    const getMetrics = async () => {
        setMetrics(prev => ({ ...prev, metricsLoading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/metrics`);
            setMetrics(data.metrics)
        } catch (e) { console.log(e); toaster("error", "Somethign went wrong getting the meterics data.") }
        finally { setMetrics(prev => ({ ...prev, metricsLoading: false })) }
    }

    useEffect(() => {
        getMetrics()
    }, [])

    return <>
        <div className="my-4 flex justify-end">
            <button disabled={metrics.metricsLoading} onClick={getMetrics} className={`${metrics.metricsLoading && "pointer-events-none animate-pulse"} px-4 py-1 text-sm rounded-2xl bg-gold-land text-white`}>Refresh Metrics</button>
        </div>
        <section className='grid grid-cols-4 gap-6'>
            <CardAdmin round="rounded-2xl">
                <div className='px-[20px] py-[30px] rounded-[15px] flex justify-between items-center ' >
                    <div className='flex flex-col gap-[8px]' >
                        <span className='text-sm' >Daily Signups</span>
                        <span className=' text-[22px]' >{metrics.avg_signups}</span>
                    </div>
                    <div className=' bg-[#F5F5F5] rounded-[50px] w-[50px] h-[50px]  flex items-center justify-center ' >
                        <AvatarIconV />
                    </div>
                </div>
            </CardAdmin>
            <CardAdmin round="rounded-2xl">
                <div className='px-[20px] py-[30px] rounded-[15px] flex justify-between items-center ' >
                    <div className='flex flex-col gap-[8px]' >
                        <p className='text-sm' >Daily Visitors</p>
                        <p className=' text-[22px]' >{metrics.avg_visits}</p>
                    </div>
                    <div className=' bg-[#F5F5F5] rounded-[50px] w-[50px] h-[50px]  flex items-center justify-center ' >
                        <VisitorsIcon />
                    </div>
                </div>
            </CardAdmin>
            <CardAdmin round="rounded-2xl">
                <div className='px-[20px] py-[30px] rounded-[15px] flex justify-between items-center ' >
                    <div className='flex flex-col gap-2' >
                        <p className='text-sm' >Monthly Sales</p>
                        <p className='text-[22px]'>400<span className='text-[12px] font-[300]' >Units</span> </p>
                    </div>
                    <div className=' bg-[#F5F5F5] rounded-[50px] w-[50px] h-[50px]  flex items-center justify-center ' >
                        <AvatarIconV />
                    </div>
                </div>
            </CardAdmin>
            <CardAdmin round="rounded-2xl">
                <div className='px-[20px] py-[30px] rounded-[15px] flex justify-between items-center ' >
                    <div className='flex flex-col gap-[8px]' >
                        <p className='text-sm'>Cancelled Orders</p>
                        <p className='text-[22px] font-[500]' >{metrics.cancelled_orders}<span className='text-[12px] font-[300]' >Units</span> </p>
                    </div>
                    <div className=' bg-[#F5F5F5] rounded-[50px] w-[50px] h-[50px]  flex items-center justify-center ' >
                        <VisitorsIcon />
                    </div>
                </div>
            </CardAdmin>
            <CardAdmin round="rounded-2xl">
                <div className='px-[20px] py-[30px] rounded-[15px] flex justify-between items-center ' >
                    <div className='flex flex-col gap-[8px]' >
                        <p className='text-sm' >Orders</p>
                        <p className=' text-[22px]' >{metrics.total_orders}</p>
                        <p className='text-xs' >Excluding cancelle orders</p>
                    </div>
                    <div className=' bg-[#F5F5F5] rounded-[50px] w-[50px] h-[50px]  flex items-center justify-center ' >
                        <TruckLIcon />
                    </div>
                </div>
            </CardAdmin>
            <CardAdmin round="rounded-2xl">
                <div className='px-[20px] py-[30px] rounded-[15px] flex justify-between items-center ' >
                    <div className='flex flex-col gap-[8px]' >
                        <p className='text-sm' >Products</p>
                        <p className=' text-[22px]' >{metrics.total_products}</p>
                        <p className='text-xs' >In {metrics.total_category} Categories</p>
                    </div>
                    <div className=' bg-[#F5F5F5] rounded-[50px] w-[50px] h-[50px]  flex items-center justify-center ' >
                        <PurseIcon />
                    </div>
                </div>
            </CardAdmin>
            <CardAdmin round="rounded-2xl">
                <div className='px-[20px] py-[30px] rounded-[15px] flex justify-between items-center ' >
                    <div className='flex flex-col gap-[8px]' >
                        <p className='text-sm' >Daily Revenue</p>
                        <p className=' text-[22px]' >7,903</p>
                        <p className='text-xs' >Based in your local time</p>
                    </div>
                    <div className=' bg-[#F5F5F5] rounded-[50px] w-[50px] h-[50px]  flex items-center justify-center ' >
                        <DollarCardIcon />
                    </div>
                </div>
            </CardAdmin>
            <CardAdmin round="rounded-2xl">
                <div className='px-[20px] py-[30px] rounded-[15px] flex justify-between items-center ' >
                    <div className='flex flex-col gap-[8px]' >
                        <p className='text-sm' >Monthly Earning</p>
                        <p className=' text-[22px]' >$37,903</p>
                        <p className='text-xs' >Based in your local time</p>
                    </div>
                    <div className=' bg-[#F5F5F5] rounded-[50px] w-[50px] h-[50px]  flex items-center justify-center ' >
                        <WalletIcon />
                    </div>
                </div>
            </CardAdmin>
        </section>

        <section className='grid grid-cols-6 gap-[27px] mt-[30px] ' >
            <div className='col-span-4' >
                <CardAdmin>
                    <div className='px-[30px] py-[33.5px] ' >
                        <p className='text-[22px]mb-[34px] ' >Sale Report</p>
                        <LineChart />
                        <div className='flex gap-[70px] items-centertext-smmt-[30px] ' >
                            <span className='flex gap-[10px] items-center ' >
                                <div className='w-[15px] h-[15px] rounded-[50px] bg-[#88B5E2]' />
                                <p>Via Referral</p>
                            </span>
                            <span className='flex gap-[10px] items-center ' >
                                <div className='w-[15px] h-[15px] rounded-[50px] bg-[#C7FCDF]' />
                                <p>Direct</p>
                            </span>
                            <span className='flex gap-[10px] items-center ' >
                                <div className='w-[15px] h-[15px] rounded-[50px] bg-[#FEDDE1]' />
                                <p>Via Social</p>
                            </span>
                        </div>
                    </div>
                </CardAdmin>
            </div>
            <div className='col-span-2' >
                <CardAdmin>
                    <div className='p-8 flex flex-col items-center justify-center'>
                        <span className='text-[22px] mb-b self-start'>Order Review</span>
                        <div className='w-60'>
                            <DoughnutChart />
                        </div>

                        <button className='pt-8 pb-4 text-sm' >
                            <i class="fa-solid fa-download text-base mr-3" />
                            Download Overall Report
                        </button>
                        <div className='pt-4 grid grid-cols-2 gap-y-7 gap-x-10 text-xs border-t border-gray-300'>
                            {Object.keys(orderStatuses).map((status, index) => <span key={index} className='flex gap-[10px] items-center'>
                                <div style={{ background: orderStatuses[status].bg }} className='w-4 aspect-square rounded-3xl' />
                                <span className='capitalize'>{status.toLowerCase()}</span>
                            </span>)}
                        </div>
                    </div>
                </CardAdmin>
            </div>
        </section>

        <section className='grid grid-cols-6 gap-[27px] mt-[30px] ' >
            <div className='col-span-4' >
                <CardAdmin>
                    <div className='px-[30px] py-[33.5px] ' >
                        <p className='text-[22px]mb-[34px] ' >Sale Report</p>
                        <LineChart2 />

                        {/* <BarChart/> */}


                    </div>
                </CardAdmin>
            </div>
            <div className='col-span-2' >
                <CardAdmin>
                    <div className='px-[30px] py-[33.5px] ' >
                        <p className='text-[22px]mb-[14px] ' >Current User</p>
                        <BarChart />
                    </div>
                </CardAdmin>
            </div>
        </section>

        <section className='grid grid-cols-6 gap-[27px] mt-[30px] ' >
            <div className='col-span-4' >
                <CardAdmin>
                    <div className='px-[30px] py-[33.5px] ' >
                        <p className='text-[22px]mb-[10px] ' >Purchased By Country</p>
                        <GeoChart />

                        {/* <BarChart/> */}

                        <div className='grid grid-cols-2 gap-[30px]' >
                            <div>
                                <BarChartHor
                                    country={['USA', 'Turkey', 'India']}
                                    dataArr={[5, 15, 20]}
                                />
                            </div>
                            <div>
                                <BarChartHor
                                    country={['Florida', 'Poland', 'UK']}
                                    dataArr={[5, 15, 20]}


                                />
                            </div>
                        </div>
                    </div>
                </CardAdmin>
            </div>
            <div className='col-span-2' >
                <CardAdmin>
                    <div className='px-[30px] py-[33.5px] ' >
                        <div className='flex items-center justify-between  mb-[10px]' >
                            <p className='text-[22px] ' >Sold By Items</p>
                            <div className=' flex items-center gap-[24px]' > <RefreshIcon /> <Dots3Icon />  </div>
                        </div>

                        {[...Array(10)].map((e, i) => (
                            <>
                                {i == 0 ? '' : <hr />}

                                <div className={`flex items-center justify-betweentext-sm
                  ${i == 0 && "mt-[20px]"}
                 my-[15px]`} >
                                    <p>Backpack</p>
                                    <p>9</p>
                                    <p className='flex items-center gap-[5px]'  > <p> 33%</p> <DownStickArrowIcon />  </p>
                                </div>

                            </>
                        ))}

                    </div>
                </CardAdmin>
            </div>
        </section>

        <section>
            <CardAdmin classes="mt-[30px] " >
                <div className='p-[30px]  ' >
                    <div className='mb-[10px]' >
                        <p className='text-[22px]mb-[10px] ' >Recent Orders</p>
                    </div>
                    <div className='px-[20px] ' >
                        {/* <GenericTable3
              data={recentOrdersTableData}
              columns={recentOrdersTableColumns}
            /> */}
                    </div>

                </div>
            </CardAdmin>
        </section>

        <section className='grid grid-cols-6 gap-[27px] mt-[30px] ' >
            <div className='col-span-2' >
                <CardAdmin>
                    <div className='px-[30px] py-[33.5px] ' >
                        <div className='flex items-center justify-between  mb-[10px]' >
                            <p className='text-[22px] ' >New Customers</p>
                            <div className=' flex items-center gap-[24px]' > <RefreshIcon /> <Dots3Icon />  </div>
                        </div>

                        {[...Array(10)].map((e, i) => (
                            <>


                                <div className={`flex items-center justify-betweentext-sm
                  ${i == 0 && "mt-[20px]"}
                 my-[15px]`} >
                                    <div className='flex gap-[15px] items-center ' >
                                        <Image src={avatarYellow} alt='user avatar' />
                                        <div>
                                            <p className='font-[400] ' >Selena Wagner</p>
                                            <p className='font-[300] ' >@salina.io</p>
                                        </div>
                                    </div>
                                    <p className='font-[400] '>2 orders</p>
                                    <p className='font-[400] '>$150</p>
                                </div>

                            </>
                        ))}

                    </div>
                </CardAdmin>
            </div>
            <div className='col-span-4' >
                <CardAdmin>
                    <div className='px-[30px] py-[33.5px] ' >
                        <div className='flex items-center justify-between  mb-[10px]' >
                            <p className='text-[22px] ' >New Customers</p>
                            <div className=' flex items-center gap-[24px]' > <RefreshIcon /> <Dots3Icon />  </div>
                        </div>

                        {[...Array(6)].map((e, i) => (
                            <>


                                <div className={`flex items-center justify-betweentext-sm
                  ${i == 0 && "mt-[20px]"}
                 my-[15px]`} >
                                    <div className='flex gap-[15px] items-center ' >
                                        <Image alt="product image" src={pinkShoesAvatar} />
                                        <div>
                                            <p className='font-[500] ' >Selena Wagner</p>
                                            <p className='font-[400] ' >Statement belting with double turn lock hardware add swaggers to a simple</p>
                                            <p className='font-[400] ' >$520 <strike>$500</strike> </p>
                                        </div>
                                    </div>
                                    <p className='font-[400] '>2 orders</p>
                                    <p className='font-[400] '>$150</p>
                                </div>

                            </>
                        ))}

                    </div>
                </CardAdmin>
            </div>
        </section>
        {/* <CardAdmin>
              <div className='gird grid-cols-1' >
                  <LineChart/>
              </div>
          </CardAdmin> */}
    </>
}