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
import axios from "axios";
import context from "../../context/context";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
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

  const handleSignUp = async (e) => { // Make the handler async
    e.preventDefault();
    setFormSubmitted(true);
    handleValidation();

    if (!isUsernameValid || !isEmailValid || !isPasswordValid || !isGenderValid || !isPhoneValid) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill in all fields correctly!",
      });
      return; // Stop execution if validation fails
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        username,
        gender,
        phone,
        role: "user"
      });

      Swal.fire({
        icon: "success",
        title: "Account Created",
        text: "You can now log in!",
      });
      navigate("/Login"); // Navigate to login page after successful signup
    } catch (error) {
      console.error("Error signing up:", error); // Log error
      let errorMessage = "An error occurred during signup.";
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = "The email address is already in use by another account.";
          break;
        case 'auth/invalid-email':
          errorMessage = "The email address is invalid.";
          break;
        case 'auth/operation-not-allowed':
          errorMessage = "Email/password accounts are not enabled. Enable Email/Password sign-in in the Firebase console.";
          break;
        case 'auth/weak-password':
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
    <div className="relative h-full overflow-hidden">
      <div
        className="fixed top-0 left-0 w-full h-screen -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('logo2.png')" }}
      ></div>
      <Card className="w-96 flex flex-col mx-auto justify-center mt-32">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign Up
          </Typography>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSignUp} className="flex flex-col gap-4">
            <Input
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              color={isUsernameValid ? "green" : "red"}
              error={!isUsernameValid && username !== ""}
            />
            <Input
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              color={isEmailValid ? "green" : "red"}
              error={!isEmailValid && email !== ""}
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              color={isPasswordValid ? "green" : "red"}
              error={!isPasswordValid && password !== ""}
            />
            <Input
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              color={isPhoneValid ? "green" : "red"}
              error={!isPhoneValid && phone !== ""}
            />
            <div>
              <Typography variant="small" className="mb-2">
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
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={() => setGender("female")}
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>
            <Button
              variant="gradient"
              color="blue"
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
          <Typography variant="small" className="mt-6 flex justify-center">
            Already have an account?
            <Typography
              as={Link}
              to="/Login"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
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
