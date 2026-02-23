import LoginForm from "../components/auth/LoginForm";

function Login() {
  return (
    <div className="flex items-center justify-center h-full text-white">
      <div className="bg-gray-900 p-8 rounded-xl w-96">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;