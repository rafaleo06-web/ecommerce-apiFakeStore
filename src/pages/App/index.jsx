import { BrowserRouter } from "react-router-dom";
import { ShoppingCartProvider, initializeLocalStorage, ShoppingCartContext } from "../../Componentes/Context";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import Home from "../Home";
import MyAccount from "../MyAccount";
import MyOrder from "../MyOrder";
import MyOrders from "../MyOrders";
import NotFound from "../NotFound";
import SignIn from "../Signin";
import Navbar from "../../Componentes/Navbar";
import Layout from "../../Componentes/Layout";
import "./App.css";

const AppRoutes = () => {
  const context = useContext(ShoppingCartContext);

  //sign out
  const signOut = localStorage.getItem("sign-out");
  const parsedSignOut = JSON.parse(signOut);
  const isUserSignOut = context.signOut || parsedSignOut;

  //account
  const account = localStorage.getItem("account");
  const parsedAccount = JSON.parse(account); //

  // has an account
  //['name', 'email', 'password'] == 0 => FALSE
  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true; //verifica si no hay información de la cuenta

  const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true;

  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;
  //si (noAccountInLocalStorage =  falso || noAccountInLocalState = falso) === TRUE
  //noAccountInLocalStorage = TRUE || noAccountInLocalState = TRUE) === FALSO

  let routes = useRoutes([
    { path: "/", element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={"/sign-in"} /> },
    {
      path: "/jewelery",
      element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={"/sign-in"} />,
    },
    {
      path: "/electronics",
      element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={"/sign-in"} />,
    },
    {
      path: "/electronics",
      element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={"/sign-in"} />,
    },
    {
      path: "/women'sclothing",
      element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={"/sign-in"} />,
    },
    {
      path: "/men'sclothing",
      element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={"/sign-in"} />,
    },
    { path: "/myaccount", element: <MyAccount /> },
    { path: "/myorder", element: <MyOrder /> },
    { path: "/myorders", element: <MyOrders /> },
    { path: "/myorders/last", element: <MyOrder /> },
    { path: "/myorders/:id", element: <MyOrder /> },
    { path: "/signin", element: <SignIn /> },
    { path: "/*", element: <NotFound /> },
  ]);

  return routes;
};

const App = () => {
  initializeLocalStorage();
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
          <Navbar />
        </Layout>
      </BrowserRouter>
    </ShoppingCartProvider>
  );
};

export default App;

