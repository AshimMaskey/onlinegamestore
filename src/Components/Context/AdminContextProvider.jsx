import React from "react";
import { toast } from "react-toastify";
import { useState,useEffect } from "react";
import AdminContext from "./AdminContext"; 
import { Navigate } from "react-router-dom";
import { showToast } from "../toast/toast";
const AdminContextProvider=({children})=>{

  // FOR LOGIN OF ADMIN AND ADMIN DATA
  const [admin, setAdmin]=useState(null);
  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem('adminData'));
    if (adminData) {
      setAdmin(adminData);
    }
  }, []);

  const adminLogin=(adminData)=>{
    setAdmin(adminData);
    localStorage.setItem('adminData',JSON.stringify(adminData));
  };
  const adminLogout=()=>{
    setAdmin(null);
    localStorage.removeItem('adminData');
    <Navigate to='/Admin/Signin'/>;
  }



  // hFOR LOGIN OF USER AND USER DATA
  const [user, setUser]=useState(null);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      setUser(userData);
    }
  }, []);

  const userLogin=(userData)=>{
    setUser(userData);
    localStorage.setItem('userData',JSON.stringify(userData));
  };
  const userLogout=()=>{
    setUser(null);
    localStorage.removeItem('userData');
  }
  


  // ADD TO CART FUNCTIONALITIES
  const [cart, setCart]=useState([]);
  const [cartUpdated, setCartUpdated] = useState(false);
  const handleAddToCart = (game_id) => {
   if(user)
   {
      fetch('http://localhost/onlinegamestore/user/addtocart.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                game_id: game_id,
                user_id: user.user_id
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .then(data => {
            if (data.success) {
                console.log(`Game with ID ${game_id} added to cart successfully`);
                toast.success('Item Added to Cart successfully!', {
                  position: "top-right",
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  // transition: Bounce,
                  });
                setCartUpdated(prevState => !prevState);
            } else {
                console.error(`Failed to add game with ID ${game_id} to cart: ${data.message}`);
                if (data.message === "Game already added to cart") {
                  toast.error('Item already in Cart!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                }
            }
        })
        .catch(error => console.error('Error adding game to cart:', error));
   }
   else{
    toast.error('You should be Signed in first!!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
   }
};
useEffect(() => {
  if (user && user.user_id) {
    fetch('http://localhost/onlinegamestore/user/fetchcartitems.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user_id: user.user_id })
    })
    .then(response => response.json())
    .then(data => setCart(data))
    .catch(error => console.error('error fetching cart items:', error));
  }
}, [user,cartUpdated]);

const handleDeleteCartItem=(game_id)=>{
    fetch(`http://localhost/onlinegamestore/user/deletecartitem.php`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user.user_id,
        game_id: game_id
      })
    })
    .then(response => {
      if (response.ok) {
        console.log(`Game with ID ${game_id} deleted from the cart successfully`);
        setCart(cart => cart.filter(item => item.game_id !== game_id));
        toast.success('Cart item deleted successfully! ', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      } else {
        console.error(`Failed to delete game with ID ${game_id} from the cart`);
      }
    })
    .catch(error => console.error('Error deleting game from cart:', error));
}



  //FOR NEWS DATA
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
            showToast({message:'news deleted successfully', condition:'success'});
          } else {
            console.error(`Failed to delete news with ID ${news_id}}`);
          }
        })
        .catch(error => console.error('error deleting news', error));

      };



      //FOR GAMES DATA FETCH AND DELETE
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

    //for payments and payments_items
       const [paymentsData, setPaymentsData] = useState([]);
       useEffect(() => {
         fetch('http://localhost/onlinegamestore/payment/fetchpayments.php')
             .then(response => response.json())
             .then(data => {
                 setPaymentsData(data);
             })
             .catch(error => {
                 console.error('Error fetching games data:', error);
             });
     }, []);
    
       const [payment_items, setPayment_items] = useState([]);
       useEffect(() => {
         fetch('http://localhost/onlinegamestore/payment/fetchpaymentitems.php')
             .then(response => response.json())
             .then(data => {
                 setPayment_items(data);
             })
             .catch(error => {
                 console.error('Error fetching games data:', error);
             });
     }, []);



	return(
		<>
		<AdminContext.Provider value={{ newsData, setNewsData, handleDelete, handleDelete2, gamesData, setGamesData,adminLogin,adminLogout,admin,setAdmin, userLogin,userLogout, user, setUser, handleAddToCart, setCart, cart, handleDeleteCartItem, paymentsData, payment_items}}>
			{children}
		</AdminContext.Provider>
		</>
	)
}
export default AdminContextProvider;