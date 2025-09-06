import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import { useAuth } from '../../context/UserContext'
import dayjs from "dayjs"
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { Link } from 'react-router'
import TaskList from '../../components/TaskList'
import CustomPieChart from '../../components/charts/CustomPieChart'
import CustombarChart from '../../components/charts/CustombarChart'
import Loading from '../../components/Loading'
const COLORS = ["#8884d8", "#3de882ff", "#12ebbcff"];
const UserDashboard = () => {
  const { user } = useAuth()
  const [dashboardData, setDashboardData] = useState({})
  const [pieChartData, setPieChartData] = useState([])
  const [barChartData, setBarChartData] = useState([])
  const [loading, setLoading] = useState(false)


  const prepareChartData = (data) => {
    const statusData = [
      { status: "Pending", count: data.statistics.pendingTasks || 0 },
      { status: "In Progress", count: data.statistics.inProgressTasks || 0 },
      { status: "Completed", count: data.statistics.completedTasks || 0 },
    ]
    const prioritiesData = [
      { priority: "Low", count: data.priorities.Low || 0 },
      { priority: "Medium", count: data.priorities.Medium || 0 },
      { priority: "High", count: data.priorities.High || 0 }
    ]

    setPieChartData(statusData);
    setBarChartData(prioritiesData)



  }
  const getdashboardData = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_USER_DASHBOARD_DATA);
      setDashboardData(response.data)
      prepareChartData(response.data)
    } catch (error) {
      console.log("Error wile fetching user dashboard data", error);

      setLoading(false)
    } finally {
      setLoading(false)
    }

  }
  useEffect(() => {

    getdashboardData()
  }, [])
  if(loading) return <Loading/>
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='card'>
        <div className=''>
          <h2 className='text-gray-600 text-xl font-semibold '>Good Morning! {user?.name}</h2>
          <p className='text-sm text-gray-400 mt-1.5'>{dayjs().format("dddd D MMM YYYY")}</p>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 md:gap-6 mt-4 text-sm'>
          <div className='flex gap-2 md:gap-3 items-center'>
            <div className='w-2 h-2 bg-lime-500 rounded-full'></div>
            <span className='font-semibold'>
              {dashboardData.statistics?.all || 0}
            </span>
            Total Tasks
          </div>
          <div className='flex gap-3 items-center'>
            <div className='w-2 h-2 bg-primary rounded-full'></div>
            <span className='font-semibold'>
              {dashboardData.statistics?.pendingTasks || 0}
            </span>
            Pending Tasks
          </div>
          <div className='flex gap-3 items-center'>
            <div className='w-2 h-2 bg-lime-500 rounded-full'></div>
            <span className='font-semibold'>
              {dashboardData.statistics?.inProgressTasks || 0}
            </span>
            in Progress
          </div>
          <div className='flex gap-3 items-center'>
            <div className='w-2 h-2 bg-lime-500 rounded-full'></div>
            <span className='font-semibold'>
              {dashboardData.statistics?.completedTasks || 0}
            </span>
            Completed Tasks
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <div>
          <div className='card'>
            <h2 className='text-xl text-gray-800 font-medium mb-2'>Task Distributions</h2>
            <CustomPieChart COLORS={COLORS} data={pieChartData} />
          </div>

        </div>
        <div className='card'>
          <h2 className='text-xl text-gray-800 font-medium mb-2'>Task Priorities</h2>
          <CustombarChart data={barChartData} />
        </div>
        {/* recent tasks */}
        <div className=" card md:col-span-2">
          <div className='flex justify-between items-center'>
            <h2 className='text-gray-600 text-xl font-semibold'>Recent Tasks</h2>
            <Link to={`/admin/tasks`} className='text-sm text-gray-500 hover:text-primary hover:underline'>See all</Link>
          </div>
          <TaskList tableData={dashboardData?.recentTasks} />

        </div>
      </div>

    </DashboardLayout>
  )
}

export default UserDashboard