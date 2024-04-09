import React from "react";
import { useState,useEffect } from "react";
import AdminContext from "./AdminContext";
const AdminContextProvider=({children})=>{
  // for login of admin
	const [isLoggedIn, setIsLoggedIn] = useState(() => {
		const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
		return storedIsLoggedIn ? JSON.parse(storedIsLoggedIn) : false;
	});
	
	const login = () => {
	  setIsLoggedIn(true);
	  localStorage.setItem('isLoggedIn', JSON.stringify(true));
	};
  
	const logout = () => {
	  setIsLoggedIn(false);
	  localStorage.setItem('isLoggedIn', JSON.stringify(false));
	};

  //for news data fetch and delete
	const [newsData, setNewsData] = useState([]);

    useEffect(() => {
        fetch('http://localhost/onlinegamestore/admin/fetchnews.php')
            .then(response => response.json())
            .then(data => {
                setNewsData(data);
            })
            .catch(error => {
                console.error('Error fetching news data:', error);
            });
    }, []);
	const handleDelete = (news_id) => {  

        fetch(`http://localhost/onlinegamestore/admin/deletenews.php?news_id=${news_id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',	
          },
        })
          .then(response => {
            if (response.ok) {
              console.log(`news with ID ${news_id} deleted successfully`);
              const updatedNewsData = newsData.filter(news => news.news_id !== news_id);
              setNewsData(updatedNewsData);
            } else {
              console.error(`Failed to delete news with ID ${news_id}}`);
            }
          })
          .catch(error => console.error('error deleting news', error));
      };

      // for games data fetch and delete
      const [gamesData, setGamesData] = useState([]);
      useEffect(() => {
        fetch('http://localhost/onlinegamestore/admin/fetchgames.php')
            .then(response => response.json())
            .then(data => {
                setGamesData(data);
            })
            .catch(error => {
                console.error('Error fetching games data:', error);
            });
    }, []);
    const handleDelete2 = (game_id) => {  

      fetch(`http://localhost/onlinegamestore/admin/deletegames.php?game_id=${game_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',	
        },
      })
        .then(response => {
          if (response.ok) {
            console.log(`game with ID ${game_id} deleted successfully`);
            const updatedGamesData = gamesData.filter(game => game.game_id !== game_id);
            setGamesData(updatedGamesData);
          } else {
            console.error(`Failed to delete game with ID ${game_id}}`);
          }
        })
        .catch(error => console.error('error deleting game', error));
    };



	return(
		<>
		<AdminContext.Provider value={{isLoggedIn,login,logout, newsData, setNewsData, handleDelete, handleDelete2, gamesData, setGamesData}}>
			{children}
		</AdminContext.Provider>
		</>
	)

}
export default AdminContextProvider;