import React, { useContext } from 'react';
import AdminContext from '../Context/AdminContext';
import { Link, useNavigate } from 'react-router-dom';
import { empty } from '../../assets/images';
import { Separator } from '../ui/separator';

const Cart = () => {
  const {user, cart, handleDeleteCartItem } = useContext(AdminContext);
  const sn=1;

  let totalPrice=0;
  for(let index in cart){
    totalPrice += parseInt(cart[index].price);
  }

  const navigate=useNavigate();
  if(!user){
	navigate('/Signin');
	return null;
  }
  return (
	<>
  {

    cart.length!==0?<div className="max-w-5xl mx-auto my-10">
      <div className='text-center mb-5 text-xl md:text-3xl text-white'>
        <h1>Shopping Cart</h1>
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
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-950 dark:bg-gray-950' : 'bg-gray-900 dark:bg-gray-900'}>
                   <td className="px-6 py-4 whitespace-no-wrap text-md md:text-lg leading-5 text-white">
                    {sn+index}
                  </td>
                  <td className="px-6 flex flex-wrap items-center py-4 whitespace-no-wrap text-md md:text-lg leading-5 text-white">
                    <img className='w-36 mr-2 rounded-md' src={`http://localhost/onlinegamestore/admin/${item.image_url}`} alt="" />
                    <div>{item.game_title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-md md:text-lg leading-5 text-white">
                    {item.genre}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-md md:text-lg leading-5 text-white">
                    Rs.{item.price}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-md md:text-md leading-5 text-white">
                   <Link to={`/Store/GameDetails/${item.game_id}`}> <button className='text-white my-2 md:mr-3 bg-blue-600 hover:bg-blue-700 duration-200 cursor-pointer px-2 py-1 rounded-md'>View</button></Link>
                    <button onClick={()=>handleDeleteCartItem(item.game_id)} className='text-white bg-red-600 hover:bg-red-700 duration-200 cursor-pointer px-2 py-1 rounded-md'>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='mt-5'>
      <Separator className='bg-gray-600'/>
      </div>
      <div className='text-center lg:flex items-center mx-2 justify-between mt-5'>
        <div><h1 className='text-white text-xl '>Total Items: <span className='font-normal text-gray-200'>{cart.length}</span></h1></div>
        <div><h1 className='text-white text-xl '>Total Price: <span className='font-normal text-gray-200'>Rs. {totalPrice}</span></h1></div>
        <div className='mt-1 lg:mt-0'><button className='text-white text-lg bg-green-600 hover:bg-green-700 cursor-pointer duration-200 px-2 py-1 rounded-md'>Proceed to Checkout</button></div>
      </div>
    </div>:
    (
    <div className='flex flex-col items-center my-10 gap-y-2'>
      <img src={empty} className='w-44 md:w-56 rounded-lg' alt="" />
      <span className='text-[#ff0b0b] italic font-serif text-4xl md:text-6xl'>oops!</span>
      <h1 className='text-white text-xl md:text-2xl font-mono'>Your Cart is Empty!!</h1> 
    </div>
      )
  }
	</>
  );
};

export default Cart;
