import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppHome from "./app";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<AppHome />} />
          <Route path="/search" element={<AppHome />} />
          <Route path="*" element={<AppHome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
