import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function ProductList() {
  const {
  products,
  handleDeleteProduct,
  handleEdit
} = useContext(AppContext);

  return products.map((product) => (
    <div key={product._id}>
      <p>{product.name}</p>
      <p>${product.price}</p>

      <button
        onClick={() =>
          handleDeleteProduct(product._id)
        }
      >
        Delete
      </button>

      <button onClick={() => handleEdit(product)}>
  Edit
</button>

      <hr />
    </div>
  ));
}

export default ProductList;
