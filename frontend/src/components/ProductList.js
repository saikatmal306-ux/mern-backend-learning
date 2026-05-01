function ProductList({
 products,
 handleDeleteProduct,
 handleEdit
}) {
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
