import { useEffect, useState } from "react";
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

const urlUser = import.meta.env.VITE_DB_USERS;

const SignUp = () => {
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

  const handleSignUp = () => {
    setFormSubmitted(true);
    handleValidation();

    if (
      isUsernameValid &&
      isEmailValid &&
      isPasswordValid &&
      isGenderValid &&
      isPhoneValid
    ) {
      axios.get(`${urlUser}?email=${email}`).then((res) => {
        if (res.data.length > 0) {
          Swal.fire({
            icon: "error",
            title: "Email already registered",
            text: "Please use a different email.",
          });
        } else {
          const newUser = {
            username,
            email,
            password,
            gender,
            phone,
            image: "",
            role: "user",
          };
          axios.post(urlUser, newUser).then(() => {
            Swal.fire({
              icon: "success",
              title: "Account Created",
              text: "You can now log in!",
            });
            navigate("/Login");
          });
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill in all fields correctly!",
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
        <CardBody className="flex flex-col gap-4">
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
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            variant="gradient"
            color="blue"
            fullWidth
            onClick={handleSignUp}
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
