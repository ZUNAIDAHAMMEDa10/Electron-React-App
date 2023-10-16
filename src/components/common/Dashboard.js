import React, { useState, useMemo, useCallback } from "react";
import { AiOutlineArrowLeft, AiOutlineDashboard } from "react-icons/ai";
import { FcAbout } from "react-icons/fc";
import { RiCalendarTodoFill } from "react-icons/ri";
import { GoSignOut } from "react-icons/go";
import { NavLink, Routes, Route } from "react-router-dom";
import About from "../../pages/About";
import AdminDashbord from "../../pages/AdminDashbord";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const [no, setNo] = useState(1);

  // Memoize the Menus array to prevent unnecessary re-renders
  const Menus = useMemo(
    () => [
      {
        title: "Dashboard",
        path: "/",
        icon: <AiOutlineDashboard size={25} />,
        key: 1,
      },
      {
        title: "About",
        path: "/About",
        icon: <FcAbout size={25} />,
        key: 2,
      },
    ],
    []
  );

  // Memoize the userSignout function to prevent unnecessary re-renders
  const userSignout = useCallback(() => {
    signOut(auth)
      .then(() => {
        console.log("Log Out successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigatePath = (path) => {
    switch (path) {
      case "Dashboard":
        setNo(1);
        break;
      case "About":
        setNo(2);
        break;

      default:
        setNo(1);
        break;
    }
  };

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5 lg:max-h-full lg:min-h-full md:max-h-[800px] md:min-h-[770px] pt-8 relative duration-300`}
      >
        <AiOutlineArrowLeft
          color="white"
          className={`absolute cursor-pointer bg-dark-purple -right-3 top-9 w-7 h-7 border-dark-purple border-2 rounded-full ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
          alt=""
        />
        <div className="flex gap-x-4 items-center">
          <RiCalendarTodoFill
            size={open ? 25 : 0}
            className={`cursor-pointer duration-1000 invert ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium ${
              open ? "text-xl " : "text-sm"
            } duration-200 ${!open && "scale-0"}`}
          >
            To Do App
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu) => (
            <div key={Menu.key}>
              <NavLink to={Menu.path}>
                <li
                  onClick={() => navigatePath(Menu.title)}
                  className={`flex rounded-md p-2 mt-1 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ${
                    (Menu.path === window.location.pathname
                      ? "bg-light-white"
                      : "",
                    console.log(Menu.path))
                  }  `}
                >
                  {Menu.icon}
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {Menu.title}
                  </span>
                </li>
              </NavLink>
            </div>
          ))}
          <li
            onClick={userSignout}
            className={`flex rounded-md p-2 mt-1 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}
          >
            <GoSignOut size={25} />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Sign Out
            </span>
          </li>
        </ul>
      </div>
      <div className="h-screen flex-1 p-7">
        <Routes>
          <Route path="/" element={<AdminDashbord />} />
          <Route path="/About" element={<About />} />
          <Route
            path="*"
            element={no === 1 ? <AdminDashbord /> : <About />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
