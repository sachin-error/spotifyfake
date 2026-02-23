import { useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
  };

  return (
    <div className="flex items-center justify-center h-full text-white">
      <div className="bg-gray-900 p-8 rounded-xl w-96 shadow-xl border border-gray-800">
        
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login to Hackify
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <div>
            <Label htmlFor="email" value="Your Email" className="text-gray-300 mb-2 block" />
            <TextInput
              id="email"
              type="email"
              placeholder="name@gmail.com"
              required
              onChange={handleChange}
              className="bg-gray-800 text-white"
            />
          </div>

          <div>
            <Label htmlFor="password" value="Your Password" className="text-gray-300 mb-2 block" />
            <TextInput
              id="password"
              type="password"
              required
              onChange={handleChange}
              className="bg-gray-800 text-white"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-gray-400">
                Remember me
              </Label>
            </div>

            <span className="text-green-500 hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>

          <Button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-black font-semibold transition duration-300"
          >
            Login
          </Button>

          <p className="text-sm text-gray-400 text-center">
            Don’t have an account?{" "}
            <span className="text-green-500 hover:underline cursor-pointer">
              Sign Up
            </span>
          </p>

        </form>
      </div>
    </div>
  );
}

export default LoginForm;