import { NavLink } from "react-router";
import { useEffect } from "react";
import axios from "axios";
export default function Navbar() {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  axios.defaults.headers.common["Authorization"] = token;
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
              <li className="nav-item">
                <NavLink to="/login" className="nav-link fs-4 fw-bolder">
                  後台管理
                </NavLink>
              </li>
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
