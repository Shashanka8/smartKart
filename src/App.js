import "./App.css";
import Navbar from "./components/Navbar";
import Products from "./components/Products";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="px-5">
      <Navbar />
      <Products />
    </div>
  );
}

export default App;
