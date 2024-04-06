import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Components/Layout/Layout.jsx'
import Home from './Components/Home/Home.jsx'
import Store from './Components/Store/Store.jsx'
import Signin from './Components/Signin_Signup/Signin.jsx'
import Signup from './Components/Signin_Signup/Signup.jsx'
import View from './Components/Signin_Signup/view.jsx'
import LayoutAdmin from './Components/Layout/LayoutAdmin.jsx'
import AdminSignin from './Components/Admin/AdminSignin.jsx'
import AdminSignup from './Components/Admin/AdminSignup.jsx'
import AdminHome from './Components/Admin/AdminHome.jsx'
import AdminContextProvider from './Components/Context/AdminContextProvider.jsx'
import AdminDashboard from './Components/Admin/AdminDashboard.jsx'
import AdminNews from './Components/Admin/AdminNews.jsx'
import News from './Components/News/News.jsx'



const router=createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home />}/>
      <Route path='/Store'  element={<Store />}/>
      <Route path='/View' element={<View />}/>      
      <Route path='/Signin'  element={<Signin />}/>
      <Route path='/Signup' element={<Signup />}/>
      <Route path='/News' element={<News />}/>
    </Route>
    
      <Route path='/Admin' element={<LayoutAdmin/>}>
        <Route path='/Admin/Dashboard' element={<AdminDashboard/>}/>  
        <Route path='/Admin/User' element={<AdminHome/>}/>
        <Route path='/Admin/News' element={<AdminNews/>}/>
      </Route>
      <Route path='/Admin/Signup' element={<AdminSignup/>}/>
      <Route path='/Admin/Signin' element={<AdminSignin/>}/>   
    </> 
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdminContextProvider>
      <RouterProvider router={router} />
    </AdminContextProvider>
  </React.StrictMode>,
)
