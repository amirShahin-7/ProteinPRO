import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../context/firebase";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import context from "../../context/context";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useContext(context);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "products");
      const productSnapshot = await getDocs(productsCollection);
      const productsList = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181c2b] via-[#232946] to-[#0f172a] text-gray-100 font-sans relative overflow-hidden pt-32">
      {/* Decorative gradient overlays */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-[#00c6fb]/30 to-[#005bea]/10 rounded-full blur-3xl z-0" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 bg-gradient-to-tr from-[#ffb86b]/30 to-[#ff6bcb]/10 rounded-full blur-3xl z-0" />
      <div className="container mx-auto px-4 py-10 z-10 relative">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-[#00c6fb] to-[#005bea] drop-shadow-lg">
          Our Protein Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {products.map(({ id, price, description, image, name }) => (
            <Card
              key={id}
              className="overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br from-[#232946]/80 to-[#181c2b]/80 text-white rounded-2xl backdrop-blur-xl hover:scale-105 transition-transform"
            >
              <div className="relative h-56 bg-white/10 flex items-center justify-center">
                <img
                  alt={name}
                  src={image}
                  className="h-full w-full object-contain p-4 rounded-xl"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 bg-gradient-to-r from-[#00c6fb] to-[#005bea] text-white px-4 py-1 rounded-full text-base font-bold shadow-lg border border-white/10">
                  ${price}
                </div>
              </div>
              <CardBody className="p-6">
                <Typography
                  variant="h5"
                  className="font-bold mb-2 text-[#00c6fb]"
                >
                  {name}
                </Typography>
                <Typography
                  variant="paragraph"
                  className="mb-4 text-sm text-gray-200"
                >
                  {description}
                </Typography>
              </CardBody>
              <CardFooter className="pt-0 px-6 pb-6 flex flex-col gap-3">
                <Button
                  onClick={() => navigate(`/products/${id}`)}
                  className="w-full py-2 text-base bg-gradient-to-r from-[#00c6fb] to-[#005bea] text-white font-bold shadow-md hover:scale-105 transition-transform"
                >
                  View Details
                </Button>
                <Button
                  onClick={() => {
                    const existingItem = cart.find((item) => item.id === id);
                    if (existingItem) {
                      setCart(
                        cart.map((item) =>
                          item.id === id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                        )
                      );
                    } else {
                      setCart([
                        ...cart,
                        {
                          id,
                          name,
                          price: Number(price),
                          quantity: 1,
                        },
                      ]);
                    }
                    Swal.fire({
                      icon: "success",
                      title: "Added to Cart",
                      showConfirmButton: false,
                      timer: 1000,
                      toast: true,
                      position: "top-end",
                    });
                  }}
                  className="w-full py-2 font-semibold bg-gradient-to-r from-[#ffb86b] to-[#ff6bcb] text-white shadow-md hover:scale-105 transition-transform"
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
