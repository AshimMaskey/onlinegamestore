import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function Search() {
	const [searchQuery, setSearchQuery]=useState('');
	const [searchResults, setSearchResults]=useState([]);
	const [searched, setSearched]=useState(false);
	const handleClick=()=>{
		if (searchQuery == '') {
			setSearchResults([]);
			setSearched(false);
			return;
		}
		fetch(`http://localhost/onlinegamestore/admin/searchgames.php?searchQuery=${searchQuery}`,
		{
			method:'GET',
			headers: {
                'Content-Type': 'application/json'
            },
		})
		.then(response => {
			if (response.ok) {
				return response.json();
			}
			throw new Error('Network response was not ok.');
		})
		.then(data => {
			console.log('Search results:', data);
			setSearchResults(data); 
			setSearched(true);
		})
		.catch(error => {
			console.error('There was a problem with the search request:', error);
		});

	};
	useEffect(()=>{
		if(searchQuery !==''){
			handleClick();
		}
	},[searchQuery])
	const handleKeyPress=(event)=>{
		if(event.key=='Enter')
		{
			handleClick();
		}
	}

  return (
    <>   
        <div className="flex mt-20 items-center justify-center my-10">
          <div className="flex border-2 rounded bg-gray-800">
            <input type="text" value={searchQuery} onKeyDown={handleKeyPress} onChange={(e)=>setSearchQuery(e.target.value)} className="px-5 py-3 md:w-96 bg-gray-800 text-white placeholder-gray-400 focus:outline-none" placeholder="Search by game name...." />
            <button onClick={handleClick} className="flex items-center justify-center px-4 border-l">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
              </svg>
            </button>
          </div>
        </div>

		{
			searched && searchResults.length === 0?(
				<div className='text-center mb-10 text-white text-2xl'>No results found!!</div>
			 ):(<div className='justify-center mx-auto flex md:max-w-5xl flex-wrap gap-10 md:gap-20 my-10'>
			 {
			 searchResults.map((result)=>(
				 <Link to={`/Store/GameDetails/${result.game_id}`} key={result.game_id}>
				 <div className=" brightness-90 hover:cursor-pointer hover:shadow-white hover:shadow-md rounded-lg overflow-hidden">
				 <img src={`http://localhost/onlinegamestore/admin/${result.image_url}`} className="w-64 md:w-72 h-52 rounded-xl object-cover" />
				 <div className="p-4">
					 <span className="text-gray-500 italic dark:text-gray-400 uppercase text-xs">{result.genre}</span>
					 <h2 className="text-xl font-sans text-white font-semibold mt-2">{result.game_title}</h2>
					 <p className="text-gray-600 dark:text-gray-300 mt-2">Rs. {result.price} </p>
				 </div>
				 </div>
				 </Link>
			 )
			 )
			 }
		 </div>
	)
		}     
    </>
  );
}

export default Search;
