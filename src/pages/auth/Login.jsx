import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import context from "../../context/context";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../context/firebase";
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
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const { setLogged, setUserData } = useContext(context);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Fetch user data from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = { id: userDocSnap.id, ...userDocSnap.data() };
        localStorage.setItem("userId", user.uid);
        setLogged(true);
        setUserData(userData);

        if (userData.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
      console.error("Firebase Auth Error:", error);

      let errorMessage = "An error occurred during login.";
      switch (error.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
        case "auth/wrong-password":
          errorMessage = "Invalid email or password.";
          break;
        default:
          errorMessage = error.message;
          break;
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#181c2b] via-[#232946] to-[#0f172a] text-gray-100 font-sans overflow-hidden">
      {/* Decorative gradient overlays */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-[#00c6fb]/30 to-[#005bea]/10 rounded-full blur-3xl z-0" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 bg-gradient-to-tr from-[#ffb86b]/30 to-[#ff6bcb]/10 rounded-full blur-3xl z-0" />
      <Card className="w-full max-w-md mx-auto z-10 bg-gradient-to-br from-[#232946]/80 to-[#181c2b]/80 border border-white/10 shadow-2xl rounded-3xl backdrop-blur-xl">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center rounded-t-3xl bg-gradient-to-r from-[#00c6fb] to-[#005bea]"
        >
          <Typography
            variant="h3"
            className="font-extrabold text-white drop-shadow-lg"
          >
            Sign In
          </Typography>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <Input
              label="Email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-white"
              labelProps={{ className: "text-[#00c6fb] font-semibold" }}
              crossOrigin="anonymous"
            />
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-white"
              labelProps={{ className: "text-[#00c6fb] font-semibold" }}
              crossOrigin="anonymous"
            />
            <Checkbox
              label="Show Password"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="text-[#00c6fb]"
              labelProps={{ className: "text-[#00c6fb] font-semibold" }}
              crossOrigin="anonymous"
            />
            <Button
              variant="gradient"
              className="bg-gradient-to-r from-[#00c6fb] to-[#005bea] text-white font-bold shadow-lg hover:scale-105 transition-transform text-lg py-3"
              fullWidth
              type="submit"
              disabled={!email || !password}
            >
              Sign In
            </Button>
          </form>
        </CardBody>
        <CardFooter className="pt-0">
          <Typography
            variant="small"
            className="mt-6 flex justify-center text-gray-200"
          >
            Don't have an account?
            <Typography
              as={Link}
              to="/sign-up"
              variant="small"
              className="ml-1 font-bold text-[#00c6fb] hover:text-[#ffb86b] transition"
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
