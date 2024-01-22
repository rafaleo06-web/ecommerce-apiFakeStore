import { XMarkIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../Context";
import { useContext } from "react";

function ProductDetail() {
  const context = useContext(ShoppingCartContext);
  const { selectedProduct } = context;
  return (
    <aside
      className={`${
        context.isVisibleProductDetail ? "flex" : "hidden"
      } w-[450px] h-[calc(100vh-68px)] flex-col fixed top-[68px] right-0 border border-black rounded-lg bg-white p-3`}
    >
      <div className="flex justify-between items-center pb-4">
        <h2 className="font-medium text-xl">Detail</h2>
        <XMarkIcon
          className="h-6 w-6 text-black cursor-pointer"
          onClick={() => context.closeProductDetail()}
        ></XMarkIcon>
      </div>
      <div>
        <figure className="px-6 flex justify-center">
          <img
            src={selectedProduct && selectedProduct.image}
            alt={selectedProduct && selectedProduct.title}
            className="w-[200px]  object-cover rounded-lg"
          />
        </figure>
        <p className="flex flex-col p-6">
          <span className="font-medium text-2xl mb-2">{selectedProduct && `$${selectedProduct.price}`}</span>
          <span className="font-medium text-md">{selectedProduct && selectedProduct.title}</span>
          <span className="font-light text-sm">{selectedProduct && selectedProduct.description}</span>
        </p>
      </div>
    </aside>
  );
}

export default ProductDetail;
