import React, { useState } from 'react';

const GameForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    genre: '',
    releaseDate: '',
    image: null,
    apk: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleApkChange = (e) => {
    setFormData({ ...formData, apk: e.target.files[0] });
  };

  const handleSubmit = (e) => {
	e.preventDefault();
	const formDataToSend = new FormData();
	for (const key in formData) {
	  formDataToSend.append(key, formData[key]);
	}
  
	// Send formDataToSend to the backend
	fetch('http://localhost/onlinegamestore/admin/add_games.php', {
	  method: 'POST',
	  body: formDataToSend
	})
	.then(response => {
	  if (!response.ok) {
		throw new Error('Network response was not ok');
	  }
	  console.log('Game uploaded successfully');
	    setFormData({
		title: '',
		description: '',
		price: '',
		genre: '',
		releaseDate: '',
		image: null,
		apk: null,
	  });
	   alert('Game uploaded successfully!');
	})
	
	.catch(error => {
	  console.error('Error uploading game:', error);
	  alert('An error occurred while uploading the game. Please try again later.');
	});
  };
  
  return (
    <div className="bg-white max-w-3xl dark:bg-gray-800 shadow-md rounded-lg p-8 mt-5">
      <h2 className="text-2xl text-white font-semibold text-center mb-6">Add New Game</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 mb-2">Game Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:text-white py-2 px-4"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 dark:text-gray-300 mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:text-white py-2 px-4"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 dark:text-gray-300 mb-2">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:text-white py-2 px-4"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="genre" className="block text-gray-700 dark:text-gray-300 mb-2">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:text-white py-2 px-4"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="releaseDate" className="block text-gray-700 dark:text-gray-300 mb-2">Release Date</label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:text-white py-2 px-4"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 dark:text-gray-300 mb-2">Image</label>
          <input
            type="file"
            id="image"
            name="image"           
            onChange={handleImageChange}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:text-white py-2 px-4"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="apk" className="block text-gray-700 dark:text-gray-300 mb-2">APK File</label>
          <input
            type="file"
            id="apk"
            name="apk"           
            onChange={handleApkChange}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:text-white py-2 px-4"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
          Add Game
        </button>
      </form>
    </div>
  );
};

export default GameForm;
