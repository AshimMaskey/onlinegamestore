import { showToast } from '@/Components/toast/toast';
import React, { useState, useEffect } from 'react';

function NewsUpdate({ news, onClose }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (news) {
            setTitle(news.title);
            setDescription(news.description);
            setDate(news.date);
            setAuthor(news.Author);
        }
    }, [news]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', news.news_id);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('date', date);
        formData.append('author', author);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch('http://localhost/onlinegamestore/admin/update_news.php', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            if (result.success) {
               showToast({message:'News updated successfully!', condition:'success'});
                onClose(false);
            } else {
                showToast({message:'Failed to update news.', condition:'error'});
            }
        } catch (error) {
            console.error('Error updating news:', error);
        }
    };

    return (
        <div className='mb-3'>
            <h2 className='my-3 text-3xl text-center'>Update News Article:</h2>
            <form className='mx-8 my-5' onSubmit={handleSubmit} encType='multipart/form-data'>
                <div className='flex justify-between'>
                    <div className="mb-3">
                        <label htmlFor="title" className="text-xl mr-2">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
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
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
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
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                        onChange={(e) => setImage(e.target.files[0])}
                        className="border-gray-400 w-full block py-1 border-2 rounded-md text-lg pl-2"
                        accept='image/*'
                    />
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

export default NewsUpdate;
