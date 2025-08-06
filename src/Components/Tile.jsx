import React from "react";

const Tile = ({ title, value, icon }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4 border border-gray-200 cursor-pointer hover:scale-105  transition duration-500 ">
      {icon && <div className="text-3xl text-blue-500">{icon}</div>}
      <div className="flex flex-col">
        <h4 className="text-sm text-gray-500 font-medium lg:whitespace-nowrap">
          {title}
        </h4>
        <p className="text-xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default Tile;
