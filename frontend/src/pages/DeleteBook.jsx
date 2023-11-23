import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [bookTitle, setBookTitle] = useState('');
  const [confirmTitle, setConfirmTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBookTitle(response.data.title);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
});
  const handleDelete = () => {
    if (confirmTitle === bookTitle) {
      setLoading(true); // Set loading state to true
      axios
        .delete(`http://localhost:5555/books/${id}`)
        .then(() => {
          alert('Book deleted successfully!');
          navigate('/');
        })
        .catch((error) => {
          alert('An error happened. Please check console.');
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setErrorMessage('Judul buku yang dikonfirmasi tidak cocok');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl my-8">Delete Book</h1>
      <div className='flex flex-col border-2 border-sky-400 text-center rounded-xl p-4 mx-auto w-[600px]'>
        <label>Apakah anda yakin ingin menghapus buku <span className='font-bold'>{bookTitle}</span></label>
        
        <div>
          <label>Tulis ulang Judul Buku untuk menghapus buku:</label>
          <input
            type="text"
            value={confirmTitle}
            className="border-2 border-gray-500 px-3 py-1 my-2 "
            onChange={(e) => setConfirmTitle(e.target.value)}
          />
        </div>
        {errorMessage && <p className='bg-red-500 w-fit items-center text-white rounded-md font-bold my-3'>{errorMessage}</p>}
        {loading ? <Spinner/> : ''}
        <button className='bg-red-500 text-white px-4 py-2 rounded-md' onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default DeleteBook;