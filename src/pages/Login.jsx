import gsap from "gsap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/usercontext.jsx";
import React, { useEffect, useRef, useState, useContext } from "react";
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const formRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    if (
      !logoRef.current ||
      !titleRef.current ||
      !subtitleRef.current ||
      !formRef.current
    ) {
      return;
    }

    gsap.killTweensOf([
      logoRef.current,
      titleRef.current,
      subtitleRef.current,
      formRef.current,
    ]);

    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
        duration: 0.6,
        opacity: 0,
      },
    });

    tl.fromTo(
      logoRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    )
      .fromTo(
        titleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=0.4"
      )
      .fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=0.4"
      );

    const formElements = formRef.current;
    if (formElements.length > 0) {
      tl.fromTo(
        formElements,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1 },
        "-=0.2"
      );
    } else {
      tl.fromTo(
        formRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.3"
      );
    }

    gsap.to(".bg-gradient", {
      backgroundPosition: "100% 100%",
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(".decorative-blob", {
      y: -15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.5,
    });

    const particlesContainer = document.getElementById("particles");
    if (particlesContainer) {
      particlesContainer.innerHTML = "";

      for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div");
        particle.className = "absolute rounded-full bg-blue-500/10";

        const size = Math.random() * 20 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        particlesContainer.appendChild(particle);

        gsap.to(particle, {
          x: `${(Math.random() - 0.5) * 100}`,
          y: `${(Math.random() - 0.5) * 100}`,
          opacity: Math.random() * 0.5,
          duration: Math.random() * 20 + 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }
  }, []);

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login submitted", { email, password });

    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/users/login`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/");
      }
    } catch (error) {
      console.error(
        "Error During SignIn:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1A2233] to-[#252B39] select-none">
      {/* Animated background gradient overlay */}
      <div
        className="bg-gradient absolute inset-0 opacity-20"
        style={{
          backgroundSize: "200% 200%",
          backgroundImage:
            "radial-gradient(circle at top left, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
        }}
      ></div>

      {/* Login card */}
      <div className="bg-[#161E29] rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8 border border-gray-800 relative overflow-hidden z-10">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-700"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-blue-600/10 rounded-full blur-xl"></div>

        {/* Logo and title */}
        <div className="flex flex-col items-center mb-8">
          <div
            ref={logoRef}
            className="bg-gradient-to-br from-blue-500 to-blue-700 p-3 rounded-xl shadow-lg mb-4"
          >
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 ref={titleRef} className="text-2xl font-bold text-white">
            Disaster Management
          </h1>
          <p ref={subtitleRef} className="text-gray-400 text-center mt-2">
            Sign in to access your dashboard
          </p>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#1E2736] text-white w-full pl-10 pr-3 py-3 rounded-xl border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-300"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-[#1E2736] text-white w-full pl-10 pr-12 py-3 rounded-xl border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-300"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-300 transition duration-200" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500 hover:text-gray-300 transition duration-200" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-700 bg-[#1E2736] text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
              />
              <label htmlFor="remember-me" className="ml-2 block text-gray-400">
                Remember me
              </label>
            </div>
            <Link
              to="/reset-password"
              className="text-blue-400 hover:text-blue-300 transition duration-300"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="group w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-xl font-medium transition duration-300 flex items-center justify-center"
          >
            Sign in
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </form>

        {/* Sign up link */}
        <div className="mt-6 text-center text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-400 hover:text-blue-300 transition duration-300"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
