import { useState } from "react";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Temporary success (backend later)
    setSuccess("Account created successfully!");
    console.log("User Registered:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <p className="text-red-400 text-xs sm:text-sm">{error}</p>
      )}

      {success && (
        <p className="text-hkf-green text-xs sm:text-sm">{success}</p>
      )}

      <div>
        <label htmlFor="name" className="block text-xs text-hkf-mute mb-1.5">
          Full name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-black/50 border border-[rgba(0,255,100,.15)] text-white
          p-2.5 rounded-md text-sm
          focus:outline-none focus:border-hkf-green focus:shadow-glow transition"
        />
      </div>

      <div>
        <label htmlFor="reg-email" className="block text-xs text-hkf-mute mb-1.5">
          Email
        </label>
        <input
          id="reg-email"
          type="email"
          name="email"
          placeholder="name@gmail.com"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-black/50 border border-[rgba(0,255,100,.15)] text-white
          placeholder-hkf-mute p-2.5 rounded-md text-sm
          focus:outline-none focus:border-hkf-green focus:shadow-glow transition"
        />
      </div>

      <div>
        <label htmlFor="reg-password" className="block text-xs text-hkf-mute mb-1.5">
          Password
        </label>
        <input
          id="reg-password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full bg-black/50 border border-[rgba(0,255,100,.15)] text-white
          p-2.5 rounded-md text-sm
          focus:outline-none focus:border-hkf-green focus:shadow-glow transition"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-xs text-hkf-mute mb-1.5">
          Confirm password
        </label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full bg-black/50 border border-[rgba(0,255,100,.15)] text-white
          p-2.5 rounded-md text-sm
          focus:outline-none focus:border-hkf-green focus:shadow-glow transition"
        />
      </div>

      <button
        type="submit"
        className="border border-hkf-green text-hkf-green font-semibold py-2.5 rounded-md
        hover:bg-hkf-green hover:text-black transition duration-200"
      >
        Create Account
      </button>
    </form>
  );
}

export default RegisterForm;