import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";

function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <Outlet />
      </div>
      <Toast />
    </>
  );
}

export default App;
