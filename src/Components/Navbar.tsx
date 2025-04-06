import React from 'react'
import {Link} from 'react-router'

const Navbar = () => {
  return (
    <div>
        <div className='w-full py-6 bg-blue-950 text-white text-xl flex justify-center'>
            <ul className='flex gap-20'>
                <Link to='/' className='hover:text-blue-300 duration-150'>New Video</Link>
                <Link to='/processed' className='hover:text-blue-300 duration-150'>Processed Videos</Link>
            </ul>
        </div>
    </div>
  )
}

export default Navbar