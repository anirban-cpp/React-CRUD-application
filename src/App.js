import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import About from "./Pages/About";
import AddEditUser from "./Pages/AddEditUser";
import Home from "./Pages/Home";
import UserInfo from "./Pages/UserInfo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer theme="colored"/>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addUser" element={<AddEditUser />} />
        <Route path="/editUser/:id" element={<AddEditUser />} />
        <Route path="/userInfo/:id" element={<UserInfo />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
