import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Rating,
  CardHeader, // Import CardHeader
} from "@material-tailwind/react";
import { useContext } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // Import db from firebase.js
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { context } from '../../context/context'; // Corrected context import path

const Products = () => {
  const [products, setProducts] = useState([]); // Define state for products
  const { cart, setCart } = useContext(context); // Keep cart and setCart from context if needed

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'products');
      const productSnapshot = await getDocs(productsCollection);
      const productsList = productSnapshot.docs.map(doc => ({
        id: doc.id, // Get the document ID as the product ID
        ...doc.data()
      }));
      setProducts(productsList); // Set the products state with fetched data
    };
    fetchProducts();
  }, []); // Empty dependency array means this effect runs once on mount

  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-cover bg-center"
      style={{
        backgroundImage: "url('logo.png')",
      }}
    >
      <h1 className="flex flex-col content-center items-center text-3xl p-3 text-blue-500">
        Our Protein
      </h1>
      <div className="w-full max-w-6xl mx-auto flex flex-wrap justify-center gap-6 px-6">
        {products.map(
          ({ id, price, description, image, name, rating }, index) => (
            <Card
              className="w-64 bg-white/80 backdrop-blur-md shadow-md"
              key={id} // Use product id as key
            >
              {/* Image placed directly in CardBody or adjust CardHeader usage */}
                <img
                  alt="Product"
                  src={image}
                  className="h-full w-full object-contain rounded-t-md"
                />
              <CardBody>
                <div className="mb-2 flex flex-col items-start justify-between">
                  <Typography color="blue-gray" className="font-medium text-lg">
                    {name}
                  </Typography>
                  <Typography color="blue-gray" className="font-medium">
                    ${price}
                  </Typography>
                </div>
                <Typography variant="small" color="gray" className="mb-2">
                  {description.slice(0, 50)}...
                  {description.length > 50 && "..."} {/* Add ellipsis only if description is longer */}
                </Typography>
                {/* Commenting out rating display as data does not contain rating field */}
                {/* <div className="flex items-center gap-2">
                  {rating?.toFixed(1)}
                  <Rating value={Math.round(rating)} readonly />
                </div> */}
                <Typography variant="small" color="gray">
                  Based on 134 Reviews
                </Typography>
              </CardBody>
              <CardFooter className="pt-0 flex flex-col gap-2">
                <Button
                  onClick={() => navigate(`/products/${id}`)}
                  color="blue"
                  className="w-full"
                >
                  Details
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
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </div>
  );
};

export default Products;
