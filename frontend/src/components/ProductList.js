import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function ProductList() {
  const {
    products,
    handleDeleteProduct,
    handleEdit,
    loading,
    searchTerm,
    sortOption,
  } = useContext(AppContext);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
  if (sortOption === "low-high") {
    return a.price - b.price;
  }

  if (sortOption === "high-low") {
    return b.price - a.price;
  }

  if (sortOption === "a-z") {
    return a.name.localeCompare(b.name);
  }

  if (sortOption === "z-a") {
    return b.name.localeCompare(a.name);
  }

  return 0;
});

  return (
    <div>
      {filteredProducts.length > 0 ? (
        sortedProducts.map((product) => (
          <div key={product._id}>
            <p>{product.name}</p>
            <p>${product.price}</p>

            <button
              onClick={() => handleDeleteProduct(product._id)}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>

            <button onClick={() => handleEdit(product)}>Edit</button>

            <hr />
          </div>
        ))
      ) : (
        <p>No products found</p>
      )}
      
    </div>
    
  );
}

export default ProductList;
