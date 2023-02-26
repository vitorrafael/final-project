import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { CardGroups } from "./pages/CardGroups";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CardGroup } from "./pages/CardGroup";
import { CardGroupContextProvider } from "./contexts/CardGroupContext";

function App() {
  return (
    <div className="App">
      <CardGroupContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<CardGroups />}></Route>
              <Route
                path="cardGroup/:cardGroupId"
                element={<CardGroup />}
              ></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </CardGroupContextProvider>
    </div>
  );
}

export default App;
