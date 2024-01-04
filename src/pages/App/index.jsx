import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home";
import MyAccount from "../MyAccount";
import MyOrder from "../MyOrder";
import MyOrders from "../MyOrders";
import NotFound from "../NotFound";
import SignIn from "../Signin";
import Navbar from "../../Componentes/Navbar";
import Layout from "../../Componentes/Layout";
import { ShoppingCartProvide } from "../../Componentes/Context";
import "./App.css";

function App() {
  return (
    <ShoppingCartProvide>
      <BrowserRouter>
        <Navbar />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jewelery" element={<Home />} />
            <Route path="/electronics" element={<Home />} />
            <Route path="/women'sclothing" element={<Home />} />
            <Route path="/men'sclothing" element={<Home />} />
            <Route path="/myaccount" element={<MyAccount />} />
            <Route path="/myorder" element={<MyOrder />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/myorders/last" element={<MyOrder />} />
            <Route path="/myorders/:id" element={<MyOrder />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ShoppingCartProvide>
  );
}

export default App;

