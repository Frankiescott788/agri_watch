import { Button } from "@nextui-org/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/pages/auth/signup";
import Signin from "./components/pages/auth/signin";
import { useContext } from "react";
import { Authcontext } from "./context/Authprovider";
import DashboardLayout from "./layouts/dashboard";
import Overview from "./components/pages/overview/overview";
import FarmerMap from "./components/pages/map/map";
import Chatbot from "./components/pages/chatbot/chatbot";

function App() {

  const { isLoading } = useContext(Authcontext);

  return isLoading ? <p>Loading...</p> : (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard/*" element={<DashboardLayout />}>
          <Route index element={<Overview />}/>
          <Route path="map" element={<FarmerMap />}/>
          <Route path="agribot" element={<Chatbot />}/>
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
