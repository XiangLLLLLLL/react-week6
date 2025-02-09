import { NavLink } from "react-router";
export default function AdminNavbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/admin/products" className="nav-link fs-4 fw-bolder">
                後台產品頁
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/admin/orders" className="nav-link fs-4 fw-bolder">
                訂單頁面
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/" className="nav-link text-primary fw-bolder">
                回首頁
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
