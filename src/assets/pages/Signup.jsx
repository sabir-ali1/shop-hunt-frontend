import React, { useState } from 'react';
import { useAuth } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {

  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
    password: ""
  });

const {storeTokenInLs} = useAuth();
const navigate = useNavigate();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData({
      ...data,
      [name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://shop-hunt-backend.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const res_data = await response.json();
      console.log(res_data);

      if (response.ok) {
       
        storeTokenInLs(res_data.token);
        toast.success("register successful");

        navigate("/")
        setData({
          username: "", email: "", phone: "", password: ""
        })
      }else{
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message)
      }

    } catch (error) {
      console.log("error from register page");
    }


  }

  return (
    <>
      <div className="bg-gray-100  flex justify-center items-center">
        <div className="bg-white mx-3 p-8 rounded shadow-md w-full sm:w-96 mt-5">
          <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input type="text" id="username" name="username" className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter your username" required value={data.username} onChange={handleInput} />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" name="email" className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter your email" required value={data.email} onChange={handleInput} />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input type="tel" id="phone" name="phone" className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter your phone number" required value={data.phone} onChange={handleInput} />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" id="password" name="password" className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter your password" required value={data.password} onChange={handleInput} />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
