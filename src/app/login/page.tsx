"use client";

import React, { useState } from "react";
import AnimatedCanvas from "../../components/AnimatedCanvas";
import defaultCanvasConfig from "../../lib/canvasConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Sign in", { email, password });
    alert("Sign-in attempted (demo). Check console.");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
      <AnimatedCanvas className="login-canvas w-full h-full" config={defaultCanvasConfig} />

      <div className="login-content w-full max-w-md p-8">
        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-semibold mb-4 text-gray-900">Welcome back</h1>
          <p className="text-sm text-gray-600 mb-6">Sign in to continue to your dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="text-sm text-gray-700">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="you@example.com"
              />
            </label>

            <label className="block">
              <span className="text-sm text-gray-700">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="••••••••"
              />
            </label>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center text-sm">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" />
                <span className="ml-2 text-gray-700">Remember me</span>
              </label>

              <a className="text-sm text-indigo-600 hover:underline" href="#">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full inline-flex justify-center items-center gap-2 rounded-md bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Sign in
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account? <a className="text-indigo-600 hover:underline" href="#">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
