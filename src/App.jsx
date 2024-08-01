import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ErrorPage from "./pages/ErrorPage";
import LogIn from "./pages/LogIn";
import Registration from "./pages/Registration";
import Profile from "./pages/Profile";
import { initData } from "./dataApi/dataApi";

function App() {
  initData();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<ErrorPage/>}/>
        <Route path="/shop" element={<Shop />} />
        <Route path="/log-in" element={<LogIn/>}/>
        <Route path="/registration" element={<Registration/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </>
  );
}

export default App;
