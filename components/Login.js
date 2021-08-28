import { signIn } from "next-auth/client";

function Login() {
  return (
    <div className="grid place-items-center h-screen bg-gray-800">
      <div className="flex flex-col items-center space-y-5">
        <p className="uppercase font-bold text-2xl tracking-widest z-40 text-white">
          Todo
        </p>
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:shadow-md active:bg-blue-700"
          onClick={() => signIn()}
        >
          Let's get productive
        </button>
      </div>
    </div>
  );
}

export default Login;
