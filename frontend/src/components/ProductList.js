function ProductList({
 products,
 handleDeleteProduct
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

      <hr />
    </div>
  ));
}

export default ProductList;
