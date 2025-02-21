import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
const apiBase = import.meta.env.VITE_API_BASE;

export default function Login() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common["Authorization"] = token;
    if (token) navigate("/admin/products");
  }, []);

  const handleUserData = (e) => {
    const { value, name } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiBase}/v2/admin/signin`, userData);
      const { token, expired } = response.data;
      document.cookie = `loginToken=${token}; expires=${new Date(expired)}`;
      axios.defaults.headers.common["Authorization"] = token;
      navigate("/admin/products");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <h1>請登入</h1>
      <div className="row">
        <div className="col-6 mx-auto">
          <div className="mt-5">
            <label htmlFor="email">登入帳號</label>
            <input id="email" type="email" name="username" onChange={handleUserData} className="form-control" />
          </div>
          <div className="mt-5">
            <label htmlFor="password">登入密碼</label>
            <input id="password" type="password" name="password" onChange={handleUserData} className="form-control" />
          </div>
          <button type="button" className="btn btn-primary mt-5" onClick={handleLogin}>
            登入
          </button>
        </div>
      </div>
    </div>
  );
}
