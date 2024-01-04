import { XMarkIcon } from "@heroicons/react/24/solid";

function OrderCard(props) {
  const { id, title, image, price } = props.product;
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
        <p className="text-sm font-light">{title}</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-lg font-medium">{price}</p>
      </div>
      {renderXMarkIcon}
    </div>
  );
}

export default OrderCard;
