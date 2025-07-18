import { useEffect, useState, useContext } from "react";
import {
  Input,
  Button,
  Typography,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import context from "../../context/context";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../context/firebase";
const SignUp = () => {
  const { setLogged, setUserData } = useContext(context);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isGenderValid, setIsGenderValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleValidation = () => {
    setIsUsernameValid(username.trim().length >= 3);
    setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    setIsPasswordValid(password.length >= 6);
    setIsGenderValid(gender === "male" || gender === "female");
    setIsPhoneValid(/^01[0-9]{9}$/.test(phone));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    handleValidation();

    if (
      !isUsernameValid ||
      !isEmailValid ||
      !isPasswordValid ||
      !isGenderValid ||
      !isPhoneValid
    ) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill in all fields correctly!",
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        username,
        gender,
        phone,
        role: "user",
        email,
      });

      Swal.fire({
        icon: "success",
        title: "Account Created",
        text: "You can now log in!",
      });
      navigate("/Login");
    } catch (error) {
      let errorMessage = "An error occurred during signup.";
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage =
            "The email address is already in use by another account.";
          break;
        case "auth/invalid-email":
          errorMessage = "The email address is invalid.";
          break;
        case "auth/operation-not-allowed":
          errorMessage =
            "Email/password accounts are not enabled. Enable Email/Password sign-in in the Firebase console.";
          break;
        case "auth/weak-password":
          errorMessage = "The password is too weak.";
          break;
        default:
          errorMessage = error.message;
          break;
      }
      Swal.fire({
        icon: "error",
        title: "Signup Error",
        text: errorMessage,
      });
    }
  };

  useEffect(() => {
    setIsUsernameValid(username.trim().length >= 3);
    setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    setIsPasswordValid(password.length >= 6);
    setIsGenderValid(gender === "male" || gender === "female");
    setIsPhoneValid(/^01[0-9]{9}$/.test(phone));
  }, [username, email, password, gender, phone]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#181c2b] via-[#232946] to-[#0f172a] text-gray-100 font-sans overflow-hidden">
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
            Sign Up
          </Typography>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSignUp} className="flex flex-col gap-5">
            <Input
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              color={isUsernameValid ? "green" : "red"}
              error={!isUsernameValid && username !== ""}
              className="text-white"
              labelProps={{ className: "text-[#00c6fb] font-semibold" }}
              crossOrigin="anonymous"
            />
            <Input
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              color={isEmailValid ? "green" : "red"}
              error={!isEmailValid && email !== ""}
              className="text-white"
              labelProps={{ className: "text-[#00c6fb] font-semibold" }}
              crossOrigin="anonymous"
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              color={isPasswordValid ? "green" : "red"}
              error={!isPasswordValid && password !== ""}
              className="text-white"
              labelProps={{ className: "text-[#00c6fb] font-semibold" }}
              crossOrigin="anonymous"
            />
            <Input
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              color={isPhoneValid ? "green" : "red"}
              error={!isPhoneValid && phone !== ""}
              className="text-white"
              labelProps={{ className: "text-[#00c6fb] font-semibold" }}
              crossOrigin="anonymous"
            />
            <div>
              <Typography
                variant="small"
                className="mb-2 text-[#00c6fb] font-semibold"
              >
                Gender
              </Typography>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={() => setGender("male")}
                    className="accent-[#00c6fb]"
                  />
                  <span className="text-gray-200">Male</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={() => setGender("female")}
                    className="accent-[#ff6bcb]"
                  />
                  <span className="text-gray-200">Female</span>
                </label>
              </div>
            </div>
            <Button
              variant="gradient"
              className="bg-gradient-to-r from-[#00c6fb] to-[#005bea] text-white font-bold shadow-lg hover:scale-105 transition-transform text-lg py-3"
              fullWidth
              type="submit"
              disabled={
                !isUsernameValid ||
                !isEmailValid ||
                !isPasswordValid ||
                !isGenderValid ||
                !isPhoneValid
              }
            >
              Sign Up
            </Button>
          </form>
        </CardBody>
        <CardFooter className="pt-0">
          <Typography
            variant="small"
            className="mt-6 flex justify-center text-gray-200"
          >
            Already have an account?
            <Typography
              as={Link}
              to="/Login"
              variant="small"
              className="ml-1 font-bold text-[#00c6fb] hover:text-[#ffb86b] transition"
            >
              Sign In
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
