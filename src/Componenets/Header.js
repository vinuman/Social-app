import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className=" fixed w-[100%] bg-[#F05A22] h-[4rem] flex items-center  px-8 ">
        <h2 className=" text-white font-bold text-2xl mr-10">TravelMedia.in</h2>
        <nav>
          <NavLink className="text-white text-2xl" to="/">
            Home
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Header;
