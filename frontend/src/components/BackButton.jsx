import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const BackButton = ({ destination = '/' }) => {
  return (
    <div className='flex'>
        <Link
            to={destination}
            className='text-white bg-sky-800 hover:text-yellow-300 px-4 py-2 rounded-lg w-fit'
            role='button'
        >
            <BsArrowLeft className='text-2x10' />
        </Link>
    </div>
  )
}

export default BackButton