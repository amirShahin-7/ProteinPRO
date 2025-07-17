import React, { useContext, useState } from "react";
import context from "../context/context";
import { Navbar, IconButton, Collapse } from "@material-tailwind/react";
import { FiLogIn, FiUserPlus, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";

const Header = () => {
  const { logged, cart, setCart, userData } = useContext(context);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const totalPrice = cart.reduce(
    (num, item) => num + item.price * item.quantity,
    0
  );

  return (
    <Navbar className="fixed top-0 left-0 right-0 z-50 mx-auto max-w-screen-xl p-3 lg:rounded-full bg-gradient-to-br from-[#181c2b]/90 via-[#232946]/90 to-[#0f172a]/90 shadow-2xl border border-white/10 backdrop-blur-xl">
      <div className="flex items-center justify-between text-white w-full">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="https://i.postimg.cc/YCXJv7tR/logo.png"
            alt="Logo"
            className="w-12 h-12 rounded-full object-cover shadow-lg border-2 border-[#00c6fb]"
            loading="lazy"
          />
          <span className="text-2xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#00c6fb] to-[#005bea] drop-shadow-lg">
            PROTEIN PRO
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          <Link
            to="/products"
            className="font-semibold hover:underline text-[#00c6fb] hover:text-[#ffb86b] transition"
          >
            Our Protein
          </Link>

          {logged ? (
            <>
              {userData?.role === "admin" && (
                <Link
                  to="/admin"
                  className="font-semibold hover:underline text-[#ffb86b] hover:text-[#00c6fb] transition"
                >
                  Dashboard
                </Link>
              )}
              <UserMenu />
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-1 font-semibold text-[#00c6fb] hover:text-[#ffb86b] transition"
              >
                <FiLogIn className="text-lg" />
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className="flex items-center gap-1 font-semibold text-[#ffb86b] hover:text-[#00c6fb] transition"
              >
                <FiUserPlus className="text-lg" />
                Sign Up
              </Link>
            </>
          )}

          <div className="relative">
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="p-2 rounded-full border-2 border-[#00c6fb]/40 bg-gradient-to-br from-[#232946]/60 to-[#181c2b]/60 hover:from-[#00c6fb]/30 hover:to-[#005bea]/30 shadow-lg transition relative"
            >
              <FiShoppingBag className="text-2xl text-[#00c6fb]" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-[#ffb86b] to-[#ff6bcb] text-white text-[10px] w-6 h-6 flex items-center justify-center rounded-full shadow-md border-2 border-white font-bold">
                  {cart.length}
                </span>
              )}
            </button>

            {isCartOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-gradient-to-br from-[#232946]/95 to-[#181c2b]/95 text-white shadow-2xl rounded-2xl p-5 z-50 border border-white/10">
                {cart.length === 0 ? (
                  <p className="text-center text-gray-400 text-sm">
                    Cart is empty
                  </p>
                ) : (
                  <>
                    <div className="space-y-4 max-h-64 overflow-y-auto">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center border-b border-white/10 pb-2"
                        >
                          <div>
                            <p className="font-semibold text-sm text-[#00c6fb]">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-400">
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
                              className="px-2 text-sm bg-[#232946]/60 rounded hover:bg-[#00c6fb]/30 text-white"
                            >
                              -
                            </button>
                            <span className="text-sm font-bold text-[#ffb86b]">
                              {item.quantity}
                            </span>
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
                              className="px-2 text-sm bg-[#232946]/60 rounded hover:bg-[#00c6fb]/30 text-white"
                            >
                              +
                            </button>
                            <button
                              onClick={() =>
                                setCart(cart.filter((i) => i.id !== item.id))
                              }
                              className="text-[#ff6bcb] text-lg ml-2 hover:text-red-500"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-right font-bold pt-2 border-t border-white/10 text-[#00c6fb]">
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
          <FiLogIn className="h-6 w-6 text-[#00c6fb]" />
        </IconButton>
      </div>

      <Collapse open={isNavOpen} className="lg:hidden">
        <div className="flex flex-col gap-3 px-4 pb-4 text-white bg-gradient-to-br from-[#232946]/90 to-[#181c2b]/90 rounded-xl mt-2 shadow-lg border border-white/10">
          <Link
            to="/products"
            className="text-[#00c6fb] font-semibold hover:text-[#ffb86b] transition"
          >
            Our Protein
          </Link>
          {!logged ? (
            <>
              <Link
                to="/login"
                className="text-[#00c6fb] font-semibold hover:text-[#ffb86b] transition"
              >
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className="text-[#ffb86b] font-semibold hover:text-[#00c6fb] transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="text-[#00c6fb] font-semibold hover:text-[#ffb86b] transition"
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  localStorage.clear();
                  setCart([]);
                  window.location.href = "/login";
                }}
                className="text-[#ff6bcb] font-semibold hover:text-red-500 hover:underline transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </Collapse>
    </Navbar>
  );
};

export default Header;
