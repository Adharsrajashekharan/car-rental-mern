import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/reset.css";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router } from "react-router-dom";
//store and provider are of redux item
//we have to remove react strictmode and insert provider
import store from "./redux/store";
import  {Provider}  from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

