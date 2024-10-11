import { Button } from "@nextui-org/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/pages/auth/signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;