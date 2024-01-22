import { ShoppingCartIcon, CurrencyDollarIcon, CalendarDaysIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

function OrdersCard(props) {
  const { totalPrice, totalProducts } = props;
  const date = new Date().toLocaleDateString();

  return (
    <div className=" flex justify-between items-center mb-4 border border-gray-300 rounded-lg p-2 ">
      <p className=" flex  items-center justify-between grow gap-4 px-4">
        <span className="flex gap-1 items-center justify-center">
          <ShoppingCartIcon className="h-6 w-6 cursor-pointer text-black" />{" "}
          {`${totalProducts} ${totalProducts === 1 ? "producto" : "productos"}`}
        </span>
        <span className="flex gap-1 items-center justify-center">
          <CurrencyDollarIcon className="h-6 w-6 cursor-pointer text-black" />
          {+totalPrice.toFixed(2)}
        </span>
        <span className="flex gap-1 items-center justify-center">
          <CalendarDaysIcon className="h-6 w-6 cursor-pointer text-black" />
          {date}
        </span>
        <span className="flex items-center gap-2">
          <ChevronRightIcon className="h-6 w-6 cursor-pointer text-black" />
        </span>
      </p>
    </div>
  );
}

export default OrdersCard;
