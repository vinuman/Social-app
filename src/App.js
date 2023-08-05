import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Header from "./Componenets/Header";
import ItemDetails from "./ItemDetails";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/item/:id" element={<ItemDetails />}></Route>
      </Routes>
    </>
  );
}

export default App;
