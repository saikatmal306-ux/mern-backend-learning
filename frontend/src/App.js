import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

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
  <div>
    <h2>{user.name}</h2>
    <p>{user.email}</p>
    <button onClick={handleLogout}>Logout</button>
  </div>
) : (
  <div>
    <h1>Login</h1>

    <input
      type="email"
      placeholder="Enter email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <input
      type="password"
      placeholder="Enter password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <button onClick={handleLogin}>Login</button>
  </div>
)}
    </div>
  );
}



export default App;