import { Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex justify-center items-center p-6">
      <div
        className="fixed top-0 left-0 w-full h-screen -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.pikbest.com/wp/202346/dumbbell-shining-metal-in-3d-rendering_9729554.jpg!w700wp')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      <div className="text-center z-10">
        <Typography
          variant="h1"
          color="red"
          className="text-6xl md:text-8xl font-bold mb-4"
        >
          404
        </Typography>
        <Typography variant="h4" color="white" className="mb-6">
          Oops! Page Not Found
        </Typography>
        <Typography color="gray" className="mb-8 text-white">
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Button
          color="blue"
          onClick={() => navigate("/")}
          className="px-4 py-2 text-lg"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
