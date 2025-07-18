import { createContext } from "react";

const context = createContext({
  products: [],
  logged: false,
  setLogged: () => {},
  cart: [],
  setCart: () => {},
  userData: {},
  setUserData: () => {},
});

export default context;
