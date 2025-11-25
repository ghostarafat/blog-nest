"use client";
import { useState } from "react";
import Link from "next/link";
import { auth } from "../../firebase/firebase.config";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const loadingToast = toast.loading("Logging in...");
      await signInWithEmailAndPassword(auth, email, password);
      toast.dismiss(loadingToast);
      toast.success("Login successful!");
      router.push("/");
    } catch (err) {
      toast.error(err.message || "Login failed!");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const loadingToast = toast.loading("Signing in with Google...");
      await signInWithPopup(auth, provider);
      toast.dismiss(loadingToast);
      toast.success("Login successful!");
      router.push("/");
    } catch (err) {
      toast.error(err.message || "Google login failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-md w-full p-6 bg-white border rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        <form className="space-y-3" onSubmit={handleEmailLogin}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full mt-3 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Sign in with Google
        </button>

        {/* Register Link */}
        <p className="mt-4 text-center text-gray-700">
          Don't have an account?{" "}
          <Link href="/signup" className="text-indigo-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
