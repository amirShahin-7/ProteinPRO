import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import context from "../../context/context";
import { collection, getDocs } from "firebase/firestore";
import {
  Button,
  Typography,
  Card,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { db } from "../../context/firebase";

const Home = () => {
  const { products, setProducts, logged, currentUser } = useContext(context);
  const navigate = useNavigate();
  const featured = products ? products.slice(0, 3) : [];

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    };
    fetchProducts();
  }, [setProducts]);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-[#181c2b] via-[#232946] to-[#0f172a] text-gray-100 font-sans">
      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center h-[80vh] relative z-10">
        <div className="bg-gradient-to-br from-[#232946]/80 to-[#181c2b]/80 p-10 rounded-3xl text-center text-white shadow-2xl border border-white/10 backdrop-blur-xl max-w-xl w-full mx-4">
          <img
            src="https://i.postimg.cc/YCXJv7tR/logo.png"
            className="w-32 mx-auto mb-6 drop-shadow-lg"
            loading="lazy"
            alt="Protein Pro Logo"
          />
          <Typography
            variant="h2"
            className="font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00c6fb] to-[#005bea]"
          >
            Fuel Your Muscles. Rule the Game.
          </Typography>
          <Typography className="mb-6 text-lg text-gray-200">
            Discover the best protein and sports performance products.
          </Typography>
          <Button
            onClick={() => navigate("/products")}
            color="blue"
            size="lg"
            className="bg-gradient-to-r from-[#00c6fb] to-[#005bea] text-white font-bold shadow-lg hover:scale-105 transition-transform"
          >
            Explore Products
          </Button>
        </div>
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="w-96 h-96 bg-gradient-to-br from-[#00c6fb]/30 to-[#005bea]/10 rounded-full blur-3xl absolute -top-32 -left-32" />
          <div className="w-80 h-80 bg-gradient-to-tr from-[#ffb86b]/30 to-[#ff6bcb]/10 rounded-full blur-3xl absolute -bottom-24 -right-24" />
        </div>
      </section>
      {/* Featured Products */}
      <section className="py-20 px-6 container mx-auto">
        <Typography
          variant="h3"
          className="text-center mb-12 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00c6fb] to-[#005bea]"
        >
          Featured Products
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {featured.map(({ id, name, image, price }) => (
            <Card
              key={id}
              className="shadow-xl bg-gradient-to-br from-[#232946]/80 to-[#181c2b]/80 border border-white/10 text-white rounded-2xl hover:scale-105 transition-transform"
            >
              <CardBody className="text-center flex flex-col items-center">
                <img
                  src={image}
                  alt={name}
                  className="h-64 w-full object-contain mb-6 rounded-xl bg-white/10 p-4 shadow-inner"
                  loading="lazy"
                />
                <Typography
                  variant="h5"
                  className="mb-2 font-bold text-[#00c6fb]"
                >
                  {name}
                </Typography>
                <Typography className="mb-2 font-bold text-lg text-[#ffb86b]">
                  ${price}
                </Typography>
              </CardBody>
              <CardFooter className="flex flex-col gap-2 px-4 pb-4">
                <Button
                  className="bg-gradient-to-r from-[#00c6fb] to-[#005bea] text-white font-bold shadow-md hover:scale-105 transition-transform"
                  onClick={() => navigate(`/products/${id}`)}
                >
                  Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Button
            variant="gradient"
            className="bg-gradient-to-r from-[#ffb86b] to-[#ff6bcb] text-white font-bold px-8 py-3 text-lg shadow-lg hover:scale-105 transition-transform"
            onClick={() => navigate("/products")}
          >
            View All Products
          </Button>
        </div>
      </section>
      {/* Why Choose Us */}
      <section className="bg-gradient-to-br from-[#232946]/80 to-[#181c2b]/80 border-t border-white/10 py-20 px-6">
        <Typography
          variant="h3"
          className="text-center mb-12 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ffb86b] to-[#ff6bcb]"
        >
          Why Choose Protein Pro?
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="bg-white/5 rounded-2xl p-8 shadow-lg border border-white/10 hover:scale-105 transition-transform">
            <Typography variant="h5" className="mb-3 font-bold text-[#00c6fb]">
              ✅ Original Products
            </Typography>
            <Typography className="text-gray-200">
              We guarantee 100% original and certified products.
            </Typography>
          </div>
          <div className="bg-white/5 rounded-2xl p-8 shadow-lg border border-white/10 hover:scale-105 transition-transform">
            <Typography variant="h5" className="mb-3 font-bold text-[#ffb86b]">
              🚚 Fast Delivery
            </Typography>
            <Typography className="text-gray-200">
              Fast and safe shipping to all governorates
            </Typography>
          </div>
          <div className="bg-white/5 rounded-2xl p-8 shadow-lg border border-white/10 hover:scale-105 transition-transform">
            <Typography variant="h5" className="mb-3 font-bold text-[#ff6bcb]">
              🏋️‍♂️ Trusted by Athletes
            </Typography>
            <Typography className="text-gray-200">
              Endorsed by professional athletes and real users
            </Typography>
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-[#00c6fb]/20 via-[#005bea]/10 to-[#ffb86b]/10 text-white text-center">
        <Typography
          variant="h3"
          className="mb-6 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ffb86b] to-[#ff6bcb]"
        >
          Join thousands of athletes and start your journey today.
        </Typography>
        <Button
          onClick={() =>
            currentUser || logged ? navigate("/products") : navigate("/sign-up")
          }
          className="mt-4 bg-gradient-to-r from-[#00c6fb] to-[#005bea] text-white font-bold px-8 py-3 text-lg shadow-lg hover:scale-105 transition-transform"
        >
          {currentUser || logged ? "Go to Products" : "Get Started"}
        </Button>
      </section>
    </div>
  );
};

export default Home;
