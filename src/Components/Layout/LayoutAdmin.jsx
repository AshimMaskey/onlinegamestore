import React, { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminHeader from '../Admin/AdminHeader';
import AdminSideBar from '../Admin/AdminSideBar';
import AdminContext from '../Context/AdminContext';

function LayoutAdmin() {
  const navigate = useNavigate();
  const { isLoggedIn, admin } = useContext(AdminContext);

  useEffect(() => {
    if (!admin) {
      navigate('/Admin/Signin');
    }
  }, [admin, navigate]); 

  return admin ? (
    <div className="flex flex-col h-screen">
      <AdminHeader />
      <div className="flex flex-1">
        <div className="w-64 flex-shrink-0 hidden md:block">
          <AdminSideBar />
        </div>
        <div className="flex-grow p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  ) : null;
}

export default LayoutAdmin;
