import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import context from "../../context/context";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FaHeart } from "react-icons/fa";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const { cart, setCart } = useContext(context);
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlPro = import.meta.env.VITE_DB_PRODUCTS;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${urlPro}/${id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        setError(navigate("/not-found"));
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Typography variant="h5" color="blue-gray">
          Loading...
        </Typography>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Typography variant="h5" color="red">
          {error || "Product not found"}
        </Typography>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex justify-center items-center p-6 bg-transparent">
      <div
        className="fixed top-0 left-0 w-full h-screen -z-10 bg-cover bg-center "
        style={{
          backgroundImage:
            "url('https://img.pikbest.com/wp/202346/dumbbell-shining-metal-in-3d-rendering_9729554.jpg!w700wp')",
        }}
      ></div>

      <Card className="w-full max-w-3xl flex flex-col md:flex-row bg-white/90 backdrop-blur-md shadow-xl z-10 rounded-xl overflow-hidden">
        <CardHeader className="md:w-1/2 h-80 md:h-auto">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full rounded-t-xl md:rounded-l-xl md:rounded-tr-none transition-transform duration-300 hover:scale-105 shadow-lg"
          />
        </CardHeader>

        <CardBody className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <Typography
              variant="h4"
              color="blue-gray"
              className="mb-2 font-bold"
            >
              {product.name}
            </Typography>

            <Typography color="gray" className="mb-4 text-lg">
              {product.description}
            </Typography>

            <Typography
              variant="h5"
              color="green"
              className="mb-4 font-semibold"
            >
              ${product.price}
            </Typography>
          </div>

          <div className="flex flex-col  gap-4">
            <div className="flex gap-4">
              <Button
                color="green"
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
                className="w-full"
              >
                Add to Cart
              </Button>
              <Button
                color="red"
                variant="outlined"
                onClick={() => alert(`Added ${product.name} to Wishlist!`)}
                className="w-full flex items-center justify-center gap-2"
              >
                <FaHeart /> Wishlist
              </Button>
            </div>
            <Button
              color="gray"
              variant="outlined"
              onClick={() => navigate("/products")}
              className="w-full mt-2"
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
