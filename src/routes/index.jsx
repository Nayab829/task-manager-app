import DashboardLayout from "../components/Layouts/DashboardLayout";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import { createBrowserRouter } from "react-router"
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/admin/Dashboard";
import ManageTasks from "../pages/admin/ManageTasks";
import CreateTask from "../pages/admin/CreateTask";
import ManageUsers from "../pages/admin/ManageUsers";
import UserDashboard from "../pages/user/UserDashboard";
import MyTasks from "../pages/user/MyTasks";
import TaskDetails from "../pages/user/TaskDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element:<PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>,
    children: [
      { index: true, element: <Dashboard /> }, // 👈 default route
      { path: "/admin/dashboard", element: <Dashboard /> },
      { path: "/admin/tasks", element: <ManageTasks /> },
      { path: "/admin/create-task", element: <CreateTask /> },
      { path: "/admin/users", element: <ManageUsers /> },
      { path: "/user/dashboard", element: <UserDashboard /> },
      { path: "/users/tasks", element: <MyTasks /> },
      { path: "/task-details/:id", element: <TaskDetails /> }

    ]
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  },

])