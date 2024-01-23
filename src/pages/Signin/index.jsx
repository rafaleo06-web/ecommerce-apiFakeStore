import { ShoppingCartContext } from "../../Componentes/Context";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import LoginForm from "../../Componentes/LoginForm/LoginForm";

function SignIn() {
  const context = useContext(ShoppingCartContext);

  const navigate = useNavigate();

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

  const [view, setView] = useState("user-info");

  const [showLoginForm, setShowLoginForm] = useState(false);

  const renderLogin = () => {
    return (
      <div className="w-80">
        <button
          className="w-full border disabled:bg-black/40 bg-black text-white rounded-lg px-8 py-2"
          onClick={() => setShowLoginForm(true)}
          disabled={!hasUserAnAccount}
        >
          Log in
        </button>

        <span className="text-xs underline flex mt-3 mb-3 justify-center">Forgot my Password</span>
        <button
          className="w-full border disabled:text-black/40 border-black rounded-lg px-8 py-2"
          disabled={hasUserAnAccount}
          onClick={() => setView("create-user-info")}
        >
          Sign Up
        </button>
      </div>
    );
  };

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const createAccount = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const data = { name, email, password };

    localStorage.setItem("account", JSON.stringify(data));
    context.setAccount([data]);
    handleSignIn();
  };

  const handleSignIn = () => {
    localStorage.setItem("sign-out", JSON.stringify(false));
    context.setSignOut(false);
    navigate("/", { replace: true });
  };

  const renderCreateUserInfo = () => {
    return (
      <form onSubmit={createAccount} className="w-80 flex flex-col">
        <div className="flex flex-col mb-3">
          <label htmlFor="name">Your name: </label>
          <input
            ref={nameRef}
            type="text"
            id="name"
            name="name"
            placeholder="rafael"
            className="border border-black rounded-md px-3 py-1 outline-none"
          />
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="email">Your email:</label>
          <input
            ref={emailRef}
            type="text"
            id="email"
            name="email"
            className="border border-black rounded-md px-3 py-1 outline-none"
            placeholder="rafa@gmail.com"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="password">Your password: </label>
          <input
            ref={passwordRef}
            type="text"
            id="password"
            name="password"
            placeholder="******"
            className="border border-black rounded-md px-3 py-1 outline-none"
          />
        </div>
        <button type="submit" className="rounded-md bg-black text-white py-3">
          Create
        </button>
      </form>
    );
  };

  const renderView = () => {
    if (showLoginForm) {
      return <LoginForm />;
    } else {
      return view === "create-user-info" ? renderCreateUserInfo() : renderLogin();
    }
  };

  return (
    <div>
      <h1 className="text-lg text-center mb-3">Welcome</h1>
      {renderView()}
    </div>
  );
}

export default SignIn;
