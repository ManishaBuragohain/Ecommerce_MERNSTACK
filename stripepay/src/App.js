import logo from "./logo.svg";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Pay from "./Pay";
import Success from "./Success";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Pay />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
