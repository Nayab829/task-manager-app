import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import Loading from '../../components/Loading'

const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get(API_PATHS.AUTH.GET_ALL_USERS);
      if (response.data.length > 0) {
        setAllUsers(response.data);

      }

    } catch (error) {
      console.log(error.response?.message || error.message);
      setLoading(false)
    } finally {
      setLoading(false)

    }
  }
  useEffect(() => {
    fetchUsers()
  }, [])
  if(loading) return <Loading/>
  return (
    <DashboardLayout activeMenu="Manage Users">
      <div className='p-4'>
        <h2 className='text-xl'>Manage Users</h2>
        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3">
          {allUsers.map((user, index) => {
            return <div key={index} className='card m-0 flex  justify-center flex-col gap-4'>
              <div className='flex items-center gap-3'>
                <img src={user?.avatar || null} alt={user.name} className='w-10 h-10 rounded-full' />
                <div className='flex flex-col'>
                  <span className=' font-semibold text-gray-800 capitalize'>{user.name}</span>
                  <span className='text-sm text-gray-500'>{user.email}</span>
                </div>

              </div>
              <div className='flex items-center gap-2'>
                <div className='bg-violet-50 text-sm font-semibold text-violet-500 flex flex-col py-2 px-4 items-center justify-center rounded-lg'>{user.pendingTasks} <span>Pending</span></div>
                <div className='bg-cyan-50 text-sm font-semibold text-cyan-500 flex flex-col py-2 px-4 items-center justify-center rounded-lg'>{user.inProgressTasks} <span className='text-nowrap'>In-Progress</span></div>
                <div className='bg-green-50 text-sm font-semibold text-green-500 flex flex-col py-2 px-4 items-center justify-center rounded-lg'>{user.completedTasks} <span>Completed</span></div>
              </div>
            </div>
          })}
        </div>
      </div>

    </DashboardLayout>
  )
}

export default ManageUsers
