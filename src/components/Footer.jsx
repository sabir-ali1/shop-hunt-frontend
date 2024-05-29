import React from 'react'
import { IoLogoInstagram } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { FaTwitter } from "react-icons/fa";



const Footer = () => {
    return (
        <>

            <div className='lg:mt-12 mt-20 bg-black text-white'>
                <div className='mx-36 lg:flex lg:gap-20 justify-between text-center'>
                    <span className='text-red-500 font-bold lg:text-2xl lg:mt-5 text-xl'>Shop- <span className='text-blue-500 font-bold lg:text-2xl'>Hunt</span></span>

                    <div className='mt-6'>
                        <p className=' font-bold'>Contact us</p>
                        <Link to="https://www.instagram.com/sabirali002/" target="_blank" rel="noopener noreferrer">
                            <p className='text-center flex mt-2 ms-3 lg:ms-1'>
                                <IoLogoInstagram className='text-red-500 mt-1 text-xm ms-2' />
                                <span className='ms-2 text-xs '>Insta</span>
                            </p>
                        </Link>
                        <Link to="https://www.instagram.com/sabirali002/" target="_blank" rel="noopener noreferrer">
                            <p className='text-center flex mt-2 ms-3 lg:ms-1'>
                                <FaTwitter className='text-red-500 mt-1 text-xs ms-2' />
                                <span className='ms-2 text-xs'>Twitter</span>
                            </p>
                        </Link>
                    </div>

                    <div>
                        <p className='mt-5 font-bold lg:me-5'>About us</p>

                        <p className='text-center flex mt-2 ms-3 lg:ms-1 text-xs'>
                            Pay on Merchants
                        </p>
                        <p className='text-center flex mt-2 ms-3 lg:ms-1 text-xs'>
                            Advertise Your Products
                        </p>
                        <p className='text-center flex mt-2 ms-3 lg:ms-1 text-xs'>
                            Fulfilment by Amazon
                        </p>
                        <p className='text-center flex mt-2 ms-3 lg:ms-1 text-xs'>
                            Become an Affiliate
                        </p>


                    </div>
                </div>
                <br /><br />
            </div>
        </>
    )
}

export default Footer