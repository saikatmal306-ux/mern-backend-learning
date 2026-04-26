import { useState, useEffect } from "react";
import axios from "axios";
import LoginForm from "./components/LoginForm";
import ProductForm from "./components/ProductForm";
import Profile from "./components/Profile";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState([]);

  const handleLogin = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/users/login",
      {
        email,
        password,
      }
    );

    console.log(res.data);

    // 🔥 STORE TOKEN
    localStorage.setItem("token", res.data.token);
    setUser(res.data.data);

  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};

const handleProductCreate = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:5000/api/products",
      {
        name,
        price
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log(res.data);

    fetchProducts();

    setName("");
    setPrice("");

  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};

const getProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/users/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setUser(res.data.data); // 🔥 store in state
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};

const fetchProducts = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/products",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setProducts(res.data.data);

  } catch(error){
    console.log(error.response?.data || error.message);
  }
};

useEffect(() => {
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const res = await axios.get(
        "http://localhost:5000/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data.data);
      fetchProducts();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  fetchUser();
}, []);

const handleLogout = () => {
  localStorage.removeItem("token"); // remove token
  setUser(null); // clear state
};
return (
  <div>
    {user ? (
      <Profile
        user={user}
        handleLogout={handleLogout}
        name={name}
        price={price}
        setName={setName}
        setPrice={setPrice}
        handleProductCreate={handleProductCreate}
        products={products}
        />
    ) : (
      <LoginForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    )}
  </div>
);
  
}



export default App;