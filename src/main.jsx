import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import AdminGames from './Components/Admin/AdminGames/AdminGames.jsx'
import GameDetails from './Components/Store/GameDetails.jsx'
import Search from './Components/Search/Search.jsx'
import FreeGames from './Components/FreeGames/FreeGames.jsx'
import PaidGames from './Components/PaidGames/PaidGames.jsx'
import Account from './Components/Account/Account.jsx'
import Cart from './Components/Cart/Cart.jsx'



const router=createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home />}/>
      <Route path='/Store'  element={<Store />}/>
      <Route path='/Store/GameDetails/:gameid'  element={<GameDetails />}/>      
      <Route path='/View' element={<View />}/>      
      <Route path='/News' element={<News />}/>
      <Route path='/Search' element={<Search />}/>
      <Route path='/FreeGames' element={<FreeGames />}/>
      <Route path='/PaidGames' element={<PaidGames />}/>
      <Route path='/Account' element={<Account />}/>
      <Route path='/Cart' element={<Cart/>}/>
    </Route>
      <Route path='/Signin'  element={<Signin />}/>
      <Route path='/Signup' element={<Signup />}/>
    
      <Route path='/Admin' element={<LayoutAdmin/>}>
        <Route path='/Admin/Dashboard' element={<AdminDashboard/>}/>  
        <Route path='/Admin/User' element={<AdminHome/>}/>
        <Route path='/Admin/News' element={<AdminNews/>}/>
        <Route path='/Admin/Game' element={<AdminGames/>}/>
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
    <ToastContainer />
  </React.StrictMode>,
)
