import { useContext } from "react";
import { ShoppingCartContext } from "../../Componentes/Context";
import OrderCard from "../../Componentes/OrderCard";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function MyOrder() {
  const context = useContext(ShoppingCartContext);
  //context.order: [0{}, 1{}, 2{}, 3{}]
  const currentPath = window.location.pathname;
  let index = currentPath.substring(currentPath.lastIndexOf("/") + 1);

  if (index === "last") index = context.order?.length - 1; // si context.order existe, halla la longitud - 1, utlima posicion

  return (
    <div>
      <div className="flex w-80 items-center relative justify-center mb-3">
        <Link to="/myorders" className="absolute left-0">
          <ChevronLeftIcon className="h-6 w-6 text-black cursor-pointer" />
        </Link>
        <h1>My order</h1>
      </div>
      <div className="flex flex-col w-80">
        {/*Comprueba si context.order existe y si hay un pedido en el índice actual. */}
        {context.order && context.order[index] ? (
          context.order[index].products.map((product) => <OrderCard key={product.id} product={product} />)
        ) : (
          <p>No hay productos en la orden.</p>
        )}
      </div>
    </div>
  );
}

export default MyOrder;
