import React, { useState } from 'react';
import { useAuth } from '../../store/store';
import { toast } from 'react-toastify';

const Cart = ({ cart, setCart }) => {
  const { data } = useAuth();
  const [cartEmpty, setCartEmpty] = useState(false);

  // Function to parse the price from a string and return it as a number
  const parsePrice = (priceString) => {
    // Remove any non-digit characters from the string
    const cleanedPriceString = priceString.replace(/\D/g, '');
    // Parse the cleaned string to a number
    return parseInt(cleanedPriceString);
  };

  // Calculate subtotal by summing up all the parsed prices in the cart
  const subtotal = cart.reduce((total, product) => total + parsePrice(product.price), 0);

  const delivery = 50;
  const total = subtotal + delivery;

  const handleDelete = (index) => {
    // Create a new cart array without the item at the specified index
    const newCart = [...cart.slice(0, index), ...cart.slice(index + 1)];
    // Update the cart state
    setCart(newCart);
  };

  const order = async () => {
    try {
      if (subtotal <= 0) {
        toast.warning("Please select your card");
      } else {
        // Add code to handle the order when subtotal is greater than 0
        toast.success("Order successful");
        setCart([]);
        setCartEmpty(true);
      }
    } catch (error) {
      console.log("Error from order button:", error);
    }
  }

  return (
    <>
      <div>
        <h3 className='text-center mt-16 font-bold text-red-500 text-2xl'>{data.username} your cart items</h3>
      </div>

      {cartEmpty ? (
        <div>
          <p> </p>
        </div>
      ) : (
        <div>
          {cart.map((product, index) => {
            return (
              <div className='border-b mt-5 border-black' key={index}>
                <div className="lg:flex lg:gap-3 lg:justify-between lg:items-start lg:mx-24 mx-2 mt-10 mb-2">
                  <img className='lg:h-20 h-16' src={product.img} alt="" />
                  <div className="lg:flex lg:flex-col">
                    <p className='mt-5'>Name: {product.name}</p>
                    <p className='mt-5'>Price: {product.price}</p>
                    <p className='mt-5 flex-wrap'>Title {product.title}</p>
                  </div>
                  <div className="lg:mt-5 mt-5 text-center">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 rounded" onClick={() => handleDelete(index)}>Delete</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="total mt-16 mx-5 lg:mx-28">
        <h2 className='font-bold text-3xl'>Cart Totals</h2>
        <div className='mt-4'>
          <div className='border-b border-black justify-between flex w-80'>
            <p className='mx-2' id='sub'>Subtotal</p>
            <p className='mx-2'>{subtotal}</p>
          </div>
          <div className='mt-3 border-b border-black w-80 justify-between flex'>
            <p className='mx-2'>Delivery fee</p>
            <p className='mx-2'> {delivery}</p>
          </div>
          <div className='mt-3 w-80 justify-between flex'>
            <p className='mx-2'>Total</p>
            <p className='mx-2'>{subtotal > 0 ? total : 0}</p>
          </div>
        </div>
      </div>

      <br />

      <div className='w-80 tota text-center bg-green-500 font-2xl hover:bg-green-700 text-white rounded-lg mx-5 lg:mx-28'>
        <button onClick={order}>Buy Now</button>
      </div>
    </>
  );
};

export default Cart;
