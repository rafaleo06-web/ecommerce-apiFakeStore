import { useContext } from "react";
import Card from "../../Componentes/Card";
import ProductDetail from "../../Componentes/ProductDetail";
import { ShoppingCartContext } from "../../Componentes/Context";

function Home() {
  const context = useContext(ShoppingCartContext);

  const renderView = () => {
    if (context.filteredItems?.length > 0) {
      return context.filteredItems?.map((item) => <Card key={item.id} product={item} />);
    } else {
      return <div>No hay coincidencias</div>;
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center relative w-full mb-4">
        <h1 className="font-medium text-xl">Exclusive products</h1>
      </div>
      <input
        className="rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none"
        type="text"
        placeholder="Search a product"
        onChange={(e) => context.setSearchByTitle(e.target.value)}
      />
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 w-full max-w-screen-lg px-2 ">{renderView()}</div>
      <ProductDetail />
    </div>
  );
}

export default Home;
