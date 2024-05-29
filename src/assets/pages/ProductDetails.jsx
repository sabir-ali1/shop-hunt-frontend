import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../store/store';
import Banner from '../../components/Banner';
import { toast } from 'react-toastify';

const ProductDetails = ({ cart, setCart }) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { products, increaseQuantity, decreaseQuantity, isLoggedIn } = useAuth();

  useEffect(() => {
    const filterData = products.find((p) => p._id === id);
    setData(filterData);

    if (filterData) {
      const related = products.filter((p) => p.name === filterData.name && p._id !== id);
      setRelatedProducts(related);
    }
  }, [id, products]);

  const index = products.findIndex((p) => p._id === id);

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
      <div>
        <Banner />
      </div>
      <h4 className='mt-8 lg:mx-12 mx-5 text-red-500 font-bold text-2xl'> Items</h4>
      {data ? (
        <div className="sm:w-52 lg:mx-16 mx-5 mt-5 p-4 border rounded border-gray-300">
          <img src={data.img} alt="" className="lg:w-full w-25 mb-2" />
          <p className='font-bold'>{data.name}</p>
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
      ) : (
        <div>Loading...</div>
      )}

      <hr className='mt-5 mb-3 font-bold text-xl border-t-2 border-gray-500' />

      <h4 className='mt-5 lg:mx-12 mx-5 text-red-500 font-bold text-2xl text-center'>Related Products</h4>

      <div className="flex flex-wrap justify-center mt-5">
        {relatedProducts.map((item, index) => (
          <div key={index} className='sm:w-52 lg:mx-16 mx-5 mt-5 p-4 border rounded border-gray-300'>
            <Link to={`/product/${item._id}`}>
              <img src={item.img} alt="" />
            </Link>
            <p className='font-bold'>{item.name}</p>
            <p className='text-xs'>{item.title}</p>
            <p className='text-end font-bold'>Price:{item.price}</p>
            <p className='text-xs mt-1'>{item.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductDetails;
