import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.js";

import profile from "../../assets/profile.png";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import toast from "react-hot-toast";

import useUserDetail from "../../hooks/useUserDetail";

export default function Header({ header }) {
  const [drop, setDrop] = useState(false);
  const [userDetail, setUserDetail] = useState();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { getUserDetail } = useUserDetail();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserDetail();
        setUserDetail(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      // Firebase logout
      await signOut(auth);

      // Close dropdown
      setDrop(false);

      // Optional: remove old authentication data
      localStorage.removeItem("authToken");
      localStorage.removeItem("riderId");

      toast.success("Logged out successfully");

      // Redirect to login
      navigate("/login");
    } catch (error) {
      console.error("Firebase logout error:", error);

      toast.error("Error logging out. Please try again.");
    }
  };

  return (
    <div>
      <div className="bg-white">
        <nav className="text-black">
          <div className="max-w-screen-2xl flex lg:gap-0 gap-6 flex-wrap items-center justify-between px-4 py-3 sm:px-8 sm:py-4">

            <div className="relative xl:w-3/4">
              {/* Header content */}
            </div>

            <div
              className="relative xl:w-1/4 flex justify-end"
              id="navbar-default"
            >
              <div className="flex flex-row items-center">
                <button
                  type="button"
                  className="flex text-sm rounded-full md:mr-0"
                  onClick={() => setDrop((prev) => !prev)}
                >
                  <div className="flex items-center text-sm drop-shadow-lg">
                    <img
                      className="rounded-full drop sm:mr-2 w-9 h-9 object-cover"
                      src={userDetail?.profilePicture || profile}
                      alt="profile"
                    />

                    <div>
                      <span className="hidden sm:block text-start">
                        {userDetail?.username}
                      </span>

                      <p className="mt-1 text-red-120">
                        {userDetail?.email}
                      </p>
                    </div>

                    <MdOutlineKeyboardArrowDown className="h-6 w-6" />
                  </div>
                </button>
              </div>

              {/* Dropdown */}
              <div
                className={`absolute right-0 top-full mt-3 z-50 ${drop ? "block" : "hidden"
                  } w-40 sm:w-48 rounded-lg bg-white shadow-lg border border-gray-100`}
              >
                <ul className="py-2">
                  <li>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="block w-full px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                    >
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}