import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { StoreProvider } from "./store/Store";

const root = document.getElementById("root2");

function app() {
  ReactDOM.render(
    <StoreProvider>
      <App />
    </StoreProvider>,
    root
  );
}

// TODO: carregar o usuário a partir do back
// app();
