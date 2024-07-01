import React, { useState } from 'react';
import EditForm from './AdminProfileUpdate/EditForm';
import NewsForm from './AdminNews/NewsForm';

import ViewNews from './AdminNews/ViewNews';

const AdminNews = () => {
   const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div className='ml-10 mt-5'>
                <div>
                    <button
                        onClick={() => setShowModal(true)}
                        className='text-white mb-3 bg-indigo-600 py-1 hover:bg-indigo-800 duration-200 px-2 rounded-md'
                    >
                        Add News
                    </button>
                </div>
               <ViewNews/>
            </div>
            <EditForm isVisible={showModal} onClose={setShowModal}>
                <NewsForm onClose={setShowModal} />
            </EditForm>
        </>
    );
};

export default AdminNews;
