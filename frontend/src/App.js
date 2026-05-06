import { useState, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import axios from "axios";
import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    fetchProducts();

  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};

const handleProductCreate = async () => {
  try {
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");

    if (editId) {
      // UPDATE
      await axios.put(
        `http://localhost:5000/api/products/${editId}`,
        { name, price },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    } else {
      // CREATE
      await axios.post(
        "http://localhost:5000/api/products",
        { name, price },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    }

    fetchProducts();

    setName("");
    setPrice("");
    setEditId(null);

  } catch (error) {
  setError(error.response?.data?.message || "Something went wrong");
}finally {
  setLoading(false);
}
};

const handleDeleteProduct = async (id) => {
  try {
     setLoading(true);

    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/products/${id}`,
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    fetchProducts();

  } catch(error){
    console.log(error.response?.data || error.message);
  }finally {
    setLoading(false);
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

const handleEdit = (product) => {
  setEditId(product._id);
  setName(product.name);
  setPrice(product.price);
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
  <AppContext.Provider
    value={{
      user,
      setUser,
      name,
      setName,
      price,
      setPrice,
      products,
      setProducts,
      editId,
      setEditId,
      handleProductCreate,
      handleDeleteProduct,
      handleEdit,
      loading,
      setLoading,
      error,
  setError
    }}
  >
    <div>
      {user ? (
        <Profile handleLogout={handleLogout} />
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
  </AppContext.Provider>
);
  
}



export default App;
