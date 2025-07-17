import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import context from "../../context/context";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../context/firebase";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FaHeart } from "react-icons/fa";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const { id } = useParams();
  const { cart, setCart } = useContext(context);
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productDoc = await getDoc(doc(db, "products", id));
        if (productDoc.exists()) {
          setProduct({ id: productDoc.id, ...productDoc.data() });
        } else {
          setError("Product not found");
        }
        setLoading(false);
      } catch (err) {
        setError("Error fetching product");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#181c2b] via-[#232946] to-[#0f172a] text-gray-100">
        <Typography variant="h5" color="blue-gray">
          Loading...
        </Typography>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#181c2b] via-[#232946] to-[#0f172a] text-gray-100">
        <Typography variant="h5" color="red">
          {error || "Product not found"}
        </Typography>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181c2b] via-[#232946] to-[#0f172a] text-gray-100 font-sans relative overflow-hidden pt-32 flex items-center justify-center">
      {/* Decorative gradient overlays */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-[#00c6fb]/30 to-[#005bea]/10 rounded-full blur-3xl z-0" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 bg-gradient-to-tr from-[#ffb86b]/30 to-[#ff6bcb]/10 rounded-full blur-3xl z-0" />
      <Card className="w-full max-w-3xl flex flex-col md:flex-row bg-gradient-to-br from-[#232946]/80 to-[#181c2b]/80 border border-white/10 backdrop-blur-xl shadow-2xl z-10 rounded-3xl overflow-hidden py-4">
        <CardHeader className="md:w-1/2 h-80 md:h-auto bg-white/10 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none transition-transform duration-300 hover:scale-105 shadow-lg p-10 object-contain bg-white/10"
            loading="lazy"
          />
        </CardHeader>

        <CardBody className="md:w-1/2 p-8 flex flex-col justify-between ">
          <div>
            <Typography
              variant="h4"
              className="mb-2 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00c6fb] to-[#005bea] drop-shadow-lg"
            >
              {product.name}
            </Typography>

            <Typography className="mb-4 text-lg text-gray-200">
              {product.description}
            </Typography>

            <Typography variant="h5" className="mb-4 font-bold text-[#ffb86b]">
              ${product.price}
            </Typography>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Button
                className="w-full bg-gradient-to-r from-[#00c6fb] to-[#005bea] text-white font-bold shadow-md hover:scale-105 transition-transform"
                onClick={() => {
                  const existing = cart.find((item) => item.id === product.id);
                  if (existing) {
                    const updated = cart.map((item) =>
                      item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                            price: Number(item.price),
                          }
                        : item
                    );
                    setCart(updated);
                  } else {
                    setCart([
                      ...cart,
                      {
                        ...product,
                        quantity: 1,
                        price: Number(product.price),
                      },
                    ]);
                  }
                }}
              >
                Add to Cart
              </Button>
              <Button
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#ffb86b] to-[#ff6bcb] text-white font-bold shadow-md hover:scale-105 transition-transform"
                onClick={() =>
                  Swal.fire({
                    icon: "success",
                    title: "Added to Wishlist!",
                    text: `Added ${product.name} to your Wishlist.`,
                    confirmButtonColor: "#d33",
                    confirmButtonText: "OK",
                  })
                }
                variant="filled"
              >
                <FaHeart /> Wishlist
              </Button>
            </div>
            <Button
              className="w-full mt-2 bg-gradient-to-r from-[#232946] to-[#181c2b] text-white font-bold shadow-md hover:scale-105 transition-transform"
              onClick={() => navigate("/products")}
              variant="outlined"
            >
              Back to Products
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProductDetails;
