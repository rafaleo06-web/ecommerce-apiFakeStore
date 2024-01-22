import { NavLink } from "react-router-dom";
import { ShoppingCartContext } from "../Context";
import { useContext } from "react";
import ShoppingCart from "../ShoppingCart";

function Navbar() {
  const activeStyle = "underline underline-offset-4";
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

  const handleSignOut = () => {
    const stringifiedSignOut = JSON.stringify(true);
    localStorage.setItem("sign-out", stringifiedSignOut);
    context.setSignOut(true);
  };

  const renderView = () => {
    if (hasUserAnAccount && !isUserSignOut) {
      return (
        <>
          <li className="text-black/60">{parsedAccount?.email}</li>
          <li>
            <NavLink to="/myorders" className={({ isActive }) => (isActive ? activeStyle : undefined)}>
              My Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/myaccount" className={({ isActive }) => (isActive ? activeStyle : undefined)}>
              My Account
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signin"
              onClick={() => handleSignOut()}
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Sign Out
            </NavLink>
          </li>
        </>
      );
    } else {
      return (
        <li>
          <NavLink
            to="/signin"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
            onClick={() => handleSignOut()}
          >
            Sign In
          </NavLink>
        </li>
      );
    }
  };

  return (
    <nav className="flex justify-between items-center top-0 fixed z-10 w-full py-5 px-8 text-sm font-light bg-white">
      <ul className="flex items-center gap-3">
        <li className="font-semibold text-lg">
          <NavLink to={`${isUserSignOut ? "/signin" : "/"}`}>Shopi</NavLink>
        </li>
        <li>
          <NavLink
            onClick={() => context.setSearchByCategory()}
            to="/"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={() => context.setSearchByCategory("jewelery")}
            to="/jewelery"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Jewelery
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={() => context.setSearchByCategory("electronics")}
            to="/electronics"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Electronics
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={() => context.setSearchByCategory("women's clothing")}
            to="/women'sclothing"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Women's clothing
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={() => context.setSearchByCategory("men's clothing")}
            to="/men'sclothing"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Men's clothing
          </NavLink>
        </li>
      </ul>
      <ul className="flex items-center gap-3">
        {renderView()}
        <li className="flex items-center">
          <ShoppingCart />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
