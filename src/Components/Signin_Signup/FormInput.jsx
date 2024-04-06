import { useState } from "react";
import "./FormInput.css";
const FormInput=({input, onChange})=>{
	const [focused, setFocused]=useState(false);
	const handleFocus=()=>{
		setFocused(true);
	}
	return(
		<>
		<div className="flex flex-col my-2">
			<label className="text-xl text-[#000000c7]" >{input.label}</label>
			<input className="border-2 border-gray-500 rounded-lg  p-2 w-96" name={input.name} placeholder={input.placeholder} type={input.type} onChange={onChange} pattern={input.pattern} required={input.required} onBlur={handleFocus} focused={focused.toString()}/>			
			<span className="hidden text-sm p-1 w-96 text-[red]">{input.errorMessage}</span>			
		</div>
		</>
	)
}
export default FormInput