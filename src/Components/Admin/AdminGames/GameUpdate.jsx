import AdminContext from '@/Components/Context/AdminContext';
import { showToast } from '@/Components/toast/toast';
import React, { useState, useContext } from 'react';

function GameUpdate({ game, onClose }) {
  const { setGamesData } = useContext(AdminContext);
  const [gameData, setGameData] = useState({
    game_id: game.game_id,
    game_title: game.game_title,
    price: game.price,
    genre: game.genre,
    release_date: game.release_date,
    description: game.description,
    image: null,
    apk: null,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const { game_title, price, image, apk } = gameData;

    // Validate title
    if (game_title.trim().length < 3) {
      newErrors.game_title = 'Game title should be more than 3 words';
    }

    // Validate price
    if (isNaN(price) || parseFloat(price) < 0) {
      newErrors.price = 'Price should be a non-negative number';
    }

    // Validate image
    if (image && !image.type.startsWith('image/')) {
      newErrors.image = 'Please upload a valid image file';
    }

    // Validate APK
    if (apk && apk.type !== 'application/vnd.android.package-archive') {
      newErrors.apk = 'Please upload a valid APK file';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Create formData to handle file uploads
    const formData = new FormData();
    for (const key in gameData) {
      if (key === 'image' || key === 'apk') {
        if (gameData[key]) {
          formData.append(key, gameData[key]);
        }
      } else {
        formData.append(key, gameData[key]);
      }
    }

    // Send API request to update game using fetch
    fetch('http://localhost/onlinegamestore/admin/update_game.php', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Updated game data:', data);
        showToast({condition:"success", message:"Game Updated Successfully"});
        onClose(false);
      })
      .catch((error) => {
        console.error('Error updating game:', error);
        alert('An error occurred while updating the game. Please try again later.');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGameData({
      ...gameData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setGameData({
      ...gameData,
      [name]: files[0],
    });
  };

  return (
    <div className="mb-3">
      <h2 className="my-3 text-3xl text-center">Edit Game</h2>
      <form className="mx-8 my-5" onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <div className="mb-3">
            <label htmlFor="game_title" className="text-xl mr-2">Game Title:</label>
            <input
              type="text"
              id="game_title"
              name="game_title"
              value={gameData.game_title}
              onChange={handleChange}
              className="border-gray-400 py-1 block border-2 rounded-md text-lg pl-2 w-full"
              required
            />
            {errors.game_title && <p className="text-red-600">{errors.game_title}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="text-xl mr-2">Price:</label>
            <input
              type="text"
              id="price"
              name="price"
              value={gameData.price}
              onChange={handleChange}
              className="border-gray-400 pl-2 block py-1 border-2 rounded-md text-lg w-full"
              required
            />
            {errors.price && <p className="text-red-600">{errors.price}</p>}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="mb-4">
            <label htmlFor="genre" className="text-xl mr-2">Genre:</label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={gameData.genre}
              onChange={handleChange}
              className="border-gray-400 block py-1 border-2 rounded-md text-lg pl-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="release_date" className="text-xl mr-2">Release Date:</label>
            <input
              type="date"
              id="release_date"
              name="release_date"
              value={gameData.release_date}
              onChange={handleChange}
              className="border-gray-400 px-8 block py-1 border-2 rounded-md text-lg w-full"
              required
            />
          </div>
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="description" className="text-xl mr-2">Description:</label>
          <textarea
            id="description"
            name="description"
            value={gameData.description}
            onChange={handleChange}
            className="border-gray-400 py-1 border-2 rounded-md text-lg pl-2 w-full"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="text-xl mr-2">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            className="border-gray-400 w-full block py-1 border-2 rounded-md text-lg pl-2"
          />
          {errors.image && <p className="text-red-600">{errors.image}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="apk" className="text-xl mr-2">APK File:</label>
          <input
            type="file"
            id="apk"
            name="apk"
            onChange={handleFileChange}
            className="border-gray-400 w-full block py-1 border-2 rounded-md text-lg pl-2"
          />
          {errors.apk && <p className="text-red-600">{errors.apk}</p>}
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => onClose(false)}
            className="mr-2 px-4 py-2 text-lg font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default GameUpdate;
