import { HashRouter, Route, Routes, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import ProductCompanies from "./pages/ProductCompanies";
import ServiceCompanies from "./pages/ServiceCompanies";
import AboutUs from "./pages/AboutUs";
import NavDock from "./components/NavDock";
import ChatBot from "./components/Chatbot";


const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col relative">
      <Outlet />
      <NavDock />
    </div>
  );
};

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/ProductCompanies" element={<ProductCompanies />} />
          <Route path="/ServiceCompanies" element={<ServiceCompanies />} />
          <Route path="/ChatBot" element={<ChatBot />} />
          <Route path="/AboutUs" element={<AboutUs />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default Router;