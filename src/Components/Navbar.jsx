import { Bell, ChevronDown, Search } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    navigate("/login");
  };
  return (
    <div>
      <nav className=" flex justify-between items-center bg-white  fixed w-282 right-0 vendnav h-15">
        <div className="realtive ml-5">
          <input
            type="text"
            className="w-full border text-black border-gray-400 pl-7 rounded-2xl py-1 outline-none font-bold font-lead-font "
            placeholder="search"
          />
          <Search className="absolute top-5 ml-2" size={18} />
        </div>

        <div className="flex gap-6 justify-between items-center relative">
          <div className="flex bg-gray-50 px-2 py-2 rounded-full relative border border-blue-950 cursor-pointer">
            <Bell />
            <span className=" absolute right-2 bg-orange-500 text-orange-500 w-2 h-2 rounded-full"></span>
          </div>
          <span className="bg-[#0F123F] text-white py-3 px-3 font-lead-font font-bold rounded-full">
            MC
          </span>
          <div
            className="flex mr-4 cursor-pointer"
            onClick={() => setShow(!show)}
          >
            <h1 className="font-bold vendortag text-black ">Vendor</h1>
            <ChevronDown
              className="cursor-pointer font-bold mt-0.5"
              color="black"
            />
          </div>
          <div
            className={
              show
                ? "bg-yellow-700 flex-col gap-2 items-center hidden cursor-pointer w-30 rounded absolute right-1 top-9 border h-30"
                : "bg-yellow-700 text-white flex-col gap-2 items-center flex cursor-pointer w-30 rounded absolute right-1 top-9 border h-30"
            }
          >
            <p className="hover:bg-black rounded px-2 py-2">Verify Account</p>
            <p className="hover:bg-black rounded px-2 ">Verify Account</p>
            <p
              className="hover:bg-black rounded px-2 w-[100%]"
              onClick={logOut}
            >
              Sign Out
            </p>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
