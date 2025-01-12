import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; 
import { BrowserRouter } from "react-router-dom"; 
import { store } from "./redux/store"; 
import App from "./App";
import "./index.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter> 
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

library.add(fas);