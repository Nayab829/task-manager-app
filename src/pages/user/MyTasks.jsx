import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import TaskCard from '../../components/Cards/TaskCard'
import { useNavigate } from 'react-router'
import Loading from '../../components/Loading'

const ManageTasks = () => {
  const [allTasks, setAllTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [filterStatus, setFilterStatus] = useState("All")
  const [tabs, setTabs] = useState([])
  const navigate = useNavigate()
  const fetchAllTasks = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
        params: {
          status: filterStatus === "All" ? "" : filterStatus
        }
      });
      setAllTasks(response.data.tasks)
      const statusArray = [
        { status: "All", count: response.data.statusSummary.all || 0 },
        { status: "Pending", count: response.data.statusSummary.pendingTasks || 0 },
        { status: "In-Progress", count: response.data.statusSummary.inProgressTasks || 0 },
        { status: "Completed", count: response.data.statusSummary.completedTasks || 0 },
      ]
      setTabs(statusArray)
    } catch (error) {
      console.log("Error while fetching tasks", error);
      setLoading(false)
    } finally {
      setLoading(false)
    }


  }
  const handleClick = (id) => {
    navigate(`/task-details/${id}`)
  }
  useEffect(() => {
    fetchAllTasks()
  }, [filterStatus])
  if (loading) return <Loading />
  return (
    <DashboardLayout activeMenu="My Tasks">

      <div className='mt-5 px-3'>
        <div className='flex items-center justify-between flex-col md:flex-row gap-3'>
          <h2 className='text-xl'>My Tasks</h2>
          <div className='flex flex-wrap gap-1.5 '>
            {tabs.map((tab, index) => {
              return <button key={index}
                onClick={() => { setFilterStatus(tab.status) }}
                className={`text-sm px-4 py-1.5 cursor-pointer mb-1.5 ${filterStatus === tab.status ? "bg-blue-50 border-b-2 text-blue-500 border-b-blue-500  " : "bg-white"}`}>

                {tab.status}
                <span className={`ml-1.5 text-xs font-semibold ${filterStatus === tab.status ? "bg-blue-500 text-white py-0.5 px-1.5 rounded-full" : "bg-white"}`}>{tab.count}</span></button>
            })}
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {Array.isArray(allTasks) && allTasks.length > 0 ? (
            allTasks.map((task) => (
              <TaskCard task={task} key={task._id} onClick={() => handleClick(task._id)} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 mt-10">
              No tasks available.
            </p>
          )}
        </div>


      </div>


    </DashboardLayout>
  )
}

export default ManageTasks