import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import { getStatusbadgeColor } from '../../utils/helper';
import dayjs from 'dayjs';
import AvatarGroup from '../../components/AvatarGroup';
import Loading from '../../components/Loading';

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState()
  const [loading, setLoading] = useState(false)

  const getTaskById = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_BY_ID(id));
      const taskInfo = response?.data;
      setTask(taskInfo)
    } catch (error) {
      console.log("Error wile fetching task");
      setLoading(false)
    } finally {
      setLoading(false)
    }


  }
  const toggleStatus = async (index) => {
    if (!task) return;


    const updatedTodos = [...task.todoCheckList];
    if (updatedTodos && updatedTodos[index]) {
      updatedTodos[index].completed = !updatedTodos[index].completed;
      //      // 🔹 update UI instantly
      setTask({ ...task, todoCheckList: updatedTodos });

    }
    try {
      setLoading(true)
      const res = await axiosInstance.put(
        API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(task._id),
        { todoCheckList: updatedTodos }
      );
      if (res.status === 200) {
        // server returns updated task with new status
        setTask(res.data.task);
      }
      else {
        updatedTodos[index].completed = !updatedTodos[index].completed
      }

    } catch (err) {
      updatedTodos[index].completed = !updatedTodos[index].completed;
      setLoading(false)

    } finally {
      setLoading(false)
    }
  };
  useEffect(() => {
    getTaskById()
  }, [id])
  if(loading) return <Loading/>
  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className='grid grid-cols-1 md:grid-cols-4'>
        {task && (
          <div className='col-span-3 card'>
            <div className='flex justify-between items-center'>
              <h2 className='text-base md:text-xl font-medium'>{task?.title}</h2>
              <div className={`text-sm px-2 py-0.5 rounded ${getStatusbadgeColor(task.status)}`}>
                {task.status}
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-12'>
              <div className='col-span-10'>
                <InfoCard label="Description" value={task.description} />
              </div>
              <div className='col-span-6  mt-2'>
                <InfoCard label="Priority" value={task.priority} />
              </div>
              <div className='col-span-6  mt-2 '>
                <InfoCard label="Due date" value={task.dueDate ? dayjs(task.dueDate).format("D MMM YYYY") : "N/A"} />
              </div>
              <div className='col-span-6 md:col-span-4 mt-2'>
                <label className='text-[12px] md:text-[13px] text-gray-500'>Assigned To</label>
                <AvatarGroup avatars={task.assignedTo.map((user) => user.avatar)} maxVisible={3} />
              </div>


            </div>
            <div className='mt-4'>
              <label className='text-[12px] md:text-[13px] text-gray-500'>Todo Checklist</label>
              {task.todoCheckList?.map((todo, index) => {
                return <div key={index} className='flex items-center gap-3 mt-2'>
                  <input
                    type="checkbox"
                    className='w-4 h-4 bg-gray-200 border border-gray-200/20 outline-none'
                    checked={todo.completed}
                    onChange={() => toggleStatus(index)} />
                  <p className='text-sm'>{todo.text}</p>
                </div>
              })}
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  )
}

export default TaskDetails

const InfoCard = ({ label, value }) => {
  return <div>
    <label className='text-[12px] md:text-[13px] text-gray-500'>{label}</label>
    <p className='text-sm text-gray-600'>{value}</p>
  </div>
}