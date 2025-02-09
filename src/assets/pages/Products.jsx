import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const apiBase = import.meta.env.VITE_API_BASE;
const apiPath = import.meta.env.VITE_API_PATH;

export default function Products() {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const response = await axios.get(`${apiBase}/v2/api/${apiPath}/products`);
    setProducts(response.data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <h1>產品列表</h1>
      <div className="container">
        <div className="row row-cols-3 g-5">
          {products.map((product) => {
            return (
              <Link className="col text-decoration-none" to={`${product.id}`} key={product.id}>
                <div className="card">
                  <img
                    src={product.imageUrl}
                    className="card-img-top img-fluid object-fit-cover"
                    style={{
                      height: "350px",
                    }}
                    alt={product.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
