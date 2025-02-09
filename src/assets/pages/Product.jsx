import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";

const apiBase = import.meta.env.VITE_API_BASE;
const apiPath = import.meta.env.VITE_API_PATH;
export default function Product() {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const handleBackLastPage = () => {
    navigate(-1);
  };

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${apiBase}/v2/api/${apiPath}/product/${id}`);
      setProduct(response.data.product);
    })();
  }, []);
  return (
    <>
      <h1>產品詳細</h1>
      <button type="button" className="btn btn-primary" onClick={handleBackLastPage}>
        回上一頁
      </button>
      <div className="container mt-3">
        <div className="row g-5">
          <div className="col-6">
            <img
              src={product.imageUrl}
              className="card-img-top img-fluid object-fit-cover"
              style={{
                height: "360px",
              }}
              alt={product.title}
            />
          </div>
          <div className="col-6">
            <div className="mb-3">
              <h3>產品名稱:{product.title}</h3>
            </div>
            <div className="mb-3">
              <h3>產品種類:{product.category}</h3>
            </div>
            <div className="mb-3">
              <h3>
                <del>原價:{product.origin_price}</del>
              </h3>
            </div>
            <div className="mb-3">
              <h3>特價:{product.price}</h3>
            </div>
            <div className="mb-3">
              <h3>產品描述:</h3>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
