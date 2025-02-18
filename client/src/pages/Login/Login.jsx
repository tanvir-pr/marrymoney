import { useContext, useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  console.log("state in the location login page", location.state);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          title: "User Login Successful.",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        navigate(from, { replace: true });
      })
      .catch((error) => console.error("Error logging in:", error));
  };

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Marry | Login</title>
      </Helmet>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-cyan-300 to-cyan-200">
        <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg p-10 w-full max-w-4xl">
          {/* Left Section */}
          <div className="w-full md:w-1/2 mb-6 md:mb-0 text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-800">Welcome Back!</h1>
            <p className="text-gray-600 mt-4">
              Login and continue your journey with us.
            </p>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2 bg-gray-50 p-6 rounded-lg">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-gray-700 text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-gray-700 text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="text-right mt-2">
                  <a
                    href="#"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* Captcha */}
              <div>
                <label className="block text-gray-700 text-sm font-medium">
                  Captcha
                </label>
                <LoadCanvasTemplate />
                <input
                  type="text"
                  name="captcha"
                  placeholder="Enter the captcha"
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onBlur={handleValidateCaptcha}
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className={`w-full p-3 text-white font-medium rounded-lg ${
                    disabled
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } transition-all duration-300`}
                  disabled={disabled}
                >
                  Login
                </button>
              </div>
            </form>

            {/* Social Login */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Or sign in using social platforms:
              </p>
              <SocialLogin />
            </div>

            {/* Redirect to Signup */}
            <p className="mt-4 text-center text-sm text-gray-600">
              New here?{" "}
              <Link
                to="/signup"
                className="text-blue-60 font-medium hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
