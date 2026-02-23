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
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {success && (
        <p className="text-green-500 text-sm">{success}</p>
      )}

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className="bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        className="bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded-lg transition duration-300"
      >
        Create Account
      </button>

    </form>
  );
}

export default RegisterForm;