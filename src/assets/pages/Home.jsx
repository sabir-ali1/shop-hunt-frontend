import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../../components/Banner';
import { useAuth } from '../../store/store';
import { toast } from 'react-toastify';
import { Watch } from 'react-loader-spinner';


const Home = ({ cart, setCart }) => {

  const { products, increaseQuantity, decreaseQuantity, data, isLoggedIn } = useAuth();

  const [filterData, setFilterData] = useState(products);

  const handleChange = (e) => {
    const filter = e.target.value;
    if (filter === "All") {
      setFilterData(products);
    } else {
      const filteredItems = products.filter((p) => p.name.includes(filter));
      setFilterData(filteredItems);
    }
  }

  const handleAddToCart = (id, img, price, name, title) => {
    if (isLoggedIn) {
      const addToCart = (id, img, price, name, title) => {
        const newItem = { id, img, price, name, title };
        setCart([...cart, newItem]); // Assuming cart is an array of items
        console.log("Cart:", cart); // Logging the updated cart
      };

      addToCart(id, img, price, name, title);
      toast.success("Item added to cart");
    } else {
      toast.error("Please login");
    }
  };

  return (
    <>
      <Banner />

      <div className='mt-5 lg:mx-16 mx-5'>
        <label htmlFor="genre" className='me-5 font-bold text-xl text-pink-600'>Product Filter:</label>
        <select className='border border-pink-500' id="genre" onChange={handleChange}>
          <option value="All">All</option>
          <option value="mobile">Mobile</option>
          <option value="laptop">Laptop</option>
          <option value="clothe">Clothes</option>
          <option value="watche">Watches</option>
          {/* Add more options if needed */}
        </select>
      </div>

      <h4 className='mt-8 lg:mx-16 mx-5 text-red-500 font-bold text-3xl'>Electronics Items</h4>
      <p className='lg:mx-20 mx-6 text-sm'>Welcome to <span className='text-red-500 font-bold'>{data.username}</span> Our Shop-Hunt</p>
      <div className="flex flex-wrap justify-center">
        {filterData.length > 0 ? (
          filterData.map((data, index) => (
            <div key={index} className="sm:w-52 mx-5 mt-5 p-4 border rounded border-gray-300">
              <Link to={`/product/${data._id}`}>
                <img src={data.img} alt="" className="lg:w-full w-25 mb-2" />
              </Link>
              <p className='font-bold'>{data.name.toUpperCase()}</p>
              <p className='text-xs'>{data.title}</p>
              <p className='text-end font-bold'>Price:{data.price}</p>
              <p className='text-xs mt-1'>{data.description}</p>
              <div className='flex items-start gap-3'>
                <span className='mt-3 text-xl cursor-pointer' onClick={() => decreaseQuantity(index)}>-</span>
                <span className='mt-3 text-xl cursor-default'>{data.quantity}</span>
                <span className='mt-3 text-xl cursor-pointer' onClick={() => increaseQuantity(index)}>+</span>
                <button onClick={() => handleAddToCart(data._id, data.img, data.price, data.name, data.title)} className='mt-3 bg-red-500 hover:bg-red-700 text-xs text-white font-bold py-2 px-3 rounded'>Add to cart</button>

              </div>
            </div>
          ))
        ) : (
          <div className='mt-16 lg:text-2xl ms-2'>
            <span className='text-red-500 font-bold'>Loading...</span>
            <Watch
              visible={true}
              height="80"
              width="80"
              radius="48"
              color="#4fa94d"
              ariaLabel="watch-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
