import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Duel from "./pages/Duel";
 
export default function App() {
  return (
    <BrowserRouter basename="/p108/">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/duel/:difficulty" element={<Duel />} />
      </Routes>
    </BrowserRouter>
  );
}
 