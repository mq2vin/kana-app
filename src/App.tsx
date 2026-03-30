import './App.css';
import {KanaApp} from "./KanaApp.tsx";
import {Route, Routes} from "react-router-dom";
import {Login} from "./Login.tsx";

function App() {
  //build
  return(
      <>
        <Routes>
          <Route path="/" element={<KanaApp/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </>
  );
}

export default App;