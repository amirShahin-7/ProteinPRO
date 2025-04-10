import { Typography } from "@material-tailwind/react";
import Products from "./../products/Products";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center text-6xl dark:text-white">
      {/* welcome to our site
      <Typography
        as={Link}
        to="/products"
        className=" bg-green-600 p-3 text-3xl rounded"
      >
        Enter
      </Typography> */}
    </div>
  );
};

export default Home;
