import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const NotAllowed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#181c2b] via-[#232946] to-[#0f172a] text-center gap-6 font-sans relative overflow-hidden pt-32 text-gray-100">
      {/* Decorative overlays */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-[#00c6fb]/30 to-[#005bea]/10 rounded-full blur-3xl z-0" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 bg-gradient-to-tr from-[#ffb86b]/30 to-[#ff6bcb]/10 rounded-full blur-3xl z-0" />
      <div className="z-10 relative bg-gradient-to-br from-[#232946]/80 to-[#181c2b]/80 border border-white/10 shadow-2xl rounded-3xl backdrop-blur-xl px-10 py-12 max-w-lg w-full">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ff6bcb] to-[#ffb86b] mb-4 drop-shadow-lg">
          Access Denied 🚫
        </h1>
        <p className="text-gray-200 text-lg mb-6">
          You are not authorized to view this page.
        </p>
        <Button
          className="bg-gradient-to-r from-[#00c6fb] to-[#005bea] text-white font-bold px-8 py-3 rounded-xl shadow-md hover:scale-105 transition-transform"
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default NotAllowed;
