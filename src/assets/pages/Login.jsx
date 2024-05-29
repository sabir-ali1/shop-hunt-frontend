import React, { useState } from 'react';
import { useAuth } from '../../store/store';
import { useNavigate } from 'react-router-dom';
// import { Toaster, toast } from 'react-hot-toast';
import { toast } from 'react-toastify';

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const { storeTokenInLs } = useAuth();
  const navigate = useNavigate();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({
      ...data,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://shop-hunt-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const res_data = await response.json();

      if (response.ok) {
        storeTokenInLs(res_data.token);
        toast.success("Login successful");

        navigate("/");
        setData({ email: "", password: "" });
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message)
      }
    } catch (error) {
      console.error("Error from login page:", error);
    }
  }

  return (
    <>
      {/* <Toaster classNamemt-5/> */}
      <div className="bg-gray-100 flex justify-center items-center">
        <div className="bg-white mx-3 p-8 rounded shadow-md w-full sm:w-96 mt-5">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" name="email" className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter your email" required value={data.email} onChange={handleInput} />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" id="password" name="password" className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter your password" required value={data.password} onChange={handleInput} />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
