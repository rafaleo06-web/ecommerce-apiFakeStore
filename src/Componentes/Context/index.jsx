import { createContext, useState, useEffect } from "react";
import { apiUrl } from "../../api";

export const ShoppingCartContext = createContext();

export const initializeLocalStorage = () => {
  const accountInLocalStorage = localStorage.getItem("account"); // estado de la cuenta
  const signOutInLocalStorage = localStorage.getItem("sign-out"); // estado de cierre de sesión
  const savedOrder = localStorage.getItem("order");

  let parsedAccount;
  let parsedSignOut;
  let parsedOrder;

  if (!accountInLocalStorage) {
    // si NO existen
    localStorage.setItem("account", JSON.stringify([])); // se CREAN with object empty
    parsedAccount = [];
  } else {
    parsedAccount = JSON.parse(accountInLocalStorage);
  }
  if (!signOutInLocalStorage) {
    // si NO existen
    localStorage.setItem("sign-out", JSON.stringify(false)); // se CREAN
    parsedSignOut = false;
  } else {
    parsedSignOut = JSON.parse(accountInLocalStorage);
  }
  if (!savedOrder) {
    localStorage.setItem("order", JSON.stringify([]));
    parsedOrder = [];
  } else {
    parsedOrder = JSON.parse(savedOrder);
  }
};

export const ShoppingCartProvider = ({ children }) => {
  const [account, setAccount] = useState([]);
  const [signOut, setSignOut] = useState(false);

  //COUNT CLICK IN SHOOPING CART
  const [count, setCount] = useState(0);

  //PRODUCT DETAIL. OPEN / CLOSE
  const [isVisibleProductDetail, setisVisibleProductDetail] = useState(false);
  const openProductDetail = () => setisVisibleProductDetail(true);
  const closeProductDetail = () => setisVisibleProductDetail(false);

  //SHOW PRODUCT SELECT IN PRODUCT DETAIL
  const [selectedProduct, setSelectedProduct] = useState(null);

  // cart products in my orders
  const [cartProducts, setcartProducts] = useState([]);

  //Checkout side menu. OPEN / CLOSE
  const [isVisibleCheckoutSideMenu, setisVisibleCheckoutSideMenu] = useState(false);
  const openCheckoutSideMenu = () => setisVisibleCheckoutSideMenu(true);
  const closeCheckoutSideMenu = () => setisVisibleCheckoutSideMenu(false);

  // Shoppincart . Order
  const [order, setOrder] = useState([]);

  // get products
  const [items, setItems] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);

  //get products by title
  const [searchByTitle, setSearchByTitle] = useState(null);

  const [searchByCategory, setSearchByCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/products`);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error(`Oh no, ocurrió un error: ${error}`);
      }
    };
    fetchData();
  }, []);

  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter((item) => item.title.toLowerCase().includes(searchByTitle.toLowerCase()));
  };

  const filteredItemsByCategory = (items, searchByCategory) => {
    return items?.filter(
      (item) => item.category.replace(/\s+/g, "").toLowerCase() === searchByCategory.replace(/\s+/g, "").toLowerCase()
    );
  };

  const filteredItemsByTitleAndCategory = (items, searchByTitle, searchByCategory) => {
    let filteredItems = items;
    if (searchByTitle) {
      filteredItems = filteredItemsByTitle(filteredItems, searchByTitle);
    }
    if (searchByCategory) {
      filteredItems = filteredItemsByCategory(filteredItems, searchByCategory);
    } //elementos que cumplen ambas condiciones: tener un título que coincide con searchByTitle y tener una categoría que coincide con searchByCategory
    return filteredItems; //ninguna de las condiciones se cumple, devuelve un conjunto vacío
  };

  useEffect(() => {
    setFilteredItems(filteredItemsByTitleAndCategory(items, searchByTitle, searchByCategory));
  }, [items, searchByTitle, searchByCategory]);

  useEffect(() => {
    const savedOrder = localStorage.getItem("order");

    // Cargar la orden inicial desde el localStorage
    if (savedOrder) {
      const parsedOrder = JSON.parse(savedOrder); //at the start string [], convert PARSE array empty[]

      setOrder(parsedOrder);
    }
  }, []);

  useEffect(() => {
    if (order.length > 0) {
      localStorage.setItem("order", JSON.stringify(order));
    }
  }, [order]);

  useEffect(() => {
    if (account.length > 0) {
      localStorage.setItem("account", JSON.stringify(account));
    }
  }, [account]);

  return (
    <ShoppingCartContext.Provider
      value={{
        count,
        setCount,
        openProductDetail,
        closeProductDetail,
        isVisibleProductDetail,
        selectedProduct,
        setSelectedProduct,
        cartProducts,
        setcartProducts,
        isVisibleCheckoutSideMenu,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        order,
        setOrder,
        items,
        setItems,
        searchByTitle,
        setSearchByTitle,
        filteredItems,
        setFilteredItems,
        searchByCategory,
        setSearchByCategory,
        account,
        setAccount,
        signOut,
        setSignOut,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  ); //children(all components) necesitan leer el count y tambien podrán modificar a traves del SETCOUNT
};
