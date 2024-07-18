import React from 'react';

export default function Loading() {
  return (
    <div className='flex justify-center'>
		<div
    className="inline-block text-white h-14 w-14 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
    role="status">
	</div>
  </div>
  );
}