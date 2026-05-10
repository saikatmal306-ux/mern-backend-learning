import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Profile({ handleLogout }) {
  const {
  user,
  name,
  price,
  setName,
  setPrice,
  handleProductCreate,
  editId,
  searchTerm,
setSearchTerm
} = useContext(AppContext);
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>

      <button onClick={handleLogout}>
        Logout
      </button>
      <ProductForm
  name={name}
  price={price}
  setName={setName}
  setPrice={setPrice}
  handleProductCreate={handleProductCreate}
  editId={editId}
  
/>

<input
  type="text"
  placeholder="Search products"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

<ProductList />
    </div>
  );
}

export default Profile;
