import { Navbar } from "flowbite-react";
import { HiHome, HiMagnifyingGlass } from "react-icons/hi2";
import { useNavigate, useLocation } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Navbar
      fluid
      rounded={false}
      className="fixed top-0 left-0 w-full z-50 
      bg-gradient-to-r from-black via-gray-900 to-black 
      backdrop-blur-md border-b border-gray-800 px-6 h-16"
    >
      {/* LEFT - Logo + Home Icon */}
      <div className="flex items-center gap-4">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center font-bold text-black cursor-pointer"
        >
          H
        </div>

        <span
          onClick={() => navigate("/")}
          className="text-xl font-semibold text-white tracking-wide cursor-pointer"
        >
          Hackify
        </span>

        {/* Home Icon */}
        <button
          onClick={() => navigate("/")}
          className={`transition ${
            location.pathname === "/"
              ? "text-white"
              : "text-gray-500 hover:text-white"
          }`}
        >
          <HiHome className="text-2xl" />
        </button>
      </div>

      {/* CENTER - Search Bar */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-md">
          <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search songs, artists..."
            className="w-full pl-12 pr-4 py-2 rounded-full 
            bg-gray-800/80 text-white placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-green-500
            transition duration-300"
          />
        </div>
      </div>

      {/* RIGHT - Login / Signup */}
      <div className="flex items-center gap-4">

        <button
          onClick={() => navigate("/login")}
          className={`transition ${
            location.pathname === "/login"
              ? "text-white"
              : "text-gray-300 hover:text-white"
          }`}
        >
          Login
        </button>

        <button
          onClick={() => navigate("/Register")}
          className="bg-white text-black px-4 py-1.5 rounded-full font-medium hover:scale-105 transition duration-300"
        >
          Sign Up
        </button>

      </div>
    </Navbar>
  );
}

export default NavBar;