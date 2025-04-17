import { createContext } from "react";

const context = createContext({
  products: [],
  setProducts: () => {},
  logged: false,
  setLogged: () => {},
  cart: [],
  setCart: () => {},
  username: "",
  setUsername: () => {},
});

export default context;
