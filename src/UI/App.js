import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainMenu from "./route/MainMenu/MainMenu";
import Session from "./route/Session/Session";
import Settings from "./route/Settings/Settings";

function App() {
  return (
    <div className="app">
      <h1>Welcome to Zole - Card Game</h1>
      <Router>
        <Routes>
          <Route exact path="/" element={<MainMenu />} />
          <Route path="/session" element={<Session />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
