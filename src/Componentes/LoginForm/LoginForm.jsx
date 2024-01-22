import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ShoppingCartContext } from "../Context";

const LoginForm = () => {
  const context = useContext(ShoppingCartContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const account = JSON.parse(localStorage.getItem("account"));
    const user = account.find((user) => user.email === email && user.password === password);
    if (user) {
      localStorage.setItem("sign-out", JSON.stringify(false));
      context.setSignOut(false);

      navigate("/", { replace: true }); //reemplazar la entrada actual en el historial de navegación, significa cuando el usuario presiona el botón de retroceso, no volverán a la página anterior, sino a la página antes de esa.
      alert("succesfuly");
    } else {
      alert("email o password incorrect");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-80 flex flex-col">
        <div className="flex flex-col mb-3">
          <label htmlFor="name">Your email: </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="rafael@gmail.com"
            className="border border-black rounded-md px-3 py-1 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="email">Your password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="border border-black rounded-md px-3 py-1 outline-none"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="rounded-md bg-black text-white py-3">
          Login
        </button>
      </form>{" "}
    </>
  );
};

export default LoginForm;
