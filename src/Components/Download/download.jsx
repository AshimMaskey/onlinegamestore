import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdminContext from '../Context/AdminContext';

const DownloadPage = () => {
  const location = useLocation();
  const { user, cart } = useContext(AdminContext);
  const [decodedData, setDecodedData] = useState(null);
  const [downloadLinks, setDownloadLinks] = useState([]);
  const [dataSubmitted, setDataSubmitted] = useState(false);

  // Separate state to track when user and cart data are available
  const [dataReady, setDataReady] = useState(false);

  // Effect to check if user and cart data are available
  useEffect(() => {
    if (user && user.user_id && cart && cart.length > 0) {
      setDataReady(true);
    }
  }, [user, cart]);

  // Main effect for handling the payment and fetching download links
  useEffect(() => {
    const fetchData = async () => {
      const queryParams = new URLSearchParams(location.search);
      const encodedData = queryParams.get('data');
      
      // Ensure that all conditions are met before sending the data
      if (encodedData && !dataSubmitted && dataReady) {
        try {
          const decodedString = atob(encodedData);
          const jsonData = JSON.parse(decodedString);

          const gameids = cart.map(cartItem => cartItem.game_id);
          if (gameids.length === 0) {
            console.log('Game IDs are empty');
            return;
          }

          const data = {
            ...jsonData,
            user_id: user.user_id,
            gameids: gameids
          };

          console.log('Data to send:', data);

          // Send data to backend
          const response = await fetch('http://localhost/onlinegamestore/payment/store_payment.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const responseData = await response.json();
          console.log('Success:', responseData);

          // Set download links if available
          if (responseData.download_links) {
            setDownloadLinks(responseData.download_links);
          }

          // Set dataSubmitted to true after successful submission
          setDataSubmitted(true);

          // Set decoded data state
          setDecodedData(jsonData);

        } catch (error) {
          console.error('Error decoding or parsing data:', error);
        }
      }
    };

    fetchData();
  }, [location.search, dataReady, dataSubmitted, user, cart]);

  // Render the download links if available
  return (
    <div className='m-10'>
      {downloadLinks.length > 0 ? (
        <>
          <h1 className='text-white text-lg font-bold'>Download Links:</h1>
          <ul>
            {downloadLinks.map((link, index) => (
              <li className='my-5' key={index}>
                <strong className='text-white italic font-semibold'>{link.game_title}:</strong>
                <a
                  href={`http://localhost/onlinegamestore/admin/${link.download_link}`}
                  className='text-white ml-4 bg-green-600 hover:bg-green-700 duration-200 rounded-lg px-2 py-1'
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                </a>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className='text-white'>Processing your request...</p>
      )}
    </div>
  );
};

export default DownloadPage;
