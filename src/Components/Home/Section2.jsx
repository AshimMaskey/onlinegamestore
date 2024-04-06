import { mlbb, mlbb1, mllogo, pop, pop1, genshin, genshin1, valorant, valorant1, clashofclans, clashofclans1} from "../../assets/images"

import React, { useState, useEffect } from 'react';
import Button from "../Buttons/Button";

const Section2=()=>{
return(
	<>
	<div className="w-[80%] mx-auto mt-20 mb-40	">
		<div className="mb-4">
			<h1 className="text-white text-2xl">Most Popular Games:</h1>
		</div>
		<div className="flex justify-between">
			<div className="flex hover:cursor-pointer gap-y-2 flex-col w-[20%] max-h-[28rem]">
				<div className="h-[90%]">
					<img className=" rounded-2xl w-full h-full hover:brightness-75 duration-300" src={mlbb1} alt="" />
				</div>
				<div>
					<span className="text-white text-lg font-semibold">Genshin Impact</span>
				</div>
				<div className=" flex justify-between items-center">
					<span className="text-white text-lg font-thin italic">Rs. 200</span>
					<Button value="Add to cart" />
				</div>
			</div>
			<div className="flex hover:cursor-pointer gap-y-2 flex-col w-[20%] max-h-[28rem]">
				<div className="h-[90%]">
					<img className=" rounded-2xl w-full h-full hover:brightness-75 duration-300" src={genshin} alt="" />
				</div>
				<div>
					<span className="text-white text-lg font-semibold">Genshin Impact</span>
				</div>
				<div className=" flex justify-between items-center">
					<span className="text-white text-lg font-thin italic">Rs. 200</span>
					<Button value="Add to cart" />
				</div>
			</div>
			<div className="flex hover:cursor-pointer gap-y-2 flex-col w-[20%] max-h-[28rem]">
				<div className="h-[90%]">
					<img className=" rounded-2xl w-full h-full hover:brightness-75 duration-300" src={clashofclans} alt="" />
				</div>
				<div>
					<span className="text-white text-lg font-semibold">Genshin Impact</span>
				</div>
				<div className=" flex justify-between items-center">
					<span className="text-white text-lg font-thin italic">Rs. 200</span>
					<Button value="Add to cart" />
				</div>
			</div>
			<div className="flex hover:cursor-pointer gap-y-2 flex-col w-[20%] max-h-[28rem]">
				<div className="h-[90%]">
					<img className=" rounded-2xl w-full h-full hover:brightness-75 duration-300" src={valorant} alt="" />
				</div>
				<div>
					<span className="text-white text-lg font-semibold">Genshin Impact</span>
				</div>
				<div className=" flex justify-between items-center">
					<span className="text-white text-lg font-thin italic">Rs. 200</span>
					<Button value="Add to cart" />
				</div>
			</div>
		</div>

	</div>
	</>
)

}
export default Section2;