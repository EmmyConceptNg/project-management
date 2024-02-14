import { Link } from "react-router-dom";
import AuthImage from "../assets/rect.png";
export default function ForgotPass2() {
  return (
    <div className="justify-end py-4 pr-4 pl-20 bg-white max-md:pl-5">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
        <div className="flex flex-col w-[42%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col self-stretch my-auto max-md:mt-10 max-md:max-w-full">
            <div className="text-2xl font-semibold text-zinc-900 max-md:max-w-full">
              Forgot Password?
            </div>
            <div className="mt-5 text-base text-zinc-900 max-md:max-w-full">
              Create new password and recover your account
            </div>
            <div className="mt-9 text-base font-medium text-zinc-900 max-md:max-w-full">
              New Password
            </div>
            <input className="flex flex-col justify-center items-end py-2.5 pr-4 pl-16 mt-3.5 bg-white rounded-xl border border-solid border-zinc-300 max-md:pl-5 max-md:max-w-full" />
            <div className="mt-6 text-base font-medium text-zinc-900 max-md:max-w-full">
              Confirm New Password
            </div>
            {/* <div className="flex flex-col justify-center items-end py-2.5 pr-4 pl-16 mt-3.5 bg-white rounded-xl border border-solid border-zinc-300 max-md:pl-5 max-md:max-w-full">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ca9f57a3f61fe62be96441e73e9e12dd7a7fa9f68ad3104efe147c86760340e9?"
                className="w-6 aspect-square"
              />
            </div> */}
            <input className="flex flex-col justify-center items-end py-2.5 pr-4 pl-16 mt-3.5 bg-white rounded-xl border border-solid border-zinc-300 max-md:pl-5 max-md:max-w-full" />
            <Link
              to="/login"
              className="justify-center items-center px-16 py-4 mt-10 text-base font-medium text-white whitespace-nowrap bg-blue-600 rounded-xl border border-solid border-zinc-300 max-md:px-5 max-md:max-w-full"
            >
              Send Link
            </Link>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[58%] max-md:ml-0 max-md:w-full">
          <img
            loading="lazy"
            src={AuthImage}
            className="grow w-full aspect-[0.71] max-md:mt-10 max-md:max-w-full"
          />
        </div>
      </div>
    </div>
  );
}
