import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

function Profile({
  user,
  handleLogout,
  name,
  price,
  setName,
  setPrice,
  handleProductCreate,
  products
}) {
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
  
/>
<ProductList products={products} />
    </div>
  );
}

export default Profile;