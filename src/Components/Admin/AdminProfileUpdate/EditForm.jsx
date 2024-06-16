import React from 'react'

function EditForm({isVisible, onClose, children}) {
	if(!isVisible) return null;
	const handleClose=(e)=>{
		if(e.target.id==='wrapper')
		{
			onClose(false);
		}
	}
  return (
	<div id='wrapper' onClick={handleClose} className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
		<div className='w-[600px] mt-10 mx-3 flex flex-col'>
			<button onClick={()=>onClose(false)} className='text-white z-40 text-xl place-self-end'>X</button>
			<div className='bg-white p-2 rounded-sm'>{children}</div>
		</div>
	</div>
  )
}

export default EditForm