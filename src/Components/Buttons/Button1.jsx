import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus} from '@fortawesome/free-solid-svg-icons';
const Button1=({value})=>{
	return(
		<>
		<button className="text-white p-2 ml-5 text-md bg-[#343434] hover:bg-[#5b5959] rounded-sm duration-500"><FontAwesomeIcon className='mr-3' icon={faPlus} />{value}</button>
		</>
	)
}
export default Button1;