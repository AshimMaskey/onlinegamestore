import {useContext, useState} from 'react';
import FormInput from './FormInput'
import {logo} from '../../assets/images'
import Button4 from '../Buttons/Button4'
import { Link, useNavigate } from 'react-router-dom';
import AdminContext from '../Context/AdminContext';
import { showToast } from '../toast/toast';


function Signup() { 
  const {user}=useContext(AdminContext); 
const navigate=useNavigate();
if(user){
  navigate('/Account');
}

  const [values, setValues]=useState({
    username:"",
    email:"",
    dob:"",
    phone:"",
    password:"",
    confirmPassword:""
  })

  const [error, setError] = useState('');
  
  const inputs=[
    {
      id:1,
      name:"username",
      type:"text",
      placeholder:"Enter your username",
      label: "Username",
      required: true,
      errorMessage:"Username should be 3-25 characters and should't include special characters and number",
      pattern:"^[a-zA-Z\\s]{3,25}$"
    },
    {
      id:2,
      name:"email",
      type:"email",
      placeholder:"Enter your Email", 
      label: "Email",
      required: true,
      errorMessage:"It should be valid email address.",
      pattern: "^([a-zA-Z\d\.-]+)@([a-zA-Z\d-]+)\.([a-zA-Z]{2,4})$"
    },
    {
      id:3,
      name:"dob",
      type:"date",
      placeholder:"Enter your dob",
      label: "Date of Birth",
    },
    {
      id:4,
      name:"phone",
      type:"tel",
      placeholder:"Enter your phone number",
      label: "Phone number",
      required: true,
      errorMessage:"It should be numbers only and 5-15 characters.",
      pattern:"^\\+?[0-9]{5,15}$"
    },
    {
      id:5,
      name:"password",
      type:"password",
      placeholder:"Enter your password",
      label: "Password",
      required: true,
      errorMessage:"password should be 5-20 chracters and include at least 1 letter and 1 number",
      pattern:"^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{5,20}$"
    },
    {
      id:6,
      name:"confirmPassword",
      type:"password",
      placeholder:"Confirm Password",
      label: "Confirm Password",
      required: true,
      errorMessage:"Password dont match",
      pattern:values.password
    },
   
  ]

  
  const handleSubmit=(e)=>{
    e.preventDefault();
    const data={
      username:values.username,
      email:values.email,
      phone:values.phone,
      dob:values.dob,
      password:values.password    
    }

    console.log(data);

    fetch('http://localhost/onlinegamestore/user/signup.php',{
      method:'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response =>{
      if(response.ok){
        console.log('signup successful');
        showToast({message:"Successfully registered!!", condition:"success"});
        navigate('/signin');

      }
      else{
        console.error("signup failed");
      }
    })
    .catch(error =>{
      setError('Signup failed. Please try again.');
      console.error('error occured', error);
    });
  };
  
  const onChange=(e)=>{
    setValues({...values, [e.target.name]: e.target.value})
  }
  
  return (
	<>
  <div className=' flex justify-center items-center my-10'>
    <form onSubmit={handleSubmit} className='bg-white rounded-lg py-8 px-11'>
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
        <div>Already have an Account? <Link className='border-b-[1px] hover:cursor-pointer hover:text-green-600 hover:border-green-600 duration-200 border-black' to='/Signin'> Sign in!</Link></div>
      </div>
      <Button4 value="Sign up"/>
    </form>
  </div>
  </>
  )
} 

export default Signup