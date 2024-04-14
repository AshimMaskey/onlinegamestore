import React, { useContext, useState } from 'react';
import AdminContext from '../Context/AdminContext';
import { Link, useNavigate } from 'react-router-dom';
import { empty } from '../../assets/images';

const Cart = () => {
  const {user, cart, handleDeleteCartItem } = useContext(AdminContext);
  const [sn,setSN]=useState(1);
  const navigate=useNavigate();
  if(!user){
	navigate('/Signin');
	return null;
  }
  return (
	<>
  {

    cart.length!==0?<div className="flex flex-col max-w-6xl mx-auto my-10">
      <div className='text-center uppercase font-semibold mb-5 text-xl md:text-2xl text-white'>
        <h1>Your cart:</h1>
      </div>
      <div className="overflow-x-auto">
        <div className="align-middle inline-block min-w-full">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden dark:bg-gray-900">
            <thead className="dark:bg-black">
              <tr>
                <th className="px-6 py-3 bg-black text-white text-left text-md md:text-lg leading-4 font-medium uppercase tracking-wider">
                  SN
                </th>
                <th className="px-6 py-3 bg-black text-white text-left text-md md:text-lg leading-4 font-medium uppercase tracking-wider">
                  Game
                </th>
                <th className="px-6 py-3 bg-black text-white text-left text-md md:text-lg leading-4 font-medium uppercase tracking-wider">
                  Genre
                </th>
                <th className="px-6 py-3 bg-black text-white text-left text-md md:text-lg leading-4 font-medium uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 bg-black text-white text-left text-md md:text-lg leading-4 font-medium uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className=" dark:bg-gray-800">
              {cart.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-950 dark:bg-gray-950' : 'bg-gray-700 dark:bg-gray-900'}>
                   <td className="px-6 py-4 whitespace-no-wrap text-md md:text-lg leading-5 text-gray-800 dark:text-gray-200">
                    {sn+index}
                  </td>
                  <td className="px-6 flex flex-wrap items-center py-4 whitespace-no-wrap text-md md:text-lg leading-5 text-gray-800 dark:text-gray-200">
                    <img className='w-36 mr-2 rounded-md' src={`http://localhost/onlinegamestore/admin/${item.image_url}`} alt="" />
                    <div>{item.game_title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-md md:text-lg leading-5 text-gray-800 dark:text-gray-200">
                    {item.genre}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-md md:text-lg leading-5 text-gray-800 dark:text-gray-200">
                    ${item.price}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-md md:text-md leading-5 text-gray-800 dark:text-gray-200">
                   <Link to={`/Store/GameDetails/${item.game_id}`}> <button className='text-white my-2 md:mr-3 bg-blue-600 hover:bg-blue-700 duration-200 cursor-pointer px-2 py-1 rounded-md'>View</button></Link>
                    <button onClick={()=>handleDeleteCartItem(item.game_id)} className='text-white bg-red-600 hover:bg-red-700 duration-200 cursor-pointer px-2 py-1 rounded-md'>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>:
    (
    <div className='flex flex-col items-center my-10 gap-y-2'>
      <img src={empty} className='w-44 md:w-56 rounded-lg' alt="" />
      <span className='text-red-500 italic font-serif text-4xl md:text-6xl'>oops!</span>
      <h1 className='text-white text-xl md:text-2xl font-mono'>Your Cart is Empty!!</h1>  
    </div>
      )
  }
	</>
  );
};

export default Cart;
