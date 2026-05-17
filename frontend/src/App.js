import { useState, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import API from "./services/api";
import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";
import { Routes, Route, Navigate,  useNavigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const res = await API.post(
  "/users/login",
      {
        email,
        password,
      }
    );

    console.log(res.data);

    // 🔥 STORE TOKEN
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.data));
    setUser(res.data.data);
    fetchProducts();
    navigate("/profile"); // redirect to profile after login

  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};

const handleProductCreate = async () => {
  try {
    setLoading(true);
    setError("");

    

    if (editId) {
      // UPDATE
      await API.put(
        `/products/${editId}`,
        { name, price },
        
      );
    } else {
      // CREATE
      await API.post(
  "/products",
        { name, price },
        
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

    

    await API.delete(
      `/products/${id}`,
      
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
    

    const res = await API.get(
      "/users/profile",
      
    );

    setUser(res.data.data); // 🔥 store in state
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};

const fetchProducts = async () => {
  try {
    

    const res = await API.get(
  "/products",
      
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
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (token && storedUser) {
    setUser(JSON.parse(storedUser));
    fetchProducts();
  }
}, []);

const handleLogout = () => {
  localStorage.removeItem("token"); // remove token
  localStorage.removeItem("user"); // remove user
  setUser(null); // clear state
  navigate("/login"); // redirect to login
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
      searchTerm,
setSearchTerm,
sortOption,
setSortOption,
  setError
    }}
  >
    <div>
  <Routes>

    <Route
      path="/login"
      element={
        <LoginForm
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      }
    />

    <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile handleLogout={handleLogout} />
    </ProtectedRoute>
  }
/>

    <Route
      path="*"
      element={<Navigate to={user ? "/profile" : "/login"} />}
    />

  </Routes>
</div>
  </AppContext.Provider>
);
  
}



export default App;
