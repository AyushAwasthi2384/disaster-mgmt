import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  UserPlus,
} from "lucide-react";
import gsap from "gsap";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [newname, setNewName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const logoRef = useRef(null);
  const formElementsRef = useRef([]);

  useEffect(() => {
    // Make sure all refs are properly initialized before animating
    if (
      !logoRef.current ||
      !titleRef.current ||
      !subtitleRef.current ||
      !formRef.current
    ) {
      return;
    }

    // Clear any existing animations
    gsap.killTweensOf([
      logoRef.current,
      titleRef.current,
      subtitleRef.current,
      formRef.current,
    ]);

    // Create a new timeline with clear default properties
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
        duration: 0.6,
        opacity: 0,
      },
    });

    // Simplified animation sequence
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

    // Animate form elements one by one
    const formElements = formElementsRef.current;
    if (formElements.length > 0) {
      tl.fromTo(
        formElements,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1 },
        "-=0.2"
      );
    } else {
      // Fallback if form elements aren't captured
      tl.fromTo(
        formRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.3"
      );
    }

    // Background animation
    gsap.to(".bg-gradient", {
      backgroundPosition: "100% 100%",
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Simple floating animation for decorative elements
    gsap.to(".decorative-blob", {
      y: -15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.5,
    });

    // Particle animation
    const particlesContainer = document.getElementById("particles");
    if (particlesContainer) {
      // Clear existing particles first
      particlesContainer.innerHTML = "";

      for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div");
        particle.className = "absolute rounded-full bg-blue-500/10";

        // Random size
        const size = Math.random() * 20 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        particlesContainer.appendChild(particle);

        // Animate each particle
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

  const addToRefs = (el) => {
    if (el && !formElementsRef.current.includes(el)) {
      formElementsRef.current.push(el);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log("Signup submitted", { name, email, password });
  };

  const passwordMatch = password === confirmPassword || confirmPassword === "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1A2233] to-[#252B39] select-none">
      {/* Animated background gradient */}
      <div
        className="bg-gradient absolute inset-0 opacity-20"
        style={{
          backgroundSize: "100% 100%",
          backgroundImage:
            "radial-gradient(circle at top left, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
        }}
      ></div>

      {/* Animated particles */}
      <div
        id="particles"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      ></div>

      {/* Signup card */}
      <div className="bg-[#161E29] rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-8 border border-gray-800 relative overflow-hidden z-10">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-700"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-xl decorative-blob"></div>
        <div className="absolute -bottom-32 -left-20 w-64 h-64 bg-blue-600/5 rounded-full blur-xl decorative-blob"></div>

        {/* Logo and title */}
        <div className="flex flex-col items-center mb-8">
          <div
            ref={logoRef}
            className="bg-gradient-to-br from-blue-500 to-blue-700 p-3 rounded-xl shadow-lg mb-4"
          >
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 ref={titleRef} className="text-2xl font-bold text-white">
            Create your account
          </h1>
          <p ref={subtitleRef} className="text-gray-400 text-center mt-2">
            Join the Disaster Management platform
          </p>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2" ref={addToRefs}>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value.slice(0, 30))}
                required
                className="bg-[#1E2736] text-white w-full pl-10 pr-3 py-3 rounded-xl border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-300"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="space-y-2" ref={addToRefs}>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              Role
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="name"
                type="text"
                value={newname}
                onChange={(e) =>
                  setNewName(e.target.value.trim().toLowerCase().slice(0, 5))
                }
                required
                className="bg-[#1E2736] text-white w-full pl-10 pr-3 py-3 rounded-xl border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-300"
                placeholder="User OR Admin"
              />
            </div>
          </div>

          <div className="space-y-2" ref={addToRefs}>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value.trim().toLowerCase().slice(0, 30))
                }
                required
                className="bg-[#1E2736] text-white w-full pl-10 pr-3 py-3 rounded-xl border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-300"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div className="space-y-2" ref={addToRefs}>
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
            <p className="text-xs text-gray-400">
              Password must be at least 8 characters
            </p>
          </div>

          <div className="space-y-2" ref={addToRefs}>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-300"
            >
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={`bg-[#1E2736] text-white w-full pl-10 pr-12 py-3 rounded-xl border transition duration-300 ${
                  confirmPassword && !passwordMatch
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-700 focus:border-blue-500 focus:ring-blue-500"
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-300 transition duration-200" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500 hover:text-gray-300 transition duration-200" />
                )}
              </button>
            </div>
            {confirmPassword && !passwordMatch && (
              <p className="text-xs text-red-500">Passwords do not match</p>
            )}
          </div>

          <div className="pt-2" ref={addToRefs}>
            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                required
                className="h-4 w-4 rounded border-gray-700 bg-[#1E2736] text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-400"
              >
                I agree to the{" "}
                <Link to="/terms" className="text-blue-400 hover:text-blue-300">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="group w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-xl font-medium transition duration-300 flex items-center justify-center mt-6"
            ref={addToRefs}
          >
            <UserPlus className="mr-2 h-5 w-5" />
            Create Account
            <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
          </button>
        </form>

        {/* Sign in link */}
        <div className="mt-6 text-center text-gray-400" ref={addToRefs}>
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300 transition duration-300"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
