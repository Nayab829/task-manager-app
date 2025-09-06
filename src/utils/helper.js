export const getStatusbadgeColor = (status) => {
    switch (status) {
        case "Completed": return "bg-green-100 border border-green-200 text-green-500";
        case "In-Progress": return "bg-cyan-100 border border-cyan-200 text-cyan-500";
        case "Pending": return "bg-purple-100 border border-purple-200 text-purple-500";
        default: return "bg-gray-100 text-gray-500 border border-gray-200"
    }

}
export const getProgressColor = (status) => {
    switch (status) {
        case "Completed": return "bg-green-500";
        case "In-Progress": return "bg-cyan-500";
        case "Pending": return "bg-purple-500";
        default: return "bg-gray-500"
    }

}

export const getPriorityBadgeColor = (priority) => {
    switch (priority) {
        case "High": return "bg-red-100 border border-red-200 text-red-500";
        case "Medium": return "bg-orange-100 border border-orange-200 text-orange-500";
        case "Low": return "bg-green-100 border border-green-200 text-green-500";
        default: return "bg-gray-100 text-gray-500 border border-gray-200"
    }
}

export function isEmailValid(email) {
  if (typeof email !== 'string') return false;
  email = email.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}