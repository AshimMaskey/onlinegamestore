import React, { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminHeader from '../Admin/AdminHeader';
import AdminSideBar from '../Admin/AdminSideBar';
import AdminContext from '../Context/AdminContext';

function LayoutAdmin() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AdminContext);

  useEffect(() => {
    // Check if user is not logged in, then navigate to sign-in page
    if (!isLoggedIn) {
      navigate('/Admin/Signin');
    }
  }, [isLoggedIn]); // Re-run effect when isLoggedIn changes 

  // Render sidebar, header, and outlet only if user is logged in
  return isLoggedIn ? (
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
