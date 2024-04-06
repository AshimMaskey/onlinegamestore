import { mlbb, mlbb1, mllogo, pop, pop1, genshin, genshin1, valorant, valorant1, clashofclans, clashofclans1} from "../../assets/images"

import React, { useState, useEffect } from 'react';
import Button from "../Buttons/Button";
import Button1 from "../Buttons/Button1";

const Section1=()=>{
	const [selected, setSelected]=useState(1);
	const handleClick=(id)=>{
		setSelected(id)
	}
	useEffect(() => {
		const interval = setInterval(() => {
		  const id = selected < 5 ? selected + 1 : 1;
		  setSelected(id);
		}, 3000);
	
		return () => clearInterval(interval);
	  }, [selected]);
	
	const sideSection=[
		{img:mlbb1, text:"Mobile Legends", id:1, img1:mlbb},
		{img:pop, text:"Prince of Persia", id:2, img1:pop1},
		{img:genshin, text:"Genshin impact", id:3, img1:genshin1},
		{img:clashofclans, text:"Clash of Clans", id:4, img1:clashofclans1},
		{img:valorant, text:"Valorant", id:5, img1:valorant1}
	]
	return(
		<>
		<section className="w-[80%] mx-auto mt-10">
			<div className="flex">
				<div className="w-[82%] relative">
					<div className="h-full">
						{
							<img className="rounded-xl h-full" src={sideSection.find((section)=>section.id===selected).img1} alt="" />
						}
						<div className="h-[50%] absolute bottom-20 w-[60%]">
							<div className="ml-20">
								<img className="h-24 mt-2 mb-8" src={mllogo} alt="" />
								<span className="text-white">Now available</span>
								<p className="text-white text-xl mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae incidunt maxime, corporis suscipit fugiat eligendi.</p>
								<Button value="Learn More"/>
								<Button1 value="Add to Cart"/>
							</div>
						</div>
					</div>
				</div>
				<div className="w-[18%] ml-3 flex flex-col">
						{
							sideSection.map(({img, text, id})=>{
								return(
									<div id={id} className="flex items-center hover:bg-[#2A2A2A] hover:cursor-pointer hover:rounded-lg p-4" onClick={()=>handleClick(id)}>			
										<div>
											<img className="rounded-xl w-16 h-20" src={img} alt="" />
										</div>
										<div className="ml-4">
											<span className="text-white text-lg">{text}</span>
										</div>
									</div>
								)
							})
						}
						
				</div>				
			</div>
		</section>
		</>
	)
}
export default Section1