import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function ProductForm() {
  const {
  name,
  price,
  setName,
  setPrice,
  handleProductCreate,
  editId
} = useContext(AppContext);

  return (
    <div>
      <h1>Create Product</h1>

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e)=>setPrice(e.target.value)}
      />

      <button onClick={handleProductCreate}>
  {editId ? "Update Product" : "Add Product"}
</button>
    </div>
  );
}

export default ProductForm;