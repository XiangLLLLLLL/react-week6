import { Outlet } from "react-router";
import AdminNavbar from "./components/AdminNavbar";
export default function Admin() {
  return (
    <>
      <AdminNavbar />
      <div className="container mt-3">
        <Outlet />
      </div>
    </>
  );
}
