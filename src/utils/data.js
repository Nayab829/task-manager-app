import { LuClipboardCheck, LuLayoutDashboard, LuLogOut, LuSquarePlus, LuUsers } from "react-icons/lu"
export const SIDE_MENU__DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/admin/dashboard"
    },
    {
        id: "02",
        label: "Manage Tasks",
        icon: LuClipboardCheck,
        path: "/admin/tasks"
    },
    {
        id: "03",
        label: "Create Task",
        icon: LuSquarePlus,
        path: "/admin/create-task"
    },
    {
        id: "04",
        label: "Manage Users",
        icon: LuUsers,
        path: "/admin/users"
    },
    {
        id: "05",
        label: "Logout",
        icon: LuLogOut,
        path: "/logout"
    }
]
export const SIDE_MENU__DATA_USERS = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/user/dashboard"
    },
    {
        id: "02",
        label: "My Tasks",
        icon: LuClipboardCheck,
        path: "/users/tasks"
    },
   
    {
        id: "03",
        label: "Logout",
        icon: LuLogOut,
        path: "/logout"
    }
]

export const PRIORITY_DATA =[
    {label:"Low",value:"low"},
    {label:"Medium",value:"medium"},
    {label:"High",value:"high"},
]