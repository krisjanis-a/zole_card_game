import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainMenu from "./route/MainMenu/MainMenu";
import Session from "./route/Session/Session";

function App() {
  return (
    <div>
      <h1>Welcome to Zole - Card Game</h1>
      <Router>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/session" element={<Session />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
