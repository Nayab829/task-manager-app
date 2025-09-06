export const BASE_URL = "http://localhost:3000"
export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/users/register",
        LOGIN: "/api/users/login",
        GET_PROFILE: "/api/users/profile",
        GET_ALL_USERS: "/api/users",
        GET_USER_BY_ID: (id)=> `/api/users/${id}`,
    },
    TASKS: {
        CREATE: "/api/tasks",
        GET_ALL_TASKS: "/api/tasks",
        GET_BY_ID: (id) => `/api/tasks/${id}`,
        DELETE: (id) => `/api/tasks/${id}`,
        UPDATE: (id) => `/api/tasks/${id}`,
        UPDATE_STATUS: (id) => `/api/tasks/${id}/status`,
        UPDATE_TODO_CHECKLIST: (id) => `/api/tasks/${id}/todo`,
        GET_DASHBOARD_DATA: "/api/tasks/dashboard-data",
        GET_USER_DASHBOARD_DATA: "api/tasks/user-dashboard-data"
    }

}