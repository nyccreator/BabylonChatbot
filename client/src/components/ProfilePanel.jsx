import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export const ProfilePanel = ({ topPadding = "pt-10" }) => {
  const { user, login, signup, logout } = useAuth();
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      if (mode === "login") {
        await login(username, password);
      } else {
        await signup(username, password);
      }
      setUsername("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (user) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center gap-10 ${topPadding} text-2xl`}
      >
        <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-babylon-blue-dark text-white ring ring-white dark:bg-babylon-blue-light sm:text-base md:h-16 md:w-16 md:text-lg lg:h-16 lg:w-16 lg:text-xl">
          <img
            className="inline-block h-12 w-12 rounded-full ring ring-white md:h-16 md:w-16 lg:h-16 lg:w-16"
            src="/src/assets/user.png"
            alt="logo"
          />
        </div>
        <p className="flex font-medium text-babylon-blue-dark">
          {user.username}
        </p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            logout();
          }}
        >
          <input
            type="submit"
            value="Log out"
            className="rounded-3xl border-2 border-babylon-blue-dark bg-white px-4 py-1 text-sm font-semibold text-black hover:border-transparent hover:bg-babylon-blue-dark hover:text-white focus:outline-none focus:ring-2 focus:ring-babylon-blue-dark focus:ring-offset-2"
          />
        </form>
      </div>
    );
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div
        className={`relative flex flex-col items-center justify-center gap-6 ${topPadding}`}
      >
        <h3 className="text-2xl font-medium text-babylon-blue-dark">
          {mode === "login" ? "Log in" : "Sign up"}
        </h3>
        <input
          className="block w-full rounded-3xl border border-slate-300 bg-white py-2 pl-9 pr-3 font-medium drop-shadow-lg placeholder:italic placeholder:text-slate-400 focus:border-babylon-blue-dark focus:outline-none focus:ring-1 focus:ring-babylon-blue-dark sm:text-base"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
          minLength={3}
        />
        <input
          className="block w-full rounded-3xl border border-slate-300 bg-white py-2 pl-9 pr-3 font-medium drop-shadow-lg placeholder:italic placeholder:text-slate-400 focus:border-babylon-blue-dark focus:outline-none focus:ring-1 focus:ring-babylon-blue-dark sm:text-base"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={6}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <input
          type="submit"
          value={
            submitting
              ? "Please wait..."
              : mode === "login"
                ? "Log in"
                : "Sign up"
          }
          disabled={submitting}
          className="rounded-3xl border-2 border-babylon-blue-dark bg-white px-4 py-1 text-sm font-semibold text-black hover:border-transparent hover:bg-babylon-blue-dark hover:text-white focus:outline-none focus:ring-2 focus:ring-babylon-blue-dark focus:ring-offset-2 disabled:opacity-50"
        />
        <button
          type="button"
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setError("");
            setUsername("");
            setPassword("");
          }}
          className="text-sm text-babylon-blue-dark underline"
        >
          {mode === "login"
            ? "No account? Sign up"
            : "Already have an account? Log in"}
        </button>
      </div>
    </form>
  );
};
