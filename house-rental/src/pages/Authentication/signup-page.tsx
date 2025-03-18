export default function SignUpPage() {
  return (
    <div className="scrollbar-hidden  min-h-screen w-screen flex items-center justify-center bg-white px-6 overflow-x-hidden mx-auto">
      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl mx-auto h-[70%]">
        <div className="grid lg:grid-cols-2">
          {/* Image Section */}
          <div className="hidden lg:block relative">
            <img
              src="/register.jpeg" // Replace with your image path
              alt="Sign Up Illustration"
              className="w-full h-full object-cover"
            />
            {/* <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-70"></div> */}
            <div className="absolute inset-0 flex items-end p-8">
              <h2 className="text-primary text-3xl font-bold">
                Join Us Today!
              </h2>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8 lg:p-12">
            {/* Title and Description */}
            <p className="text-md md:text-xl font-bold text-gray-800 mb-2">
              Create Your Account
            </p>
            <p className="text-gray-600 text-sm mb-6">
              Start your journey with us by filling out the form below.
            </p>

            {/* Form Fields */}
            <form className="space-y-5 text-secondary">
              {/* Name Fields */}
              <div className="grid md:grid-cols-2 gap-5">
                <div className="flex flex-col">
                  <label
                    htmlFor="firstName"
                    className="text-secondary text-sm font-medium mb-1"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="John"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="lastName"
                    className="text-secondary text-sm font-medium mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-secondary text-sm font-medium mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="example@mail.com"
                />
              </div>

              {/* Password Fields */}
              <div className="grid md:grid-cols-2 gap-5">
                <div className="flex flex-col">
                  <label
                    htmlFor="password"
                    className="text-secondary text-sm font-medium mb-1"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="confirmPassword"
                    className="text-secondary text-sm font-medium mb-1"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-6">
                <div className="cursor-pointer w-max bg-primary text-white py-2 px-6 rounded-md  transition-all transform focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                  Sign Up
                </div>
              </div>

              {/* Additional Links */}
              <div className="text-center mt-4">
                <p className="text-gray-600 text-sm">
                  Already have an account?{" "}
                  <a href="/login" className="text-primary hover:underline">
                    Log In
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
