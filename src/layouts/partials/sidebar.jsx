
import { RiCloseFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { NavLink } from "react-router-dom";
import { useState } from 'react'
import { MdOutlineDashboard } from "react-icons/md";
import logo from "../../assets/logo.jpeg"
export default function Sidebar() {
  const [showMenue, setShowMenue] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  return (
    <>
      <div className='bg-white'>
        <button type="button" onClick={e => setShowMenue(true)} className="flex items-center p-2 ml-3 border-0 text-sm text-red-110 rounded-lg lg:hidden">
          <span className="sr-only">Open sidebar</span>
          <svg className="w-6  h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
          </svg>
        </button>
      </div>

      <aside className={`fixed top-0 left-0 z-40 w-64 bg-white h-screen ${showMenue ? null : `hidden`} lg:block`} aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto font-sans">
          {showMenue &&
            <button className='float-right text-xl text-red-110 ' onClick={e => setShowMenue(false)}>
              <RiCloseFill />
            </button>
          }
          <ul className="space-y-4 font-normal text-base">
            <li className='py-3 pb-6'>
              <Link to='/' className="flex items-center justify-center py-2 px-5 rounded-lg">
                <img src={logo} alt='....' className='object-cover h-24 w-24' />
              </Link>
            </li>
            <li onClick={e => setShowMenue(pre => false)}>
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  isActive ? "flex items-center py-3 px-5 bg-red-110 rounded-lg text-white  font-semibold"
                    :
                    "flex items-center py-3 px-5 text-red-120 rounded-lg hover:bg-white hover:text-red-110  hover:font-medium"
                }
              >
                <MdOutlineDashboard className='h-6 w-6'/>
                <span className="flex-1 ml-3 whitespace-nowrap">Responses</span>
              </NavLink>
            </li>
           
          </ul>

        </div>
      </aside>

    </>
  )
}
