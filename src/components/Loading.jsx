import React from "react";

const Loading = ({ size = "lg", color = "border-blue-500" }) => {
  

  return (
   <div className="fixed inset-0 z-[999] bg-gray-100/50 flex items-center justify-center">
     <div
      className={`animate-spin rounded-full border-t-transparent w-12 h-12 border-4 border-primary`}
    />
   </div>
  );
};

export default Loading;
