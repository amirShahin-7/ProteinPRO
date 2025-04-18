import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import context from "../../context/context";
import {
  Button,
  Typography,
  Card,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";

const Home = () => {
  const { products } = useContext(context);
  const navigate = useNavigate();
  const featured = products.slice(0, 3);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source
          src="bg.mp4"
          type="video/mp4"
          style={{ filter: "brightness(0.4)" }}
        />
      </video>

      <section className="flex flex-col justify-center items-center h-[80vh] px-6">
        <div className="bg-black/50 p-8 rounded-xl text-center text-white backdrop-blur-md shadow-lg">
          <img src="/logo.png" className="w-28 mx-auto mb-4" />
          <Typography variant="h3" className="font-bold mb-2">
            Fuel Your Muscles. Rule the Game.
          </Typography>
          <Typography className="mb-4">
            اكتشف أفضل منتجات البروتين والأداء الرياضي
          </Typography>
          <Button onClick={() => navigate("/products")} color="blue" size="lg">
            Explore Products
          </Button>
        </div>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto text-white">
        <Typography variant="h4" className="text-center mb-8 font-bold">
          Featured Products
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featured.map(({ id, name, image, price }) => (
            <Card
              key={id}
              className="shadow-md bg-white/10 backdrop-blur-sm text-white"
            >
              <CardBody className="text-center">
                <img
                  src={image}
                  alt={name}
                  className="h-40 w-full object-cover mb-4 rounded"
                />
                <Typography variant="h6" className="mb-2">
                  {name}
                </Typography>
                <Typography color="blue" className="mb-2 font-bold">
                  ${price}
                </Typography>
              </CardBody>
              <CardFooter className="flex flex-col gap-2 px-4 pb-4">
                <Button
                  color="blue"
                  onClick={() => navigate(`/products/${id}`)}
                >
                  Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button variant="outlined" onClick={() => navigate("/products")}>
            View All Products
          </Button>
        </div>
      </section>

      <section className="bg-white/10 backdrop-blur-sm text-white py-16 px-6">
        <Typography variant="h4" className="text-center mb-8 font-bold">
          Why Choose Protein Pro?
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <Typography variant="h5" className="mb-2">
              ✅ Original Products
            </Typography>
            <Typography>نضمن لك منتجات أصلية ومعتمدة %100</Typography>
          </div>
          <div>
            <Typography variant="h5" className="mb-2">
              🚚 Fast Delivery
            </Typography>
            <Typography>شحن سريع وآمن لجميع المحافظات</Typography>
          </div>
          <div>
            <Typography variant="h5" className="mb-2">
              🏋️‍♂️ Trusted by Athletes
            </Typography>
            <Typography>مُعتمد من رياضيين محترفين ومستخدمين حقيقيين</Typography>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-black bg-opacity-30   text-white text-center">
        <Typography variant="h4" className="mb-4 font-bold">
          انضم لآلاف الرياضيين وابدأ رحلتك النهاردة
        </Typography>
      </section>
    </div>
  );
};

export default Home;
