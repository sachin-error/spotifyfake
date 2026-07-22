import { useState } from "react";

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label htmlFor="email" className="block text-xs text-hkf-mute mb-1.5">
          &gt; email
        </label>
        <input
          id="email"
          type="email"
          placeholder="name@gmail.com"
          required
          onChange={handleChange}
          className="w-full bg-black/50 border border-[rgba(0,255,100,.15)] text-white
          placeholder-hkf-mute px-3 py-2.5 rounded-md text-sm
          focus:outline-none focus:border-hkf-green focus:shadow-glow transition"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-xs text-hkf-mute mb-1.5">
          &gt; password
        </label>
        <input
          id="password"
          type="password"
          required
          onChange={handleChange}
          className="w-full bg-black/50 border border-[rgba(0,255,100,.15)] text-white
          placeholder-hkf-mute px-3 py-2.5 rounded-md text-sm
          focus:outline-none focus:border-hkf-green focus:shadow-glow transition"
        />
      </div>

      <div className="flex items-center justify-between text-xs sm:text-sm gap-2 flex-wrap">
        <label className="flex items-center gap-2 text-hkf-mute cursor-pointer">
          <input id="remember" type="checkbox" className="accent-hkf-green w-4 h-4" />
          Remember me
        </label>

        <span className="text-hkf-green hover:underline cursor-pointer">
          Forgot password?
        </span>
      </div>

      <button
        type="submit"
        className="border border-hkf-green text-hkf-green font-semibold py-2.5 rounded-md
        hover:bg-hkf-green hover:text-black transition duration-200"
      >
        Log In
      </button>

      <p className="text-xs sm:text-sm text-hkf-mute text-center">
        No account?{" "}
        <span className="text-hkf-green hover:underline cursor-pointer">
          Sign up
        </span>
      </p>
    </form>
  );
}

export default LoginForm;
