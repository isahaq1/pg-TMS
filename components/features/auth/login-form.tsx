export default function LoginPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT SIDE */}
      <div className="flex items-center justify-center bg-white">
        <div className="w-full max-w-md px-6">
          {/* Logo */}
          <div className="flex flex-col items-center gap-[10px] w-full h-fit justify-center mb-8">
            <img
              src="/paragon-group-logo.svg"
              alt="Paragon Group"
              className="
      w-[110.47px] h-[62.28px]
      sm:w-[130px] sm:h-auto
      md:w-[150px]
      lg:w-[180px]
    "
            />
          </div>

          {/* Card */}
          <div className="rounded-xl border border-gray-100 shadow-sm p-8 flex flex-col items-center gap-2 w-full">
            <h1 className="
    flex items-center gap-[10px]
    w-fit h-fit
    font-inter font-semibold
    text-2xl leading-8 tracking-normal
    text-gray-900
  ">
              Sign in
            </h1>
            <p className="
    flex items-center justify-center gap-[10px]
    w-full max-w-[303px] h-fit mx-auto
    font-inter font-normal
    text-sm leading-5 tracking-normal
    text-black/55
    text-center
    sm:text-sm
    md:text-base
  ">
              Welcome back. Enter your details to continue.
            </p>

            <div className="mt-6 space-y-5 w-full">
              {/* Email */}
              <div>
                <label className="
    flex items-center gap-[10px]
    w-[36px] h-[20px]
    font-sans font-medium
    text-sm leading-5 tracking-normal
    text-[#242529]
    opacity-100
  ">
                  Email
                </label>
                <div
  className="
    flex justify-between items-center
    w-full max-w-[338px] h-[36px]
    py-1 px-3
    bg-white
    rounded-md
    border border-[#E5E5E5]
    opacity-100
    mx-auto
  "
>
                <input
                  type="email"
                  defaultValue="m@paragon.com.bd"
                  className="
      w-full h-full
      border-none
      outline-none
      text-sm
      font-sans
      text-[#242529]
      placeholder:text-gray-400
      bg-transparent
    "
                />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    className="mt-1 w-full h-11 rounded-md border border-gray-300 px-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                    👁
                  </span>
                </div>
              </div>

              {/* Forgot */}
              <div className="text-right">
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              {/* Button */}
              <button
                onClick={handleSubmit}
                className="w-full h-12 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
              >
                Sign in
              </button>
            </div>

            {/* Footer */}
            <p className="mt-6 text-xs text-gray-500 text-center">
              By clicking sign in, you agree to our{" "}
              <a href="#" className="underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:flex items-center justify-center bg-[#EFF8FF]">
        <img
          src="/illustration.png"
          alt="Illustration"
          className="max-w-lg"
        />
      </div>
    </div>
  );
}