import { NavLink } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { pushMessage } from "../slice/toastSlice";
import { useNavigate } from "react-router";
const apiBase = import.meta.env.VITE_API_BASE;
export default function Navbar() {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  axios.defaults.headers.common["Authorization"] = token;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.post(`${apiBase}/v2/logout`);
      dispatch(pushMessage({ success: response.data.success, text: response.data.message }));
      document.cookie = "loginToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      navigate("/login");
    } catch (error) {
      const { success, message } = error.response.data;
      dispatch(
        pushMessage({
          success,
          text: Array.isArray(message)
            ? message.map((item, index) => {
                return (
                  <span key={index}>
                    {item}！
                    <br />
                  </span>
                );
              })
            : message,
        })
      );
    }
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link fs-4 fw-bolder">
                首頁
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/products" className="nav-link fs-4 fw-bolder">
                產品頁
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link fs-4 fw-bolder">
                購物車
              </NavLink>
            </li>
            {token ? (
              <>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link fs-4 fw-bolder">
                    後台管理
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button type="button" className="btn btn-primary fw-bolder" onClick={() => handleLogout()}>
                    登出
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink to="/login" className="nav-link fs-4 fw-bolder">
                  登入
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
