import React from 'react'
import Header from '../Header/Header'
import { Outlet} from 'react-router-dom'
import Footer from '../Footer/Footer'


function Layout() {
	
  return (
	<>
	<div className='flex flex-col min-h-screen'>
		<div><Header/></div>
		<div className='flex-grow'><Outlet/></div>
		<div><Footer/></div>	
	</div>
	</>
  );
}

export default Layout