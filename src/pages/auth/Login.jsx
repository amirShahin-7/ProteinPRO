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
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase"; // Assuming firebase.js is in the parent directory of context

const Login = () => {
  const { setLogged, setUserData } = useContext(context);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user data from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = { id: userDocSnap.id, ...userDocSnap.data() };
        localStorage.setItem("userId", user.uid); // Use UID as userId
        setLogged(true);
        setUserData(userData);

        if (userData.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
      else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message, // Display Firebase error message
      });
      console.error("Firebase Auth Error:", error); // Log Firebase error

      let errorMessage = "An error occurred during login.";
      switch (error.code) {
        case 'auth/invalid-email':
        case 'auth/user-disabled':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = "Invalid email or password.";
          break;
        default:
          errorMessage = error.message;
          break;
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
        <CardBody>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
            <Button
              variant="gradient"
              color="blue"
              fullWidth
              type="submit"
              disabled={!email || !password}
            >
              Sign In
            </Button>
          </form>
        </CardBody>
        <CardFooter className="pt-0">
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
