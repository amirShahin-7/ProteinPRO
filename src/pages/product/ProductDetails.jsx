import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import context from "../../context/context";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
} from "@material-tailwind/react";

const ProductDetails = () => {
  const { id } = useParams();
  const { cart, setCart, products } = useContext(context);
  const navigate = useNavigate();

  const product = products.find((item) => item.id === Number(id));

  if (!product)
    return (
      <h2 className="text-center text-red-500 mt-20">Product not found</h2>
    );

  return (
    <div className="relative min-h-screen flex justify-center items-center p-6 bg-transparent">
      <div
        className="fixed top-0 left-0 w-full h-screen -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.pikbest.com/wp/202346/dumbbell-shining-metal-in-3d-rendering_9729554.jpg!w700wp')",
        }}
      ></div>

      <Card className="w-full max-w-4xl flex flex-col md:flex-row bg-white/80 backdrop-blur-md shadow-lg z-10">
        <CardHeader className="md:w-1/2 max-h-[400px] overflow-hidden m-4 rounded-xl">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover rounded-xl"
          />
        </CardHeader>

        <CardBody className="md:w-1/2 p-6">
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {product.name}
          </Typography>

          <Typography color="gray" className="mb-4">
            {product.description}
          </Typography>

          <Typography variant="h5" color="blue" className="mb-4">
            ${product.price}
          </Typography>

          <div className="flex gap-4 items-center">
            <Button
              color="blue"
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
              color="gray"
              variant="outlined"
              onClick={() => navigate("/products")}
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
