import React, { useState, useEffect } from 'react';
import Confirm from '@/Components/Confirm/Confirm';
import Pagination1 from '@/Components/Pagination/Pagination1';
import { showToast } from '@/Components/toast/toast';

const Genre = () => {
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState('');
  const [errors, setErrors] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Pagination calculation
  const indexOfLastGenre = currentPage * itemsPerPage;
  const indexOfFirstGenre = indexOfLastGenre - itemsPerPage;
  const currentGenres = genres.slice(indexOfFirstGenre, indexOfLastGenre);
  const totalPages = Math.ceil(genres.length / itemsPerPage);

  useEffect(() => {
    // Fetch existing genres from the backend
    fetch('http://localhost/onlinegamestore/admin/get_genres.php')
      .then(response => response.json())
      .then(data => setGenres(data))
      .catch(error => console.error('Error fetching genres:', error));
  }, []);

  const handleAddGenre = (e) => {
    e.preventDefault();

    if (newGenre.trim().length === 0) {
      setErrors('Genre name cannot be empty');
      return;
    }

    // Add new genre to the backend
    fetch('http://localhost/onlinegamestore/admin/add_genre.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newGenre }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setGenres([...genres, { id: data.id, genre: newGenre }]); // Assuming backend returns id
          setNewGenre('');
          setErrors('');
		  showToast({message:"genre added successfully!", condition:"success"});
        } else {
          setErrors(data.message || 'Error adding genre');
        }
      })
      .catch(error => {
        console.error('Error adding genre:', error);
        setErrors('An error occurred while adding the genre. Please try again later.');
      });
  };

  const handleRemoveGenre = (id) => {
    // Remove genre from the backend using GET method
    fetch(`http://localhost/onlinegamestore/admin/remove_genre.php?id=${id}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setGenres(genres.filter(g => g.id !== id));
		  showToast({message:"genre deleted successfully!", condition:"success"});
        } else {
          setErrors(data.message || 'Error removing genre');
        }
      })
      .catch(error => {
        console.error('Error removing genre:', error);
        setErrors('An error occurred while removing the genre. Please try again later.');
      });
  };

  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [genreId, setGenreId] = useState(null);

  const handleDelete = (genre_id) => {
    setIsOpenConfirm(true);
    setGenreId(genre_id);
  };

  const handleConfirm = () => {
    handleRemoveGenre(genreId);
    setIsOpenConfirm(false);
  };

  const handleCancel = () => {
    setIsOpenConfirm(false);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  let SN = (currentPage - 1) * itemsPerPage;

  return (
    <div className='p-4'>
      <h2 className='text-white text-2xl mb-4'>Manage Genres</h2>
      <form onSubmit={handleAddGenre} className='mb-4'>
        <input
          type='text'
          value={newGenre}
          onChange={(e) => setNewGenre(e.target.value)}
          placeholder='New genre name'
          className='border-gray-400 mb-3 border-2 rounded-md px-2 py-1 text-lg'
        />
        <button type='submit' className='bg-green-600 hover:bg-green-700 text-white py-1 px-4 rounded-md ml-2'>
          Add Genre
        </button>
        {errors && <p className='text-red-600 mt-2'>{errors}</p>}
      </form>
      <table className='rounded-lg border-collapse'>
        <thead>
          <tr>
            <th className='rounded-lg bg-black text-white font-bold px-4 py-2 text-left'>SN</th>
            <th className='rounded-lg bg-black text-white font-bold px-4 py-2 text-left'>Genre Name</th>
            <th className='rounded-lg bg-black text-white font-bold px-4 py-2 text-left'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentGenres.map((item, index) => (
            <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-950 dark:bg-gray-950' : 'bg-gray-900 dark:bg-gray-900'}>
              <td className='px-4 text-white py-2'>{SN + index + 1}</td>
              <td className='px-4 text-white py-2'>{item.genre}</td>
              <td className='px-4 py-2'>
                <button
                  onClick={() => handleDelete(item.id)}
                  className='bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md'
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination1 currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
      <Confirm message="Delete the genre?" onCancel={handleCancel} onConfirm={handleConfirm} isOpen={isOpenConfirm} />
    </div>
  );
};

export default Genre;
