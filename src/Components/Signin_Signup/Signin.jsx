import {useState} from 'react';
import FormInput from './FormInput'
import {logo} from '../../assets/images'
import Button4 from '../Buttons/Button4'
import { Link, useNavigate} from 'react-router-dom';

function Signin() {  
  const [error,setError]=useState('');
  const [values, setValues]=useState({
    username:"",
    password:""
  })
  const navigate=useNavigate();
  
  const inputs=[
    {
      id:1,
      name:"username",
      type:"text",
      placeholder:"Enter your username",
      label: "Username"
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
    username:values.username,
    password:values.password
   }
   fetch('http://localhost/onlinegamestore/user/signin.php',{
    method:'POST',
    headers: {
      'Content-Type':'application/json',
    },
    body: JSON.stringify(data),
   })
   .then(response=>response.json())
   .then(data=>{
    if(data.success){
      console.log('signin successful');
      navigate('/');
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
      <div className='mb-5'>
        <div>No Account? <Link className='border-b-[1px] hover:cursor-pointer hover:text-green-600 hover:border-green-600 duration-200 border-black' to='/Signup'> Create one!</Link></div>
      </div>
      <Button4 value="Sign in"/>
    </form>
  </div>
  </>
  )
} 

export default Signin