import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Registration from "./pages/registration";
import Login from "./pages/login";
import Home from "./pages/home";
import firebaseConfig from "./firbaseConfig";
import "react-toastify/dist/ReactToastify.css";
import Forgotpassword from "./pages/forgotpass";
import store from "./store";
import { Provider } from "react-redux";
import Imgupload from "./pages/imgupload";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgotpassword",
    element: <Forgotpassword />,
  },
  {
    path: "/imgupload",
    element: <Imgupload />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
