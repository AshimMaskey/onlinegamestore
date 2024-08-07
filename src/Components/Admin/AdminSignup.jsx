import {useState,useContext, useEffect} from 'react';
import FormInput from '../Signin_Signup/FormInput';
import {logo} from '../../assets/images'
import Button4 from '../Buttons/Button4'
import { Link, useNavigate } from 'react-router-dom';
import AdminContext from '../Context/AdminContext';
import { showToast } from '../toast/toast';


function AdminSignup() {  
const navigate=useNavigate();
const {admin}=useContext(AdminContext);
  useEffect(()=>{
   if(!admin){
    navigate('/Admin/Signin');    
   }
  },[admin]);

  const [values, setValues]=useState({
    admin_name:"",
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
      name:"admin_name",
      type:"text",
      placeholder:"Enter admin name",
      label: "Admin name",
      required: true,
      errorMessage:"Admin name should be 3-25 characters and should't include special characters and number",
      pattern:"^[a-zA-Z\\s]{3,25}$"
    },
    {
      id:2,
      name:"email",
      type:"email",
      placeholder:"Enter Email", 
      label: "Email",
      required: true,
      errorMessage:"It should be valid email address.",
    },
    {
      id:3,
      name:"dob",
      type:"date",
      placeholder:"Enter dob",
      label: "Date of Birth",
    },
    {
      id:4,
      name:"phone",
      type:"tel",
      placeholder:"Enter phone number",
      label: "Phone number",
      required: true,
      errorMessage:"It should be numbers only and 5-15 characters.",
      pattern:"^\\+?[0-9]{5,15}$"
    },
    {
      id:5,
      name:"password",
      type:"password",
      placeholder:"Enter password",
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
      admin_name:values.admin_name,
      email:values.email,
      phone:values.phone,
      dob:values.dob,
      password:values.password    
    }

    console.log(data);

    fetch('http://localhost/onlinegamestore/admin/signup.php',{
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
        navigate('/Admin');

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
      <Button4 value="Add Admin"/>
    </form>

  </div>
  </>
  )
} 

export default AdminSignup