import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faArrowRightFromBracket, faUser, faTimes, faBars, faChartLine, faTableCells, faGamepad, faNewspaper, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import AdminContext from '../Context/AdminContext';
import Confirm from '../Confirm/Confirm';
import { showToast } from '../toast/toast';

function AdminHeader() {
  const { adminLogout } = useContext(AdminContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    setIsOpenConfirm(true);
  };

  const handleConfirm = () => {
    adminLogout();
    showToast({ message: 'Logged Out Successfully!!', condition: 'success' });
  };

  const handleCancel = () => {
    setIsOpenConfirm(false);
  };

  const navItems = [
    { link: 'Dashboard', path: '/Admin/Dashboard', icon: faChartLine },
    { link: 'Section Management', path: '/Admin/Section', icon: faTableCells },
    { link: 'Game Management', path: '/Admin/Game', icon: faGamepad },
    { link: 'News Management', path: '/Admin/News', icon: faNewspaper },
    { link: 'User Details', path: '/Admin/User', icon: faUser },
    { link: 'Payment Details', path: '/Admin/PaymentDetails', icon: faClockRotateLeft },
  ];

  return (
    <>
      <div className='flex sticky top-0 justify-between bg-[#18181C] px-5 py-5 items-center'>
        <div>
          <Link to='/Admin/Signup'>
            <button className='bg-green-600 hover:cursor-pointer hover:bg-green-700 duration-200 text-white py-1 px-2 rounded-md text-md'>
              Add Admin
            </button>
          </Link>
        </div>
        <div className='hidden md:flex'>
          <Link to='/Admin'>
            <div className='text-white text-xl hover:cursor-pointer hover:border-b-2'>
              <FontAwesomeIcon className='text-xl mr-2 text-white' icon={faUser} />
              Your Profile
            </div>
          </Link>
          <div
            onClick={handleLogout}
            className='flex items-center hover:cursor-pointer hover:border-b-2 border-white ml-8'
          >
            <FontAwesomeIcon className='text-xl text-white' icon={faArrowRightFromBracket} />
            <p className='text-white text-lg ml-2'>Log Out</p>
          </div>
        </div>
        <div className='block md:hidden'>
          <FontAwesomeIcon
            className='lg:hidden block text-2xl text-white cursor-pointer'
            icon={isMobileMenuOpen ? faTimes : faBars}
            onClick={toggleMobileMenu}
          />
        </div>
      </div>
      <Confirm
        message='Do you want to log out?'
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        isOpen={isOpenConfirm}
      />
      <div
        className={`fixed md:hidden  top-0 left-0 w-72 h-full bg-[#18181C] text-white transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className='flex flex-col p-5'>
          <div>
            <p className='text-teal-400 mb-5 text-2xl font-bold text-center'>Admin Panel</p>
        </div>
          <Link to='/Admin' onClick={toggleMobileMenu}>
            <div className='text-xl mb-4'>
              <FontAwesomeIcon className='text-xl mr-2 text-white' icon={faUser} />
              Your Profile
            </div>
          </Link>
          {navItems.map(({ link, path, icon }) => (
            <Link to={path} key={path} onClick={toggleMobileMenu}>
              <div className='text-xl mb-4'>
                <FontAwesomeIcon className='text-xl mr-2 text-white' icon={icon} />
                {link}
              </div>
            </Link>
          ))}
          <div
            onClick={() => {
              handleLogout();
              toggleMobileMenu();
            }}
            className='text-xl cursor-pointer mb-4'
          >
            <FontAwesomeIcon className='text-xl text-white' icon={faArrowRightFromBracket} />
            <p className='inline ml-2'>Log Out</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHeader;
