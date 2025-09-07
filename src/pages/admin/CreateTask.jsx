import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import { PRIORITY_DATA } from '../../utils/data'
import TodoChecklistInput from '../../components/inputs/TodoChecklistInput'
import { useLocation, useNavigate, useParams } from 'react-router'
import axios from 'axios'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { LuTrash2 } from 'react-icons/lu'
import SelectUsers from '../../components/inputs/SelectUsers'
import { toast } from 'react-toastify'

const CreateTask = () => {
  const navigate = useNavigate()
  const location = useLocation()
  // const { taskId } = location.state || {};
  const {taskId} = useParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
    assignedTo: [],
    todoCheckList: []
  })

  const handleChange = (name, value) => {
    setTaskData((prev) => ({ ...prev, [name]: value }))

  }
  const clearTaskData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: "",
      assignedTo: [],
      todoCheckList: []
    })
  }
  const createTask = async () => {
    setLoading(true)
    try {
      await axiosInstance.post(API_PATHS.TASKS.CREATE, {
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority,
        dueDate: taskData.dueDate,
        assignedTo: Array.isArray(taskData.assignedTo)
          && taskData.assignedTo.map((user) => user?._id),
        todoCheckList: taskData.todoCheckList

      })
      clearTaskData()
      toast.success("Task created successfully!");
      navigate("/admin/tasks")

    } catch (error) {
      console.log("Error while creating task", error.response?.data?.message || error.message);
      toast.error(error.message || "Something went wrong while creating task.")

    } finally {
      setLoading(false)
    }
  }
  const updateTask = async () => {

    setLoading(true)
    try {
      await axiosInstance.put(API_PATHS.TASKS.UPDATE(taskId), {
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority,
        dueDate: taskData.dueDate,
        assignedTo: Array.isArray(taskData.assignedTo)
          && taskData.assignedTo.map(user => user._id),
        todoCheckList: taskData.todoCheckList.map(item => ({
          text: item.text,
          completed: item.completed
        }))

      })
      clearTaskData()
      toast.success("Task updated successfully.")
      navigate("/admin/tasks")

    } catch (error) {
      console.log("Error while updating task", error.response?.message || error.message);
      toast.error(error.message || "Something went wrong while updating task.")

    } finally {
      setLoading(false)

    }
  }
  const handleSubmit = () => {
    setError(null)
    if (!taskData.title.trim()) {
      setError("Title is required")
      return;
    }
    if (!taskData.description.trim()) {
      setError("Description is required")
      return;
    }
    if (!taskData.dueDate) {
      setError("Due Date is required")
      return;
    }
    if (!taskData.assignedTo || taskData.assignedTo.length === 0) {
      setError("Select at least one assignee")
      return;
    }
    if (!taskData.todoCheckList || taskData.todoCheckList.length === 0) {
      setError("Add at least one todo")
      return;
    }
    if (taskId) {
      updateTask()
      return
    }
    createTask()

  }
  const getTaskById = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_BY_ID(taskId))
      const currTask = response.data;
      console.log(response.data);

      setTaskData({
        title: currTask.title,
        description: currTask.description,
        priority: currTask.priority,
        dueDate: new Date(currTask.dueDate).toISOString().split("T")[0],
        assignedTo: currTask.assignedTo.map((user) => (
          {
            _id: user._id,
            name: user.name,
            avatar: user.avatar
          }

        )),
        todoCheckList: currTask.todoCheckList
      })
    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false)
    }
  }
  const deleteTask = async () => {
    try {
      setLoading(true)
      await axiosInstance.delete(API_PATHS.TASKS.DELETE(taskId))
      toast.success("Task deleted successfully.")
      navigate("/admin/tasks")

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong while deleting task.");

    } finally {
      setLoading(false)
    }
  }
  console.log("taskId", taskId);

  useEffect(() => {
    if (taskId) {
      getTaskById()


    }
  }, [taskId]);

  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="card grid grid-cols-1 md:grid-cols-4 ">
        {/* header */}
        <div className='col-span-3 flex items-center justify-between'>
          <h1 className='text-xl text-gray-800'>{taskId ? "Update Task" : "Create Task"}</h1>
          {taskId && <button
            onClick={deleteTask}
            className='text-red-500  flex items-center text-sm gap-1.5 bg-red-50 px-4 py-1 border border-red-200 rounded-md outline-none cursor-pointer'
          > <LuTrash2 />Delete </button>}
        </div>
        <div className='md:col-span-3 mt-4'>
          <div className='mt-4 '>
            <label className='text-sm text-gray-700 font-semibold'>Task Title</label>
            <input
              type="text"
              value={taskData.title}
              required
              onChange={(e) => handleChange("title", e.target.value)}
              className='form-input'
              placeholder="Create App UI" />
          </div>
          <div className='mt-4 '>
            <label className='text-sm text-gray-700 font-semibold'>Description</label>
            <textarea
              type="text"
              value={taskData.description}
              required
              rows={3}
              onChange={(e) => handleChange("description", e.target.value)}
              className='form-input resize-none'
              placeholder="Describe Task" />
          </div>
          <div className='grid grid-cols-12 gap-3'>

            <div className='col-span-6 md:col-span-4'>
              <label className='text-sm text-gray-700 font-semibold'>Priority</label>
              <select
                className='form-input'
                value={taskData.priority}
                name='priority'
                onChange={(e) => handleChange("priority", e.target.value)}
              >
                {PRIORITY_DATA.map((priority) => {
                  return <option key={priority.value} value={priority.label}>{priority.label}</option>
                })}
              </select>
            </div>
            <div className='col-span-6 md:col-span-4'>
              <label className='text-sm text-gray-700 font-semibold'>Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={taskData?.dueDate}
                onChange={(e) => handleChange("dueDate", e.target.value)}
                className='form-input'
              />
            </div>
            <div className='col-span-12 md:col-span-4'>
              <label className='text-sm text-gray-700 font-semibold'>Assign To</label>
              <SelectUsers
                selectedUser={taskData.assignedTo}
                setSelectedUser={(value) => handleChange("assignedTo", value)}
              />
            </div>
          </div>
          <div className="mt-3">
            <label className='text-sm text-gray-700 font-semibold'>TODO Checklist</label>
            <TodoChecklistInput
              todoList={taskData.todoCheckList}
              setTodoList={(value) => handleChange("todoCheckList", value)}
            />
          </div>
          {error && <p className='text-sm text-red-500'>{error}</p>}
          <button
            disabled={loading}
            onClick={handleSubmit}
            className='bg-primary text-white px-5 py-1.5 rounded-lg font-semibold cursor-pointer hover:bg-primary/90 transition-all mt-2 w-full'>
            {taskId ? "Update Task" : "Create Task"}
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CreateTask