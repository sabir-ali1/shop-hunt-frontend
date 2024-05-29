import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'; 
import { useAuth } from '../../store/store';
import { toast } from 'react-toastify';

const SearchItem = ({cart,setCart}) => {
  const [searchData, setSearchData] = useState([]);
  const { term } = useParams();
  const { products,isLoggedIn } = useAuth();

  useEffect(() => {
    const data = products.filter((p) => p.name.toLowerCase().includes(term.toLowerCase()));
    setSearchData(data);
  }, [term, products]);


  const handleAddToCart = (id, img, price, name,title) => {
    if (isLoggedIn) {
      const addToCart = (id, img, price, name,title) => {
        const newItem = { id, img, price, name,title };
        setCart([...cart, newItem]); // Assuming cart is an array of items
        console.log("Cart:", cart);
      };
      addToCart(id, img, price, name,title);
      toast.success("Item added to cart");
    } else {
      toast.error("Please login");
    }
  };

  return (
    <>
      <h4 className='mt-8 lg:mx-16 mx-5 text-red-500 font-bold text-2xl'>your search Items</h4>

      <div className="flex flex-wrap justify-center">
        {searchData.length === 0 ? (
          <div>Data not found</div>
        ) : (
          searchData.map((data, index) => (
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
                <button onClick={() => handleAddToCart(data._id, data.img, data.price,data.name, data.title)} className='mt-3 bg-red-500 hover:bg-red-700 text-xs text-white font-bold py-2 px-3 rounded'>Add to cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default SearchItem;
