import { FaUsers, FaUserPlus } from 'react-icons/fa'
import { NavLink, useLocation } from 'react-router-dom'
import { FaUserGear } from 'react-icons/fa6'
import { MdDashboard, MdOutlineSettings } from 'react-icons/md'

import carVerificationIcon from '../../../assets/car-verify-ison.svg'
import { useState } from 'react'
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiLogoutCircleLine,
} from 'react-icons/ri'

const Sidebar = () => {
  const location = useLocation()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const settings = [
    {
      name: 'Privacy Policy',
      link: '/settings/privacy-policy',
    },

    {
      name: 'Terms & condition',
      link: '/settings/terms-and-condition',
    },

    { name: 'Profile', link: '/settings/profile' },
  ]

  const dashBoard = {
    name: 'Dashboard',
    link: '/',
    icon: <MdDashboard />,
  }
  const logout = {
    name: 'Log out',
    link: '/login',
    icon: <RiLogoutCircleLine />,
  }

  const menuItems = [
    {
      name: 'User Management',
      link: '/user-management',
      icon: <FaUserGear />,
    },
  ]
  const isSettingsActive = location.pathname.includes('/settings')

  return (
    <div className=" w-[300px] h-[96vh] overflow-y-scroll px-3">
      <div>
        <img
          src={carVerificationIcon}
          alt="car-verification-icon"
          className="mx-auto w-[150px]"
        />
      </div>

      <ul className="mt-10">
        {/* Dashboard */}
        <NavLink
          to={dashBoard?.link}
          className={({ isActive }) =>
            `flex items-center py-3 rounded-3xl my-1 pl-6 hover:bg-[#FDC105] cursor-pointer hover:text-black ${
              isActive ? 'bg-[#FDC105] text-black' : ''
            }`
          }
        >
          <span className="mr-4 text-xl">{dashBoard.icon}</span>
          <span>{dashBoard.name}</span>
        </NavLink>

        {/* Remaining menu items */}
        {menuItems.map((item, index) => (
          <NavLink
            to={item?.link}
            key={`remaining-${index}`}
            className={({ isActive }) =>
              `flex items-center py-3 rounded-3xl my-1 pl-6 hover:bg-[#FDC105] cursor-pointer hover:text-black ${
                isActive ? 'bg-[#FDC105] text-black' : ''
              }`
            }
          >
            <span className="mr-4 text-xl">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}

        {/* Settings */}
        <li className="my-1">
          <div
            className={`flex items-center justify-between py-3 rounded-3xl pl-6 cursor-pointer ${
              isSettingsActive
                ? '!bg-[#FDC105] !text-black '
                : 'hover:!bg-[#FDC105] hover:!text-black '
            }`}
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          >
            <div className="flex items-center">
              <span className="mr-4 text-xl">
                <MdOutlineSettings />
              </span>
              <span>Settings</span>
            </div>
            <span className="mr-4">
              {isSettingsOpen ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
            </span>
          </div>

          {isSettingsOpen && (
            <div className="ml-4">
              {settings.map((subItem, idx) => (
                <NavLink
                  key={idx}
                  to={subItem.link}
                  className={({ isActive }) =>
                    `flex items-center py-2 px-6 my-1 rounded-xl hover:!bg-[#FDC105] hover:text-black text-white
                      ${isActive ? '!bg-[#FDC105] !text-black' : ' text-white'}`
                  }
                >
                  <span className="ml-6">{subItem.name}</span>
                </NavLink>
              ))}
            </div>
          )}
        </li>

        <NavLink
          to={logout?.link}
          className={({ isActive }) =>
            `flex items-center py-3 rounded-3xl my-1 pl-6 hover:bg-[#FDC105] cursor-pointer hover:text-black ${
              isActive ? 'bg-[#FDC105] text-black' : ''
            }`
          }
          onClick={() => localStorage.clear()}
        >
          <span className="mr-4 text-xl">{logout.icon}</span>
          <span>{logout.name}</span>
        </NavLink>
      </ul>
    </div>
  )
}

export default Sidebar
