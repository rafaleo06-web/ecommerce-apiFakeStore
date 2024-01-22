import { XMarkIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../Context";
import OrderCard from "../OrderCard";
import { totalPrice } from "../../utils";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function CheckoutSideMenu() {
  const context = useContext(ShoppingCartContext);

  const handleDelete = (id) => {
    const filteredProducts = context.cartProducts.filter((product) => product.id != id);
    context.setcartProducts(filteredProducts);
  };

  const handleCheckout = () => {
    const currentDate = new Date().toLocaleDateString();

    const orderToAdd = {
      date: currentDate,
      products: context.cartProducts,
      totalProducts: context.cartProducts.length,
      totalPrice: totalPrice(context.cartProducts),
    };
    context.setOrder([...context.order, orderToAdd]);
    context.setcartProducts([]);
    context.closeCheckoutSideMenu();
    context.setSearchByTitle(null);
  };

  const updateQuantity = (id, action) => {
    let newQuantity;
    const updatedProducts = context.cartProducts.map((product) => {
      if (product.id === id) {
        if (product.quantity > 1 && action == "decrement") {
          newQuantity = product.quantity - 1;
          return { ...product, quantity: newQuantity };
        } else if (action == "increment") {
          newQuantity = product.quantity + 1;
          return { ...product, quantity: newQuantity };
        }
      }
      return product;
    });
    context.setcartProducts(updatedProducts);
  };

  return (
    <aside
      className={`${
        context.isVisibleCheckoutSideMenu ? "flex" : "hidden"
      } w-[450px] h-[calc(100vh-68px)] flex-col fixed top-[68px] right-0 border border-black rounded-lg bg-white p-3 scrollable-cards`}
    >
      <div className="flex justify-between items-center pb-4">
        <h2 className="font-medium text-xl">My Order</h2>
        <XMarkIcon
          className="h-6 w-6 text-black cursor-pointer"
          onClick={() => context.closeCheckoutSideMenu()}
        ></XMarkIcon>
      </div>
      <div className="px-4 flex-1">
        {context.cartProducts.map((product) => (
          <OrderCard
            key={product.id}
            product={product}
            handleDelete={handleDelete}
            quantityValidation={true}
            updateQuantity={updateQuantity}
          />
        ))}
      </div>
      <div className="px-6 ">
        <p className="flex justify-between items-center mb-2">
          <span className="font-light">Total: </span>
          <span className="font-medium text-2xl">${+totalPrice(context.cartProducts).toFixed(2)}</span>
        </p>
        <Link to="/myorders/last">
          <button className="w-full bg-black py-3 text-white rounded-lg" onClick={() => handleCheckout()}>
            Checkout
          </button>
        </Link>
      </div>
    </aside>
  );
}

export default CheckoutSideMenu;
