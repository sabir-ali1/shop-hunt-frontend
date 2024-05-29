import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [products, setProducts] = useState([]);
  const [data, setData] = useState("")
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Store token in local storage
  const storeTokenInLs = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  }

  // Logout user
  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
    setData("");
  }

  // Check if user is logged in
  const isLoggedIn = !!token;

  // Function to increase quantity
  const increaseQuantity = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity += 1;
    setProducts(updatedProducts);
  };

  // Function to decrease quantity
  const decreaseQuantity = (index) => {
    const updatedProducts = [...products];
    if (updatedProducts[index].quantity > 0) {
      updatedProducts[index].quantity -= 1;
      setProducts(updatedProducts);
    }
  };

  // Fetch data from backend
  const getProduct = async () => {
    try {
      const response = await fetch("https://shop-hunt-backend.onrender.com/api/product/service", {
        method: "GET"
      });

      if (response.ok) {
        const data = await response.json();
        // Add quantity property to each product object
        const productsWithData = data.map(product => ({ ...product, quantity: 0 }));
        setProducts(productsWithData);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  //get user data from backend

  const getuserData = async () => {
    try {
      const response = await fetch("https://shop-hunt-backend.onrender.com/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        const res_data = await response.json();
        setData(res_data);
      }

    } catch (error) {
      console.log("erro from fetch user data", error);
    }
  }

  //data delelte logic 

  



  useEffect(() => {
    getProduct();
    if (token) {
      getuserData();
    }
  }, [token]); // Empty dependency array to fetch data only once on mount

  return (
    <AuthContext.Provider value={{ products, increaseQuantity, decreaseQuantity, storeTokenInLs, LogoutUser, isLoggedIn, data}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
}
