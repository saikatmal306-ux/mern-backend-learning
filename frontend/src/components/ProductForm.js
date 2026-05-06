import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function ProductForm() {
  const {
  name,
  price,
  setName,
  setPrice,
  handleProductCreate,
  editId,
  loading,
  error,
  setError
} = useContext(AppContext);

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (error) setError("");
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    if (error) setError("");
  };

  return (
    <div>
      <h1>Create Product</h1>

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={handleNameChange}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={handlePriceChange}
      />

      <p style={{ color: "red", minHeight: "24px", margin: "8px 0" }}>
        {error}
      </p>

      <button
        type="button"
        onClick={handleProductCreate}
        disabled={loading || !name.trim() || !price}
      >
        {loading
          ? "Processing..."
          : editId
          ? "Update Product"
          : "Add Product"}
      </button>
    </div>
  );
}

export default ProductForm;
