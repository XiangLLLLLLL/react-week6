import { createHashRouter } from "react-router";
import Home from "../pages/Home.jsx";
import Products from "../pages/Products.jsx";
import Product from "../pages/Product.jsx";
import Cart from "../pages/Cart.jsx";
import Login from "../pages/Login.jsx";
import App from "../App.jsx";
import Admin from "../Admin.jsx";
import AdminOrders from "../adminPages/AdminOrders.jsx";
import AdminProducts from "../adminPages/AdminProducts.jsx";
const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <Product />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "products",
        element: <AdminProducts />,
      },
      {
        path: "orders",
        element: <AdminOrders />,
      },
    ],
  },
];

const router = createHashRouter(routes);

export default router;
