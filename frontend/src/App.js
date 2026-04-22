import { useState, useEffect } from "react";
import axios from "axios";
import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";

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
      <Profile
        user={user}
        handleLogout={handleLogout}
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