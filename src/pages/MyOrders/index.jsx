import { useContext } from "react";
import { Link } from "react-router-dom";
import OrdersCard from "../../Componentes/OrdersCard";
import { ShoppingCartContext } from "../../Componentes/Context";

function MyOrders() {
  const context = useContext(ShoppingCartContext);
  console.log(context.order);
  return (
    <div>
      <div className="flex items-center justify-center w-80 mb-4">
        <h1 className="font-medium text-xl">My orders</h1>
      </div>
      {context.order.map((order, index) => (
        <Link key={index} to={`/myorders/${index}`}>
          <OrdersCard totalPrice={order.totalPrice} totalProducts={order.totalProducts} />
        </Link>
      ))}
    </div>
  );
}

export default MyOrders;
