import RegisterForm from "../components/auth/RegisterForm";
import TerminalWindow from "../components/common/TerminalWindow";

function Register() {
  return (
    <div className="flex items-center justify-center min-h-full px-4 py-10">
      <div className="w-full max-w-sm sm:max-w-md">
        <TerminalWindow path="guest@hackify:~/register$">
          <h2 className="text-xl sm:text-2xl font-heading font-bold mb-6 text-white">
            <span className="text-hkf-green">$</span> ./create_account.sh
          </h2>
          <RegisterForm />
        </TerminalWindow>
      </div>
    </div>
  );
}

export default Register;
