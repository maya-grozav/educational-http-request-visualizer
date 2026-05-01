import { useState } from "react";
import { useBrowser } from "../../../contexts/BrowserContext";
import Spinner from "../../common/Spinner";
import { api } from "../../../lib/api.js";
import { useAuth } from "../../../contexts/AuthContext.jsx";

const LoginPage = () => {
  const { navigate } = useBrowser();
  const { setUser } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    api
      .post("/auth/login", { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.user.id);
        localStorage.setItem("username", res.data.user.username);
        localStorage.setItem("email", res.data.user.email);
        localStorage.setItem("account_type", res.data.user.account_type);
        localStorage.setItem("current_period_end", res.data.user.current_period_end);

        setUser(res.data.user);

        navigate("https://webpeek.com");
      })
      .catch((err) => {
        setError(err.data.error);
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleLogin();
  };

  return (
    <div className="w-full h-[80vh] flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
          >
            Sign In
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
          </span>
          <span
            onClick={() => navigate("https://webpeek.com/register")}
            className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 cursor-pointer"
          >
            Register
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
