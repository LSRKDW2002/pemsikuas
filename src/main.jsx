import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // Import Provider
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import { store } from "./redux/store"; // Import Redux store
import App from "./App";
import "./index.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}> {/* Bungkus aplikasi dengan Provider */}
      <BrowserRouter> {/* Bungkus aplikasi dengan BrowserRouter */}
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

library.add(fas);