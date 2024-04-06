import React, { useContext, useState } from 'react';
import AdminContext from '../Context/AdminContext';

const AdminNews = () => {
    const {newsData, handleDelete}=useContext(AdminContext);
    console.log(newsData);
	const [error, setError]=useState('');
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
			alert('Successfully added!!');
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
			setError("Something went wrong!")
		});
	};
	
    return (
    <>
        <div className="max-w-md mx-auto mt-10 bg-gray-900 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Add News Article</h2>
            <form onSubmit={handleSubmit} >
                <div className="mb-4">
                    <label className="block text-white mb-2" htmlFor="title">Title</label>
                    <input
                        type="text"
						required
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="p-2 block w-full bg-gray-800 text-white border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter title"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white mb-2" htmlFor="description">Description</label>
                    <textarea
                        id="description"
						required
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="p-2 block w-full bg-gray-800 text-white border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter description"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white mb-2" htmlFor="date">Date</label>
                    <input
                        type="date"
						required
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="p-2 block w-full bg-gray-800 text-white border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white mb-2" htmlFor="author">Author</label>
                    <input
                        type="text"
						required
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="p-2 block w-full bg-gray-800 text-white border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter author name"
                    />
                </div>
				<div className="mb-4">
                    <label className="block text-white mb-2" htmlFor="image">Image</label>
                    <input
                        type="file"
						required
                        id="image"
                        name="image"                       
                        onChange={handleImageChange}
                        className=" p-2 block w-full bg-gray-800 text-white border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label className=" block text-white mb-2" htmlFor="sourceLink">Source Link</label>
                    <input
                        type="text"
						required
                        id="sourceLink"
                        name="sourceLink"
                        value={formData.sourceLink}
                        onChange={handleChange}
                        className="p-2 block w-full bg-gray-800 text-white border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter source link"
                    />
                </div>
				<div>
					<p className='text-red-500 mb-2'>{error}</p>
				</div>
                <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit
                </button>
            </form>
        </div>
        <div className="text-white dark-mode overflow-x-auto my-20">
            <h1 className='text-2xl ml-20 mb-5'>News Data:</h1>
            <table className="mx-auto max-w-6xl divide-y divide-gray-700">
                <thead>
                    <tr>
                        <th className="px-2 py-3 bg-gray-800 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                        <th className="px-2 py-3 bg-gray-800 text-left text-xs font-medium uppercase tracking-wider">Title</th>
                        <th className="px-2 py-3 bg-gray-800 text-left text-xs font-medium uppercase tracking-wider">Description</th>
                        <th className="px-2 py-3 bg-gray-800 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                        <th className="px-2 py-3 bg-gray-800 text-left text-xs font-medium uppercase tracking-wider">Author</th>
                        <th className="px-2 py-3 bg-gray-800 text-left text-xs font-medium uppercase tracking-wider">Action</th>
                        {/* <th className="px-6 py-3 bg-gray-800 text-left text-xs font-medium uppercase tracking-wider">Source Link</th>
                        <th className="px-6 py-3 bg-gray-800 text-left text-xs font-medium uppercase tracking-wider">Image</th> */}
                    </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {newsData.map(news => (
                        <tr key={news.id} className="hover:bg-gray-700">
                            <td className="px-2 py-4 whitespace-nowrap">{news.news_id}</td>
                            <td className="px-2 py-4 whitespace-wrap">{news.title}</td>
                            <td className="px-2 py-4 whitespace-wrap">{news.description}</td>
                            <td className="px-2 py-4 whitespace-nowrap">{news.date}</td>
                            <td className="px-2 py-4 whitespace-nowrap">{news.Author}</td>
                            <td className="px-2 py-4 whitespace-nowrap"><a target='_blank' href={news.link}><button className='bg-blue-700 hover:bg-blue-600 border-gray-800 border-2 duration-200 px-2 py-1 rounded-lg mr-1'>View</button></a><button onClick={()=>handleDelete(news.news_id)} className='bg-red-700 border-gray-800 border-2 rounded-lg text-white px-2 py-1 hover:cursor-pointer hover:bg-red-600 duration-200 '>Delete</button></td>
                            {/* <td className="px-6 py-4 whitespace-nowrap"><a href={news.link} className="text-blue-400 hover:underline">{news.link}</a></td>
                            <td className="px-6 py-4 whitespace-nowrap"><img src={`http://localhost/onlinegamestore/admin/${news.image_url}`} alt={news.title} className="h-10 w-10" /></td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
};

export default AdminNews;
