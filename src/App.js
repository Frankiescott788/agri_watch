import { Button } from "@nextui-org/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/pages/auth/signup";
import Signin from "./components/pages/auth/signin";
import { useContext } from "react";
import { Authcontext } from "./context/Authprovider";

function App() {

  const { isLoading } = useContext(Authcontext);

  return isLoading ? (
    /* From Uiverse.io by forgingdestiny */ 
<div className="loader">
  <div className="circle" tabindex="0"></div>
  <div className="circle" tabindex="0"></div>
  <div className="circle" tabindex="0"></div>
</div>
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
