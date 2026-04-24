import ProductForm from "./ProductForm";

function Profile({
  user,
  handleLogout,
  name,
  price,
  setName,
  setPrice,
  handleProductCreate
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
    </div>
  );
}

export default Profile;