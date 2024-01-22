import { useContext } from "react";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/solid";

import { ShoppingCartContext } from "../Context";

function Card({ product }) {
  const context = useContext(ShoppingCartContext);
  let producttoAdd;

  const showProduct = (product) => {
    context.openProductDetail();
    context.closeCheckoutSideMenu();
    context.setSelectedProduct(product);
  };

  const addToCart = (product, e) => {
    producttoAdd = {
      ...product,
      quantity: 1,
    };
    e.stopPropagation();
    context.openCheckoutSideMenu();
    context.closeProductDetail();
    context.setCount(context.count + 1);
    context.setcartProducts([...context.cartProducts, producttoAdd]);
  };

  const renderIcon = (id) => {
    const isInCart = context.cartProducts.some((product) => product.id === id); //filer return array, if array > 0 is TRUE

    if (isInCart) {
      return (
        <div className="absolute right-0 top-0 flex justify-center items-center w-6 h-6 bg-black rounded-full m-2 p-1">
          <CheckIcon className="h-6 w-6 text-white" />
        </div>
      );
    } else {
      return (
        <div
          onClick={(e) => {
            addToCart(product, e);
          }}
          className="absolute right-0 top-0 flex justify-center items-center w-6 h-6 bg-white rounded-full m-2 p-1"
        >
          <PlusIcon className="h-6 w-6 text-black" />
        </div>
      );
    }
  };
  return (
    <div
      className="bg-white cursor-pointer w-56 h-60 rounded-lg border border-black/30 shadow-xl"
      onClick={() => showProduct(product)}
    >
      <figure className="relative mb-2 w-full h-4/5">
        <span className="absolute bottom-0 left-0 bg-white/60 text-black rounded-lg text-xs m-2 px-3 py-0.5">
          {product.category}
        </span>
        <img className="rounded-lg w-full h-full object-cover" src={product.image} alt={product.title} />
        {renderIcon(product.id)}
      </figure>
      <p className="flex justify-between px-3">
        <span className="text-sm font-light truncate mr-2">{product.title}</span>
        <span className="text-lg font-bold">{`$${product.price}`}</span>
      </p>
    </div>
  );
}

export default Card;
