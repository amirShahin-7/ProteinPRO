import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const NotAllowed = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center gap-4">
      <h1 className="text-3xl font-bold text-red-500">Access Denied 🚫</h1>
      <p className="text-gray-600 text-lg">
        You are not authorized to view this page.
      </p>

      <div className="mt-6">
        <Button color="blue" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default NotAllowed;
