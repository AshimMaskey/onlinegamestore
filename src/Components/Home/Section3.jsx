import React from 'react'
import Button from "../Buttons/Button";
import Button3 from "../Buttons/Button3";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift } from '@fortawesome/free-solid-svg-icons';
import { mlbb, mlbb1, mllogo, pop, pop1, genshin, genshin1, valorant, valorant1, clashofclans, clashofclans1} from "../../assets/images"

function Section3() {
  return (
	<>
	<div className='w-[80%] mx-auto bg-[#2A2A2A] mb-32'>
		<div className='flex flex-col p-10'>
			<div className='flex justify-between'>
				<div className='flex text-2xl text-white'>
					<div>
						<FontAwesomeIcon icon={faGift} />
					</div>
					<div className='pl-3'>
						<h3>Free Games</h3>
					</div>
					
				</div>
				<div>
					<Button value="View More" />
				</div>
			</div>
			<div className='mt-10 flex justify-between'>
				<div className='w-[32%] hover:cursor-pointer hover:brightness-110 duration-200'>
					<div >
						<img className='rounded-lg' src={genshin1}/>
					</div>
					<div className='w-full'>
						<Button3 value="Free Now" />
					</div>
					<div className='flex flex-col mt-4'>
						<span className="text-white text-lg font-serif">Genshin Impact</span>
						<span className="text-[#A4A4A4] text-lg font-serif">Free Now - Mar 28 at 08:45 PM</span>
						
					</div>
				</div>
				<div className='w-[32%] hover:cursor-pointer hover:brightness-110 duration-200'>
					<div >
						<img className='rounded-lg' src={clashofclans1}/>
					</div>
					<div className='w-full'>
						<Button3 value="Free Now" />
					</div>
					<div className='flex flex-col mt-4'>
						<span className="text-white text-lg font-serif">Genshin Impact</span>
						<span className="text-[#A4A4A4] text-lg font-serif">Free Now - Mar 28 at 08:45 PM</span>
						
					</div>
				</div>
				<div className='w-[32%] hover:cursor-pointer hover:brightness-110 duration-200'>
					<div >
						<img className='rounded-lg h-48' src={mlbb}/>
					</div>
					<div className='w-full'>
						<Button3 value="Free Now" />
					</div>
					<div className='flex flex-col mt-4'>
						<span className="text-white text-lg font-serif">Genshin Impact</span>
						<span className="text-[#A4A4A4] text-lg font-serif">Free Now - Mar 28 at 08:45 PM</span>
						
					</div>
				</div>
			</div>

		</div>

	</div>
	</>
  )
}

export default Section3