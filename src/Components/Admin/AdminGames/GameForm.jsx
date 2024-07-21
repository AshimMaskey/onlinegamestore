import { showToast } from '@/Components/toast/toast';
import React, { useEffect, useState } from 'react';

const GameForm = ({ onclose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    genre: '',
    releaseDate: '',
    image: null,
    apk: null,
  });

  const [errors, setErrors] = useState({});
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    // Fetch genres from the backend
    fetch('http://localhost/onlinegamestore/admin/get_genres.php')
      .then(response => response.json())
      .then(data => setGenres(data))
      .catch(error => console.error('Error fetching genres:', error));
  }, []);
  console.log(genres);

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

  const validateForm = () => {
    const newErrors = {};
    const { title, price, image, apk } = formData;

    if (title.trim().length < 3) { // Minimum of 5 characters
      newErrors.title = 'Game title should be at least 5 characters long';
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
    if (apk && !(apk.type === 'application/vnd.android.package-archive' || apk.type === 'application/x-msdownload')) {
      newErrors.apk = 'Please upload a valid APK or EXE file';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    // Send formDataToSend to the backend
    fetch('http://localhost/onlinegamestore/admin/add_games.php', {
      method: 'POST',
      body: formDataToSend,
    })
      .then((response) => {
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
        showToast({message:"Game Added Successfully!", condition:"success"});
        onclose(false);
      })
      .catch((error) => {
        console.error('Error uploading game:', error);
        alert('An error occurred while uploading the game. Please try again later.');
      });
  };

  return (
    <div className='mb-3'>
      <h2 className='my-3 text-3xl text-center'>Add New Game:</h2>
      <form className='mx-8 my-5' onSubmit={handleSubmit}>
        <div className='flex justify-between'>
          <div className="mb-3">
            <label htmlFor="title" className="text-xl mr-2">Game Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border-gray-400 py-1 block border-2 rounded-md text-lg pl-2"
              required
            />
            {errors.title && <p className="text-red-600">{errors.title}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="text-xl mr-2">Price:</label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="border-gray-400 pl-2 block py-1 border-2 rounded-md text-lg"
              required
            />
            {errors.price && <p className="text-red-600">{errors.price}</p>}
          </div>
        </div>
        <div className='flex justify-between'>
          <div className="mb-4">
          <label htmlFor="genre" className="text-xl mr-2">Genre:</label>
            <select
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="border-gray-400 block py-1 border-2 rounded-md text-lg pl-2"
              required
            >
              <option value="" disabled>Select a genre</option>
              {genres.map((item, index) => (
                <option key={index} value={item.genre}>{item.genre}</option>
              ))}
            </select>

          </div>
          <div className="mb-4">
            <label htmlFor="releaseDate" className="text-xl mr-2">Release Date:</label>
            <input
              type="date"
              id="releaseDate"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
              className="border-gray-400 px-14 block py-1 border-2 rounded-md text-lg pl-2"
              required
            />
          </div>
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="description" className="text-xl mr-2">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border-gray-400 py-1 border-2 rounded-md text-lg pl-2"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="text-xl mr-2">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="border-gray-400 w-full block py-1 border-2 rounded-md text-lg pl-2"
            required
          />
          {errors.image && <p className="text-red-600">{errors.image}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="apk" className="text-xl mr-2">APK File:</label>
          <input
            type="file"
            id="apk"
            name="apk"
            onChange={handleApkChange}
            className="border-gray-400 w-full block py-1 border-2 rounded-md text-lg pl-2"
            required
          />
          {errors.apk && <p className="text-red-600">{errors.apk}</p>}
        </div>
        <button type="submit" className="bg-green-600 hover:bg-green-700 duration-200 cursor-pointer w-full rounded-md py-2 text-lg text-white">
          Add Game
        </button>
      </form>
    </div>
  );
};

export default GameForm;
