function ProductList({ products }) {
  return (
    <div>
      <h2>My Products</h2>

      {products.map((product) => (
        <div key={product._id}>
          <p>{product.name}</p>
          <p>${product.price}</p>
          <hr />
        </div>
      ))}

    </div>
  );
}

export default ProductList;