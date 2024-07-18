import { showToast } from '@/Components/toast/toast';
import React, { useState } from 'react';

function NewsForm({ onClose }) {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    author: '',
    image: null,
    sourceLink: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevState => ({
      ...prevState,
      image: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('date', formData.date);
    formDataToSend.append('author', formData.author);
    formDataToSend.append('image', formData.image);
    formDataToSend.append('sourceLink', formData.sourceLink);

    fetch('http://localhost/onlinegamestore/admin/add_news.php', {
      method: 'POST',
      body: formDataToSend
    })
      .then(response => {
        console.log('Success:', response);
        showToast({message:'News successfully added!!', condition:'success'});
        onClose(false);
        setFormData({
          title: '',
          description: '',
          date: '',
          author: '',
          image: null,
          sourceLink: ''
        });
        setError('');
      })
      .catch((error) => {
        console.error('Error:', error);
        setError("Something went wrong!");
      });
  };

  return (
    <div className='mb-3'>
      <h2 className='my-3 text-3xl text-center'>Add News Article:</h2>
      <form className='mx-8 my-5' onSubmit={handleSubmit}>
        <div className='flex justify-between'>
          <div className="mb-3">
            <label htmlFor="title" className="text-xl mr-2">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border-gray-400 py-1 block border-2 rounded-md text-lg pl-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="text-xl mr-2">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border-gray-400 px-14 pl-2 block py-1 border-2 rounded-md text-lg"
              required
            />
          </div>
        </div>
        <div className='flex justify-between'>
          <div className="mb-4">
            <label htmlFor="author" className="text-xl mr-2">Author:</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="border-gray-400 block py-1 border-2 rounded-md text-lg pl-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="sourceLink" className="text-xl mr-2">Source Link:</label>
            <input
              type="text"
              id="sourceLink"
              name="sourceLink"
              value={formData.sourceLink}
              onChange={handleChange}
              className="border-gray-400 block py-1 border-2 rounded-md text-lg pl-2"
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
        </div>
        <div>
          <p className='text-red-500 mb-2'>{error}</p>
        </div>
        <button type="submit" className="bg-green-600 hover:bg-green-700 duration-200 cursor-pointer w-full rounded-md py-2 text-lg text-white">
          Add News
        </button>
      </form>
    </div>
  );
}

export default NewsForm;
