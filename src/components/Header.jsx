import React, { useContext, useState } from "react";
import context from "../context/context";
import { Navbar, IconButton, Collapse } from "@material-tailwind/react";
import { FiLogIn, FiUserPlus, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "/logo.png";
import UserMenu from "./UserMenu";

const Header = () => {
  const { logged, cart, setCart } = useContext(context);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const totalPrice = cart.reduce(
    (num, item) => num + item.price * item.quantity,
    0
  );

  return (
    <Navbar className="sticky top-0 z-50 mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6 bg-blue-500 shadow-md">
      <div className="flex items-center justify-between text-white w-full">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-xl font-bold tracking-wide">PROTEIN PRO</span>
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          <Link to="/products" className="font-medium hover:underline">
            Our Protein
          </Link>

          {logged ? (
            <UserMenu />
          ) : (
            <>
              <Link to="/login" className="flex items-center gap-1 font-medium">
                <FiLogIn className="text-lg" />
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className="flex items-center gap-1 font-medium"
              >
                <FiUserPlus className="text-lg" />
                Sign Up
              </Link>
            </>
          )}

          <div className="relative">
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="p-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition"
            >
              <FiShoppingBag className="text-xl text-white" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                  {cart.length}
                </span>
              )}
            </button>

            {isCartOpen && (
              <div className="absolute right-0 mt-3 w-72 bg-white text-black shadow-xl rounded-lg p-4 z-50">
                {cart.length === 0 ? (
                  <p className="text-center text-gray-500 text-sm">
                    Cart is empty
                  </p>
                ) : (
                  <>
                    <div className="space-y-4 max-h-64 overflow-y-auto">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center border-b pb-2"
                        >
                          <div>
                            <p className="font-semibold text-sm">{item.name}</p>
                            <p className="text-xs text-gray-600">
                              ${item.price} x {item.quantity}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                if (item.quantity > 1) {
                                  setCart(
                                    cart.map((i) =>
                                      i.id === item.id
                                        ? { ...i, quantity: i.quantity - 1 }
                                        : i
                                    )
                                  );
                                }
                              }}
                              className="px-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                            >
                              -
                            </button>
                            <span className="text-sm">{item.quantity}</span>
                            <button
                              onClick={() =>
                                setCart(
                                  cart.map((i) =>
                                    i.id === item.id
                                      ? { ...i, quantity: i.quantity + 1 }
                                      : i
                                  )
                                )
                              }
                              className="px-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                            >
                              +
                            </button>
                            <button
                              onClick={() =>
                                setCart(cart.filter((i) => i.id !== item.id))
                              }
                              className="text-red-600 text-sm ml-2"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-right font-bold pt-2 border-t text-blue-600">
                      Total: ${totalPrice.toFixed(2)}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <IconButton
          size="sm"
          color="white"
          variant="text"
          onClick={() => setIsNavOpen((cur) => !cur)}
          className="ml-auto lg:hidden"
        >
          <FiLogIn className="h-6 w-6" />
        </IconButton>
      </div>

      <Collapse open={isNavOpen} className="lg:hidden">
        <div className="flex flex-col gap-2 px-4 pb-4">
          <Link to="/products">Our Protein</Link>
          {!logged ? (
            <>
              <Link to="/login">Sign In</Link>
              <Link to="/sign-up">Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/profile">Profile</Link>
              <button onClick={() => localStorage.clear()}>Logout</button>
            </>
          )}
        </div>
      </Collapse>
    </Navbar>
  );
};

export default Header;
