import { createContext } from "react";

const context = createContext({
  products: [],
  logged: false,
  setLogged: () => {},
  cart: [],
  setCart: () => {},
  userData: null,
  setUserData: () => {},
});

export default context;
// import { createContext } from "react";
// const context = createContext();
// export default context;
