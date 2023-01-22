import React from "react";

const IconButton = ({ icon, color, className, onClick }) => {
  let colorClass = "bg-gray-300";
  if (color === "red") {
    colorClass = "bg-red-500";
  } else if (color === "blue") {
    colorClass = "bg-blue-500";
  }
  return (
    <button
      onClick={onClick}
      className={`${className} hover:shadow-lg hover:shadow-black/30 transition-all w-8 h-8 flex items-center justify-center text-white text-xl rounded-full ${colorClass}`}
      type="button"
    >
      {icon}
    </button>
  );
};

export default IconButton;
