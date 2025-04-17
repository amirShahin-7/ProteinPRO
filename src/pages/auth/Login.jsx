import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import context from "../../context/context";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
import axios from "axios";

const urlUser = import.meta.env.VITE_DB_USERS;

const Login = () => {
  const { setLogged } = useContext(context);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await axios.get(`${urlUser}?email=${email}`);
      const matchedUser = res.data[0];

      if (!matchedUser || matchedUser.password !== password) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Email or password is incorrect!",
        });
        return;
      }

      localStorage.setItem("userId", matchedUser.id);
      localStorage.setItem("username", matchedUser.username);
      localStorage.setItem("userImage", matchedUser.image);
      localStorage.setItem("role", matchedUser.role);
      setLogged(true);

      if (matchedUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Try again later.",
      });
    }
  };

  return (
    <div className="relative h-full overflow-hidden">
      <div
        className="fixed top-0 left-0 w-full h-screen -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.pikbest.com/wp/202346/dumbbell-shining-metal-in-3d-rendering_9729554.jpg!w700wp')",
        }}
      ></div>
      <Card className="w-96 flex flex-col mx-auto justify-center mt-32">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="Email"
            size="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            size="lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Checkbox
            label="Show Password"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            variant="gradient"
            color="blue"
            fullWidth
            onClick={handleLogin}
            disabled={!email || !password}
          >
            Sign In
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don't have an account?
            <Typography
              as={Link}
              to="/sign-up"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Sign Up
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
