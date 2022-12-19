import logo from "./logo.svg";
import "./App.css";
import Editor from "./components/Editor";
import Output from "./components/Output";
import Contests from "./components/Contests";
import NavbarTop from "./components/Navbar";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <div>
      <NavbarTop />
      <Editor />
     
      
    </div>
  );
}

export default App;
