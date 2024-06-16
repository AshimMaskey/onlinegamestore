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
  }, [admin]); 

  return admin ? (
    <div className="flex">
      <div>
        <AdminSideBar />
      </div>
      <div className="flex-1">
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  ) : null;
}

export default LayoutAdmin;
