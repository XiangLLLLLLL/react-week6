import { Outlet } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import AdminNavbar from "./components/AdminNavbar";
import Toast from "./components/Toast";
const apiBase = import.meta.env.VITE_API_BASE;
const apiPath = import.meta.env.VITE_API_PATH;
export default function Admin() {
  const [products, setProducts] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const getData = async (page = 1) => {
    try {
      const response = await axios.get(`${apiBase}/v2/api/${apiPath}/admin/products?page=${page}`);
      setProducts(response.data.products);
      setPageInfo(response.data.pagination);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("取得產品資料失敗");
      }
    }
  };
  const navigate = useNavigate();
  // 登入驗證功能
  const checkLogin = async () => {
    try {
      await axios.post(`${apiBase}/v2/api/user/check`);
      getData();
      alert("歡迎回來");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        console, log(error);
      }
      navigate("/");
    }
  };
  useEffect(() => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      checkLogin();
    }
  }, []);
  return (
    <>
      <AdminNavbar />
      <div className="container mt-3">
        <Outlet context={{ products, pageInfo, getData }} />
      </div>
      <Toast />
    </>
  );
}
