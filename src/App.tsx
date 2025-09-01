import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import HomePage from "./pages/HomePage.tsx";
import GroceryListPage from "./pages/GroceryListPage.tsx";

const App: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-base-100">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/list/:id" element={<GroceryListPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
