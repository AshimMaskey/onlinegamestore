import React from 'react'
import {  NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faClockRotateLeft, faComments, faGamepad, faNewspaper, faUser } from '@fortawesome/free-solid-svg-icons'

function AdminSideBar() {
  const navItems=[
		{link:"Dashboard", path:"/Admin/Dashboard", icon: faChartLine},
		{link:"Game Management", path:"/Admin/Game", icon: faGamepad},
		{link:"News Management", path:"/Admin/News", icon: faNewspaper},
		{link:"User/Admin", path:"/Admin/User", icon: faUser},
		{link:"History", path:"/Admin/History", icon: faClockRotateLeft},
		{link:"Reviews", path:"/Admin/reviews", icon: faComments},
	]
  return (
	<>
  <div className='bg-[#18181C] h-[100vh] sticky bottom-0 top-0 px-5 py-5'>
    <div>
      <p className='text-teal-400 text-2xl font-bold text-center'>Admin Panel</p>
    </div>
    <div className='text-white mt-10'>
      <ul>
        <li className='flex flex-col '>
       {
        navItems.map(({link,path,icon})=><NavLink className={({isActive}) => `font-thin hover:text-teal-300 duration-200 mb-3 ${isActive ? 'text-teal-300' : ''}`} to={path}> <FontAwesomeIcon className='mr-2' icon={icon} />{link}</NavLink>)
       }
       </li>
      </ul>
   
    </div>
  </div>
  </>
  )
}

export default AdminSideBar

