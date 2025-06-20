import { createContext } from "react";

const context = createContext({
  products: [],
  setProducts: () => {},
  logged: false,
  setLogged: () => {},
  cart: [],
  setCart: () => {},
  userData: null,
  setUserData: () => {},
});

export default context;
