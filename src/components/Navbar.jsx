import React, { useState } from 'react';
import { BsCart } from "react-icons/bs";
import { ImSearch } from "react-icons/im";
import { Link, useNavigate } from 'react-router-dom';
import { RiMenu2Fill } from "react-icons/ri";
import { GiTireIronCross } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { useAuth } from '../store/store';


const Navbar = ({cart}) => {

    const navigate = useNavigate('/');

    const { isLoggedIn } = useAuth();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const [searcItem, setSearchItem] = useState("");

    // Function to toggle the menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate(`/search/${searcItem}`);
        setSearchItem("");
    }


    return (
        <div className="z-50 fixedpx-3 flex justify-between items-center sm:px-16 lg:px-30 py-3 border border-b-black">

            {/* -----------its a mobile hemburger  menu code start here-------------------- */}
            <div className='flex mx-3'>
                <RiMenu2Fill size={20} className='lg:hidden mt-1' onClick={toggleMenu} />
                <Link to="/" className="text-xl font-bold flex items-center ms-3">
                    <span className='text-red-500 font-bold lg:text-2xl'>Shop-</span>
                    <span className='text-blue-500 font-bold lg:text-2xl'>Hunt</span>
                </Link>
            </div>

            <div className={`fixed left-0 top-0 h-full border border-r-2 bg-white z-50 transform transition-transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden`}>
                <div className="py-8 px-4">
                    <ul className="space-y-8">
                        <GiTireIronCross size={20} onClick={toggleMenu} />

                        {
                            isLoggedIn ?
                                (<> 
                                <li><Link className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded" to="/admin" onClick={toggleMenu}>Admin</Link></li>
                                 <li><Link className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 rounded" to="/logout" onClick={toggleMenu}>Logout</Link></li>
                                   

                                </>) : (<>

                                    <li><Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded" to="/signup" onClick={toggleMenu}>Signup</Link></li>
                                    <li><Link className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded mt-3" to="/login" onClick={toggleMenu}>Login</Link></li>



                                </>)
                        }
                    </ul>
                </div>
            </div>

            {/*-----------------------hembuger menu code end here----------------------------- */}



            {/* ---------------------large screen navbar code start here------------------------ */}

            <div className="hidden sm:flex gap-1 items-center flex-grow justify-center">
                <form onSubmit={handleSubmit} className="relative">
                    <input value={searcItem} onChange={(e) => setSearchItem(e.target.value)} type='text' placeholder='Search...' className='border border-black px-6 py-1 focus:outline-none lg:w-80' />
                    <ImSearch size={25} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </form>
            </div>

            <div className="hidden sm:flex gap-3">
                <ul className="flex gap-5">
                    {/* <li><Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded" to="/signup" onClick={toggleMenu}>Signup</Link></li>
                    <li><Link className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded" to="/login" onClick={toggleMenu}>Login</Link></li> */}

                    {
                        isLoggedIn ?
                            (<>
                                <li><Link className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded" to="/admin" onClick={toggleMenu}>Admin</Link></li>

                                <li><Link className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 rounded" to="/logout" onClick={toggleMenu}>Logout</Link></li>


                            </>)
                            : (<>

                                <li><Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded" to="/signup" onClick={toggleMenu}>Signup</Link></li>
                                <li><Link className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded mt-3" to="/login" onClick={toggleMenu}>Login</Link></li>



                            </>)
                    }

                </ul>
            </div>

            {/*----------------- large screen code end here-------------------------------- */}


            {/*-------------------- small device code------------------------------ */}

            <div className="relative flex">
                <ImSearch size={25} className={`lg:hidden cursor-pointer mx-2`} onClick={toggleSearch} />
                {isLoggedIn ? <> <span className="absolute top-[-10px] right-[0px] bg-red-500 rounded-full text-white text-xs px-2 py-1">{cart.length}</span>
                    <Link to={"/cart"}><BsCart size={25} className='ms-4 mx-3' /></Link></> : <></>}

                {isSearchOpen && (
                    <div className='flex relative'>
                        <form onSubmit={handleSubmit} className="fixed top-0 left-0 w-full h-12 bg-gray-100 z-50 ps-3">
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                                <RxCross1 onClick={toggleSearch} className='text-black-600 text-xl font-bold ms-16' />
                            </div>
                            <input value={searcItem} onChange={(e) => setSearchItem(e.target.value)} type='text' placeholder='Search...' className='border border-b-pink-500 px-3 py-2 bg-white-100 mt-1 mx-20' />
                            <button>
                                <ImSearch size={25} className="absolute left-72 mx-3 pe-[-3] top-1/2 -translate-y-1/2 text-gray-500" />
                            </button>

                        </form>

                    </div>




                )}


            </div>



        </div>
    );
};

export default Navbar;
