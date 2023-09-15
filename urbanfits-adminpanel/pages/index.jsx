import React from 'react'
import CardAdmin from '@/components/cards/cardadmin'
import LineChart from '@/components/charts/LineChart'
import DoughnutChart from '@/components/charts/DoughnutChart'
import DownloadIcon from '@/public/icons/DownloadIcon'
import LineChart2 from '@/components/charts/LineChart2'
import BarChart from '@/components/charts/BarChart'
import { GeoChart } from '@/components/charts/GeoChart'
import BarChartHor from '@/components/charts/BarChartHor'
import { RefreshIcon } from '@/public/icons/RefreshIcon'
import { Dots3Icon } from '@/public/icons/Dots3Icon'
import DownStickArrowIcon from '@/public/icons/DownStickArrowIcon'
import { recentOrdersTableColumns, recentOrdersTableData } from '@/mock/tablesdata'
import GenericTable3 from '@/components/GenericTables/GenericTable3'
import avatarYellow from '@/public/avatarYellow.png'
import pinkShoesAvatar from '@/public/pinkShoesAvatar.png'
import Image from 'next/image'
import AvatarIconV from '@/public/icons/AvatarIconV'
import PurseIcon from '@/public/icons/PurseIcon'
import VisitorsIcon from '@/public/icons/VisitorsIcon'
import WalletIcon from '@/public/icons/WalletIcon'
import { TruckLIcon } from '@/public/icons/TruckLIcon'
import DollarCardIcon from '@/public/icons/DollarCardIcon'

const index = () => {
  return <>
    <section className='grid grid-cols-4 gap-[27px] mt-[20px] ' >
      <div className='flex flex-col gap-[13px]' >
        <CardAdmin>
          <div className='px-[20px] py-[30px] rounded-[15px] flex justify-between items-center ' >
            <div className='flex flex-col gap-[8px]' >
              <p className=' text-[14px] font-[400] ' >Daily Signup</p>
              <p className=' text-[22px] font-[500] ' >1,503</p>
            </div>
            <div className=' bg-[#F5F5F5] rounded-[50px] w-[50px] h-[50px]  flex items-center justify-center ' >
              {/* <AvatarIcon fill="#F5F5F5" stroke="black" /> */}
              <AvatarIconV />
            </div>
          </div>
        </CardAdmin>
        <CardAdmin>
          <div className='px-[20px] py-[30px] rounded-[15px] flex justify-between items-center ' >
            <div className='flex flex-col gap-[8px]' >
              <p className=' text-[14px] font-[400] ' >Products</p>
              <p className=' text-[22px] font-[500] ' >1,255</p>
              <p className=' text-[12px] font-[300] ' >In 20 Categories</p>
            </div>
            <div className=' bg-[#F5F5F5] rounded-[50px] w-[50px] h-[50px]  flex items-center justify-center ' >
              <PurseIcon />
            </div>
          </div>
        </CardAdmin>


      </div>
      <div className='flex flex-col gap-[13px]' >
        <CardAdmin>
          <div className='px-[20px] py-[30px] rounded-[15px] flex justify-between items-center ' >
            <div className='flex flex-col gap-[8px]' >
              <p className=' text-[14px] font-[400] ' >Daily Visitors</p>
              <p className=' text-[22px] font-[500] ' >7,903</p>
            </div>
            <div className=' bg-[#F5F5F5] rounded-[50px] w-[50px] h-[50px]  flex items-center justify-center ' >
              <VisitorsIcon />
            </div>
          </div>
        </CardAdmin>
        <CardAdmin>
          <div className='px-[20px] py-[30px] rounded-[15px] flex justify-between items-center ' >
            <div className='flex flex-col gap-[8px]' >
              <p className=' text-[14px] font-[400] ' >Monthly Earning</p>
              <p className=' text-[22px] font-[500] ' >$37,903</p>
              <p className=' text-[12px] font-[300] ' >Based in your local time</p>
            </div>
            <div className=' bg-[#F5F5F5] rounded-[50px] w-[50px] h-[50px]  flex items-center justify-center ' >
              <WalletIcon />
            </div>
          </div>
        </CardAdmin>


      </div>

      <div className='flex flex-col gap-[13px]' >
        <CardAdmin>
          <div className='px-[20px] py-[30px] rounded-[15px] flex justify-between items-center ' >
            <div className='flex flex-col gap-[8px]' >
              <p className=' text-[14px] font-[400] ' >Orders</p>
              <p className=' text-[22px] font-[500] ' >7,903</p>
              <p className=' text-[12px] font-[300] ' >Excluding orders in transit</p>
            </div>
            <div className=' bg-[#F5F5F5] rounded-[50px] w-[50px] h-[50px]  flex items-center justify-center ' >
              <TruckLIcon />
            </div>
          </div>
        </CardAdmin>
        <CardAdmin>
          <div className='px-[20px] py-[30px] rounded-[15px] flex justify-between items-center ' >
            <div className='flex flex-col gap-[8px]' >
              <p className=' text-[14px] font-[400] ' >Monthly Sales</p>
              <p className='text-[22px] font-[500]' >400 <span className='text-[12px] font-[300]' >Units</span> </p>
            </div>
            <div className=' bg-[#F5F5F5] rounded-[50px] w-[50px] h-[50px]  flex items-center justify-center ' >
              <AvatarIconV />
            </div>
          </div>
        </CardAdmin>


      </div>
      <div className='flex flex-col gap-[13px]' >
        <CardAdmin>
          <div className='px-[20px] py-[30px] rounded-[15px] flex justify-between items-center ' >
            <div className='flex flex-col gap-[8px]' >
              <p className=' text-[14px] font-[400] ' >Daily Revenue</p>
              <p className=' text-[22px] font-[500] ' >7,903</p>
              <p className=' text-[12px] font-[300] ' >Based in your local time</p>
            </div>
            <div className=' bg-[#F5F5F5] rounded-[50px] w-[50px] h-[50px]  flex items-center justify-center ' >
              <DollarCardIcon />
            </div>
          </div>
        </CardAdmin>
        <CardAdmin>
          <div className='px-[20px] py-[30px] rounded-[15px] flex justify-between items-center ' >
            <div className='flex flex-col gap-[8px]' >
              <p className=' text-[14px] font-[400] ' >Cancelled Orders</p>
              <p className='text-[22px] font-[500]' > 300 <span className='text-[12px] font-[300]' >Units</span> </p>
            </div>
            <div className=' bg-[#F5F5F5] rounded-[50px] w-[50px] h-[50px]  flex items-center justify-center ' >
              <VisitorsIcon />
            </div>
          </div>
        </CardAdmin>


      </div>
    </section>

    <section className='grid grid-cols-6 gap-[27px] mt-[30px] ' >
      <div className='col-span-4' >
        <CardAdmin>
          <div className='px-[30px] py-[33.5px] ' >
            <p className='text-[22px] font-[500] mb-[34px] ' >Sale Report</p>
            <LineChart />

            <div className='flex gap-[70px] items-center text-[14px] font-[400] mt-[30px] ' >

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
          <div className='px-[30px] py-[33.5px] ' >
            <p className='text-[22px] font-[500] mb-[20px] ' >Order Review</p>
            <div className='w-[248px]' >
              <DoughnutChart />
            </div>

            <p className='text-[14px]  font-[400] ' >
              <DownloadIcon />
              Download Overall Report
            </p>
            <hr />
            <div className='grid grid-cols-2 gap-[44px] text-[13px] font-[400] ' >
              <div className='flex flex-col gap-[20px] ' >
                <span className='flex gap-[10px] items-center ' >
                  <div className='w-[15px] h-[15px] rounded-[50px] bg-[#50D7AB]' />
                  <p>Via Referral</p>
                </span>
                <span className='flex gap-[10px] items-center ' >
                  <div className='w-[15px] h-[15px] rounded-[50px] bg-[#88AAF3]' />
                  <p>Via Referral</p>
                </span>
                <span className='flex gap-[10px] items-center ' >
                  <div className='w-[15px] h-[15px] rounded-[50px] bg-[#9586CD]' />
                  <p>Via Referral</p>
                </span>
              </div>
              <div className='flex flex-col gap-[20px] ' >
                <span className='flex gap-[10px] items-center ' >
                  <div className='w-[15px] h-[15px] rounded-[50px] bg-[#A4D9E5]' />
                  <p>Via Referral</p>
                </span>
                <span className='flex gap-[10px] items-center ' >
                  <div className='w-[15px] h-[15px] rounded-[50px] bg-[#F3D676]' />
                  <p>Via Referral</p>
                </span>
                <span className='flex gap-[10px] items-center ' >
                  <div className='w-[15px] h-[15px] rounded-[50px] bg-[#ED9090]' />
                  <p>Via Referral</p>
                </span>
              </div>
            </div>
          </div>
        </CardAdmin>
      </div>
    </section>

    <section className='grid grid-cols-6 gap-[27px] mt-[30px] ' >
      <div className='col-span-4' >
        <CardAdmin>
          <div className='px-[30px] py-[33.5px] ' >
            <p className='text-[22px] font-[500] mb-[34px] ' >Sale Report</p>
            <LineChart2 />

            {/* <BarChart/> */}


          </div>
        </CardAdmin>
      </div>
      <div className='col-span-2' >
        <CardAdmin>
          <div className='px-[30px] py-[33.5px] ' >
            <p className='text-[22px] font-[500] mb-[14px] ' >Current User</p>
            <BarChart />
          </div>
        </CardAdmin>
      </div>
    </section>

    <section className='grid grid-cols-6 gap-[27px] mt-[30px] ' >
      <div className='col-span-4' >
        <CardAdmin>
          <div className='px-[30px] py-[33.5px] ' >
            <p className='text-[22px] font-[500] mb-[10px] ' >Purchased By Country</p>
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
              <p className='text-[22px] font-[500]  ' >Sold By Items</p>
              <div className=' flex items-center gap-[24px]' > <RefreshIcon /> <Dots3Icon />  </div>
            </div>

            {[...Array(10)].map((e, i) => (
              <>
                {i == 0 ? '' : <hr />}

                <div className={`flex items-center justify-between text-[14px]
                  ${i == 0 && "mt-[20px]"}
                 my-[15px] font-[400] `} >
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
            <p className='text-[22px] font-[500] mb-[10px] ' >Recent Orders</p>
          </div>
          <div className='px-[20px] ' >
            <GenericTable3
              data={recentOrdersTableData}
              columns={recentOrdersTableColumns}
            />
          </div>

        </div>
      </CardAdmin>
    </section>

    <section className='grid grid-cols-6 gap-[27px] mt-[30px] ' >
      <div className='col-span-2' >
        <CardAdmin>
          <div className='px-[30px] py-[33.5px] ' >
            <div className='flex items-center justify-between  mb-[10px]' >
              <p className='text-[22px] font-[500]  ' >New Customers</p>
              <div className=' flex items-center gap-[24px]' > <RefreshIcon /> <Dots3Icon />  </div>
            </div>

            {[...Array(10)].map((e, i) => (
              <>


                <div className={`flex items-center justify-between text-[14px]
                  ${i == 0 && "mt-[20px]"}
                 my-[15px] font-[400] `} >
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
              <p className='text-[22px] font-[500]  ' >New Customers</p>
              <div className=' flex items-center gap-[24px]' > <RefreshIcon /> <Dots3Icon />  </div>
            </div>

            {[...Array(6)].map((e, i) => (
              <>


                <div className={`flex items-center justify-between text-[14px]
                  ${i == 0 && "mt-[20px]"}
                 my-[15px] font-[400] `} >
                  <div className='flex gap-[15px] items-center ' >
                    <Image src={pinkShoesAvatar} />
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

export default index