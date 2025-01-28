import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CountryList from "./pages/CountryList";
import CountryInfo from "./pages/CountryInfo";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CountryList />} />
        <Route path="/country/:code" element={<CountryInfo />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
