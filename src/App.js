import { Button } from "@nextui-org/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/pages/auth/signup";
import Signin from "./components/pages/auth/signin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
