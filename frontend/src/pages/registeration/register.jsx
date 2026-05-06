// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./register.css"; 

// const Register = () => {
//   const [isFlipped, setIsFlipped] = useState(false);
//   const [user, setUser] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   useEffect(() => {
//     if (success || error) {
//       const timer = setTimeout(() => {
//         setSuccess("");
//         setError("");
//       }, 3000);

//       return () => clearTimeout(timer);
//     }
//   }, [success, error]);

//   // Validation function
//   const validateForm = () => {
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if (isFlipped && user.username.length < 4) {
//       setError("Username must be at least 4 characters long.");
//       return false;
//     }
//     if (!emailRegex.test(user.email)) {
//       setError("Invalid email format.");
//       return false;
//     }
//     if (user.password.length < 8) {
//       setError("Password must be at least 8 characters long.");
//       return false;
//     }
//     setError("");
//     return true;
//   };

//   const handleSubmit = async (e, type) => {
//     e.preventDefault();
//     if (!validateForm()) return;
  
//     try {
//       const apiUrl = `https://liverbackend.vercel.app/api/auth/${type}`;
//       const response = await axios.post(apiUrl, user); 
  
//       if (type === "login") {
//         const currentUser = {
//           id: response.data.currentUser.id,
//           name: response.data.currentUser.username,  
//           isSeller: response.data.currentUser.isSeller,
//           isVerified:response.data.currentUser.isVerified,
//           token : response.data.token
//         };
//         localStorage.setItem("currentUser", JSON.stringify(currentUser));
//         window.location.href = "/";
//       } else {
//         setIsFlipped(false); 
//       }
  
//       setUser({
//         username: "",
//         email: "",
//         password: "",
//       });
  
//       setSuccess(type === "login" ? "Login successful!" : "Signup successful! Please login.");
//       setError("");
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong.");
//     }
//   };
  

//   return (
//     <div className="flex items-center justify-center min-h-screen w-full bg-gray-100 py-12 px-4">
//       <div className={`flip-container ${isFlipped ? "flipped" : ""}`}>
//         <div className="flipper">
//           {/* Login Container */}
//           <div className="login-container">
//             {/* Left Section */}
//             <div className="left-section">
//               <div className="z-10 relative">
//                 <h2 className="text-2xl font-bold mb-6">Success starts here</h2>
//                 <ul className="mt-3 space-y-2">
//                   <li className="flex items-center">
//                     <span className="text-green-400 mr-2">✔</span> Find top freelancers worldwide
//                   </li>
//                   <li className="flex items-center">
//                     <span className="text-green-400 mr-2">✔</span> Get quality work done fast
//                   </li>
//                   <li className="flex items-center">
//                     <span className="text-green-400 mr-2">✔</span> Secure payments & easy collaboration
//                   </li>
//                   <li className="flex items-center">
//                     <span className="text-green-400 mr-2">✔</span> Scale your business effortlessly
//                   </li>
//                 </ul>
//               </div>
//             </div>
            
//             {/* Right Section */}
//             <div className="right-section">
//               <h3 className="text-xl font-medium mb-3">Sign in to your account</h3>
//               <p className="mb-4 text-gray-600">
//                 Don't have an account?{" "}
//                 <a 
//                   href="#" 
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setIsFlipped(true);
//                   }}
//                   className="text-blue-600 hover:underline"
//                 >
//                   Join here
//                 </a>
//               </p>
//               {error && <p className="text-red-500 mb-4">{error}</p>}
//               {success && <p className="text-green-500 mb-4">{success}</p>}
              
//               <form onSubmit={(e) => handleSubmit(e, "login")}>
//                 <div className="mb-4">
//                   <input
//                     type="email"
//                     name="email"
//                     className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Email"
//                     value={user.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <input
//                     type="password"
//                     name="password"
//                     className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Password"
//                     value={user.password}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
//                   Login
//                 </button>
//               </form>
              
//               <p className="mt-6 text-gray-500 text-center text-sm">
//                 By joining, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and{" "}
//                 <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
//               </p>
//             </div>
//           </div>

//           {/* Signup Container */}
//           <div className="signup-container">
//             {/* Right Section (Banner) */}
//             <div className="signup-right-section">
//               <div className="z-10 relative">
//                 <h2 className="text-2xl font-bold mb-6">Join the best freelancing platform</h2>
//                 <ul className="mt-3 space-y-2">
//                   <li className="flex items-center">
//                     <span className="text-green-400 mr-2">✔</span> Work with trusted clients
//                   </li>
//                   <li className="flex items-center">
//                     <span className="text-green-400 mr-2">✔</span> Get paid securely & on time
//                   </li>
//                   <li className="flex items-center">
//                     <span className="text-green-400 mr-2">✔</span> Showcase your talent to the world
//                   </li>
//                   <li className="flex items-center">
//                     <span className="text-green-400 mr-2">✔</span> Join a community of professionals
//                   </li>
//                 </ul>
//               </div>
//             </div>
            
//             {/* Left Section (Form) */}
//             <div className="signup-left-section">
//               <h3 className="text-xl font-medium mb-3">Create your account</h3>
//               <p className="mb-4 text-gray-600">
//                 Already have an account?{" "}
//                 <a 
//                   href="#" 
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setIsFlipped(false);
//                   }}
//                   className="text-blue-600 hover:underline"
//                 >
//                   Sign in
//                 </a>
//               </p>
//               {error && <p className="text-red-500 mb-4">{error}</p>}
//               {success && <p className="text-green-500 mb-4">{success}</p>}
              
//               <form onSubmit={(e) => handleSubmit(e, "signup")}>
//                 <div className="mb-4">
//                   <input
//                     type="text"
//                     name="username"
//                     className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Username"
//                     value={user.username}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <input
//                     type="email"
//                     name="email"
//                     className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Email"
//                     value={user.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <input
//                     type="password"
//                     name="password"
//                     className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Password"
//                     value={user.password}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
//                   Sign Up
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Register;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./register.css"; 

const Register = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [passwordMode, setPasswordMode] = useState("login");
  const [resetToken, setResetToken] = useState("");
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success, error]);

  // Validation function
  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (isFlipped && user.username.length < 4) {
      setError("Username must be at least 4 characters long.");
      return false;
    }
    if (!emailRegex.test(user.email)) {
      setError("Invalid email format.");
      return false;
    }
    if (!strongPasswordRegex.test(user.password)) {
      setError("Password must be at least 8 characters and include a letter and number.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const apiUrl = `https://liverbackend.vercel.app/api/auth/${type}`;
      const response = await axios.post(apiUrl, user, { withCredentials: true }); 
  
      if (type === "login") {
        const currentUser = {
          id: response.data.currentUser.id,
          name: response.data.currentUser.username,  
          role: response.data.currentUser.role,
          isSeller: response.data.currentUser.isSeller,
          isVerified: response.data.currentUser.isVerified,
          token: response.data.token
        };
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        window.location.href = currentUser.role === "admin" ? "/admin/dashboard" : "/";
      } else {
        setIsFlipped(false); 
      }
  
      setUser({
        username: "",
        email: "",
        password: "",
      });
  
      setSuccess(type === "login" ? "Login successful!" : "Signup successful! Please login.");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!user.email) {
      setError("Email is required.");
      return;
    }

    try {
      const response = await axios.post("https://liverbackend.vercel.app/api/auth/forgot-password", {
        email: user.email,
      });
      setResetToken(response.data.resetToken || "");
      setPasswordMode("reset");
      setSuccess("Reset token generated. Use it to set a new password.");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to start password reset.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!resetToken || !strongPasswordRegex.test(user.password)) {
      setError("Enter the reset token and a password with at least 8 characters, including a letter and number.");
      return;
    }

    try {
      await axios.post("https://liverbackend.vercel.app/api/auth/reset-password", {
        token: resetToken,
        password: user.password,
      });
      setPasswordMode("login");
      setResetToken("");
      setUser({ username: "", email: "", password: "" });
      setSuccess("Password reset successful. Please login.");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to reset password.");
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100 py-12 px-4">
      <div className={`flip-container ${isFlipped ? "flipped" : ""}`}>
        <div className="flipper">
          {/* Login Container */}
          <div className="login-container">
            {/* Left Section */}
            <div className="left-section">
              <div className="z-10 relative">
                <h2 className="text-2xl font-bold mb-6">Success starts here</h2>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✔</span> Find top freelancers worldwide
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✔</span> Get quality work done fast
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✔</span> Secure payments & easy collaboration
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✔</span> Scale your business effortlessly
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Right Section */}
            <div className="right-section">
              <h3 className="text-xl font-medium mb-3">
                {passwordMode === "login" ? "Sign in to your account" : "Reset your password"}
              </h3>
              {passwordMode === "login" && (
                <p className="mb-4 text-gray-600">
                  Don't have an account?{" "}
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      setIsFlipped(true);
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Join here
                  </a>
                </p>
              )}
              {error && <p className="text-red-500 mb-4">{error}</p>}
              {success && <p className="text-green-500 mb-4">{success}</p>}
              
              {passwordMode === "login" && (
                <form onSubmit={(e) => handleSubmit(e, "login")}>
                  <div className="mb-4">
                    <input
                      type="email"
                      name="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Email"
                      value={user.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      name="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Password"
                      value={user.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => setPasswordMode("forgot")}
                    className="mt-3 text-sm text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </button>
                </form>
              )}

              {passwordMode === "forgot" && (
                <form onSubmit={handleForgotPassword}>
                  <div className="mb-4">
                    <input
                      type="email"
                      name="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Account email"
                      value={user.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                    Generate Reset Token
                  </button>
                </form>
              )}

              {passwordMode === "reset" && (
                <form onSubmit={handleResetPassword}>
                  <div className="mb-4">
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Reset token"
                      value={resetToken}
                      onChange={(e) => setResetToken(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      name="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="New password"
                      value={user.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                    Reset Password
                  </button>
                </form>
              )}

              {passwordMode !== "login" && (
                <button
                  type="button"
                  onClick={() => {
                    setPasswordMode("login");
                    setResetToken("");
                  }}
                  className="mt-3 text-sm text-blue-600 hover:underline"
                >
                  Back to login
                </button>
              )}
              
              <p className="mt-6 text-gray-500 text-center text-sm">
                By joining, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and{" "}
                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
              </p>
            </div>
          </div>

          {/* Signup Container */}
          <div className="signup-container">
            {/* Right Section (Banner) */}
            <div className="signup-right-section">
              <div className="z-10 relative">
                <h2 className="text-2xl font-bold mb-6">Join the best freelancing platform</h2>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✔</span> Work with trusted clients
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✔</span> Get paid securely & on time
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✔</span> Showcase your talent to the world
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✔</span> Join a community of professionals
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Left Section (Form) */}
            <div className="signup-left-section">
              <h3 className="text-xl font-medium mb-3">Create your account</h3>
              <p className="mb-4 text-gray-600">
                Already have an account?{" "}
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setIsFlipped(false);
                  }}
                  className="text-blue-600 hover:underline"
                >
                  Sign in
                </a>
              </p>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              {success && <p className="text-green-500 mb-4">{success}</p>}
              
              <form onSubmit={(e) => handleSubmit(e, "signup")}>
                <div className="mb-4">
                  <input
                    type="text"
                    name="username"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Username"
                    value={user.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    name="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Password"
                    value={user.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
