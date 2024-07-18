import React, { useState } from 'react'

function Confirm({message, isOpen, onCancel, onConfirm}) {
	if(!isOpen){
		return null;
	}

  return (
	<>
	<div className='fixed inset-0 backdrop-blur-sm flex items-center justify-center'>
		<div className='flex backdrop-blur-sm bg-white border-2 border-gray-300 px-8 py-5 rounded-lg flex-col'>
		<div className='text-xl text-black'>{message}</div>
		<div className='flex mt-7 justify-between'>
			<button onClick={onCancel} className='bg-white hover:bg-gray-100 duration-200 border-gray-400 border-2 mr-3 px-5 py-2 rounded-lg'>Cancel</button>
			<button onClick={onConfirm} className='text-white hover:bg-gray-800 duration-200 bg-black px-5 font-sans text-md py-2 rounded-lg'>Continue</button>
		</div>
		</div> 	
	</div>
	</>
  )
}

export default Confirm