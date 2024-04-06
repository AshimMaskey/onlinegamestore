import {useContext, useEffect, useState} from 'react';
import FormInput from '../Signin_Signup/FormInput';
import { logo } from '../../assets/images';
import Button4 from '../Buttons/Button4';
import { Link, useNavigate} from 'react-router-dom';
import AdminContext from '../Context/AdminContext';


function AdminSignin() {
  const navigate=useNavigate();
  const {login,isLoggedIn}=useContext(AdminContext);
  useEffect(()=>{
   if(isLoggedIn){
    alert('You need to log out first!');
    navigate('/admin');
    
   }
  },[isLoggedIn]);

  const [error,setError]=useState('');
  const [values, setValues]=useState({
    admin_name:"",
    password:""
  })
  
  const inputs=[
    {
      id:1,
      name:"admin_name",
      type:"text",
      placeholder:"Enter admin name",
      label: "Admin name"
    },
    {
      id:2,
      name:"password",
      type:"password",
      placeholder:"Enter your password",
      label: "Password"
    }
  ]

  const handleSubmit=(e)=>{
    e.preventDefault();
   const data={
    admin_name:values.admin_name,
    password:values.password
   }
   fetch('http://localhost/onlinegamestore/admin/signin.php',{
    method:'POST',
    headers: {
      'Content-Type':'application/json',
    },
    body: JSON.stringify(data),
   })
   .then(response=>response.json())
   .then(data=>{
    if(data.success){
      login();
      console.log('signin successful');
      navigate('/Admin');
    }
    else{
      setError(data.message);
      console.log('signin failed:', data.message);
    }
   })
   .catch(error=>{
      setError("Signin Failed");

      console.error('signin failed:', error);
   })
   
  };
  
  const onChange=(e)=>{
    setValues({...values, [e.target.name]: e.target.value})
  }
  
  return (
	<>
  <div className=' flex justify-center items-center h-[80vh]'>
    <form onSubmit={handleSubmit} className='bg-white rounded-lg p-6'>
      <div className='flex items-center'>
        <img className='w-20' src={logo}/>
        <p className='text-2xl font-semibold'>GameVortex</p>
      </div>
      {
        inputs.map((input)=>(
          <FormInput key={input.id} input={input} value={values[input.name]} onChange={onChange} />
        ))
      }
      {error && <div className='text-red-500'>{error}</div>}     
      <Button4 value="Sign in as Admin"/>
    </form>
  </div>
  </>
  )
} 

export default AdminSignin