import React from 'react'
import {  NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faClockRotateLeft, faComments, faGamepad, faGem, faNewspaper, faTableCells, faUser } from '@fortawesome/free-solid-svg-icons'

function AdminSideBar() {
  const navItems=[
		{link:"Dashboard", path:"/Admin/Dashboard", icon: faChartLine},
    {link:'Section Management', path:"/Admin/Section", icon: faTableCells},
		{link:"Game Management", path:"/Admin/Game", icon: faGamepad},
		{link:"News Management", path:"/Admin/News", icon: faNewspaper},
		{link:"User Details", path:"/Admin/User", icon: faUser},
		{link:"Payment Details", path:"/Admin/PaymentDetails", icon: faClockRotateLeft},
		{link:"Genre", path:"/Admin/Genre", icon: faGem},
	]
  return (
	<>
  <div className='bg-[#18181C] h-[100vh] hidden md:block bottom-0 top-0 px-5'>
    <div>
      <p className='text-teal-400 text-2xl font-bold'>Admin Panel</p>
    </div>
    <div className='text-white mt-4'>
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

