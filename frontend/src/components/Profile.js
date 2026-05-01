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
  products,
  handleDeleteProduct,
  editId,
  setEditId,
  handleEdit
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
  editId={editId}
  
/>
<ProductList
 products={products}
 handleDeleteProduct={handleDeleteProduct}
 handleEdit={handleEdit}
/>
    </div>
  );
}

export default Profile;