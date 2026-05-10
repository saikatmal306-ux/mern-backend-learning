import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function ProductList() {
  const {
    products,
    handleDeleteProduct,
    handleEdit,
    loading,
    searchTerm,
  } = useContext(AppContext);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  return (
    <div>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
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
