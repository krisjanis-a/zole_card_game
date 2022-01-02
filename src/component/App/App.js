import "./App.scss";
import React from "react";
// import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Using Browser Router causes some problems with webpack that should be resolved https://coderedirect.com/questions/214973/why-is-react-webpack-production-build-showing-blank-page
import MainMenu from "../../route/MainMenu/MainMenu";
import Session from "../../route/Session/Session";
import Settings from "../../route/Settings/Settings";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<MainMenu />} />
          <Route exact path="/session" element={<Session />} />
          <Route exact path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
