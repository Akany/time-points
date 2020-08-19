import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Routes } from "./routes";
import { store } from "./store";
import "./app.scss";

export function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes />
      </Provider>
    </BrowserRouter>
  );
}
