import RegisterForm from "../components/auth/RegisterForm";

function Register() {
  return (
    <div className="flex items-center justify-center h-full text-white">
      <div className="bg-gray-900 p-8 rounded-xl w-96">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        <RegisterForm />
      </div>
    </div>
  );
}

export default Register;