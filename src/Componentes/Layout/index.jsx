//children, son los hijos de LAYOUT, return <Layout>home</Layout>;
import CheckoutSideMenu from "../CheckoutSideMenu";

function Layout({ children }) {
  //CHILDREN == 'HOME'
  return (
    <div className="flex flex-col mt-20 items-center text-center ">
      {children}
      <CheckoutSideMenu />
    </div>
  );
}

export default Layout;
