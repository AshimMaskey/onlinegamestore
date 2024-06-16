import React, { useState, useEffect, useContext } from 'react';
import Button from "../Buttons/Button";
import AdminContext from "../Context/AdminContext";
import { Link } from 'react-router-dom';

const Section1 = () => {
  const { gamesData, handleAddToCart } = useContext(AdminContext);
  const [sideSection, setSideSection] = useState([]);
  const [selectedGameIndex, setSelectedGameIndex] = useState(0);

  useEffect(() => {
    const gameIds = localStorage.getItem('selectedGames');
    const selectedGamesId = JSON.parse(gameIds);
    const filteredGames = gamesData.filter(game => selectedGamesId.includes(game.game_id));
    setSideSection(filteredGames);
  }, [gamesData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedGameIndex(prevIndex => (prevIndex + 1) % sideSection.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [sideSection]);

  const selectedGame = sideSection[selectedGameIndex];

  const handleClick = (id) => {
    const index = sideSection.findIndex(game => game.game_id === id);
    setSelectedGameIndex(index);
  };

  return (
    <>
      <section className="mx-2 md:10 lg:mx-24 mt-10">
        <div className="flex justify-between">
          <div className="">
            <div className="h-full relative">
              {selectedGame && <img className="brightness-75 rounded flex justify-around mx-auto  w-auto h-[300px] md:w-full md:h-[550px]" src={`http://localhost/onlinegamestore/admin/${selectedGame.image_url}`} alt="" />}
              <div className="absolute bottom-5 left-5 md:bottom-10 md:left-10">
                {selectedGame &&
                  <div className="">
                    <span className="text-white text-sm md:text-lg ">Now available</span>
                    <p className="text-white overflow-y-hidden w-2/3 h-20 text-md text-lg md:text-xl mb-4">{selectedGame.description}</p>
                    <Link to={`/Store/GameDetails/${selectedGame.game_id}`}><Button value="Learn More" /></Link>
                    <button onClick={() => handleAddToCart(selectedGame.game_id)} className='ml-3 text-white hover:bg-slate-600 cursor-pointer duration-200 bg-gray-800 px-2 py-2 rounded-md'>Add to Cart</button>
                  </div>
                }
              </div>
            </div>
          </div>
          <div className="hidden ml-3 lg:flex flex-col">
            {sideSection.map((game) => (
              <div key={game.game_id} id={game.game_id} className="flex items-center hover:bg-[#2A2A2A] hover:cursor-pointer hover:rounded-lg p-4" onClick={() => handleClick(game.game_id)}>
                <div>
                  <img className="rounded-xl object-cover w-28 h-20" src={`http://localhost/onlinegamestore/admin/${game.image_url}`} alt="" />
                </div>
                <div className="ml-4">
                  <span className="text-white text-lg">{game.game_title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
export default Section1;
