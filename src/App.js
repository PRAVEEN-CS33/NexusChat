import "./App.css";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Loader from "./components/loader/Loader";
import { BrowserRouter,Routes,Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loader />} />
        <Route path="/openChat" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
