import { XMarkIcon } from "@heroicons/react/24/solid";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/20/solid";

function OrderCard(props) {
  const { id, title, image, price, quantity } = props.product;
  const { quantityValidation } = props;
  const { updateQuantity } = props;
  const handleDelete = props.handleDelete;

  let renderXMarkIcon;
  if (handleDelete) {
    //si handleDelete se pasa como prop
    //checkoutSideMenu SI PASA COMO prop a handleDelete
    //myOrder NO PASA COMO prop a handleDelete
    renderXMarkIcon = <XMarkIcon className="h-6 w-6 text-black cursor-pointer" onClick={() => handleDelete(id)} />;
  }

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center">
        <figure>
          <img className="w-[100px] h-full rounded-lg object-cover" src={image} alt={title} />
        </figure>
      </div>
      <div className="flex items-center gap-2 flex-col">
        <p className="text-sm font-light">{title}</p>
        <div className="flex justify-center items-center ">
          {quantityValidation ? (
            <span className="flex gap-1 pr-10">
              <button
                onClick={() => {
                  updateQuantity(id, "decrement");
                }}
              >
                <MinusSmallIcon className="w-4" />
              </button>
              <p>{quantity}</p>
              <button
                onClick={() => {
                  updateQuantity(id, "increment");
                }}
              >
                <PlusSmallIcon className="w-4" />
              </button>
            </span>
          ) : (
            <p className="pr-5">{quantity} Units</p>
          )}
          <p>{`$.${price * quantity}`}</p>
        </div>
      </div>
      {renderXMarkIcon}
    </div>
  );
}

export default OrderCard;
