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
setSearchTerm,
sortOption,
setSortOption
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

<select
  value={sortOption}
  onChange={(e) => setSortOption(e.target.value)}
>
  <option value="">Sort Products</option>
  <option value="low-high">Price: Low to High</option>
  <option value="high-low">Price: High to Low</option>
  <option value="a-z">Name: A to Z</option>
  <option value="z-a">Name: Z to A</option>
</select>

<ProductList />
    </div>
  );
}

export default Profile;
