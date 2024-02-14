import AuthImage from "../assets/rect.png";
export default function EmailConf() {
  return (
    <div className="py-4 pr-4 pl-20 bg-white max-md:pl-5">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
        <div className="flex flex-col w-[42%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col self-stretch my-auto text-base font-medium text-zinc-900 max-md:mt-10 max-md:max-w-full">
            <div className="text-2xl font-semibold max-md:max-w-full">
              Email Confirmation
            </div>
            <div className="mt-6 max-md:max-w-full">
              Enter the code we sent on your email “johndoe@gmail.com”
            </div>
            <div className="flex flex-col">
              <div className="mt-7 mb-0">
                <span>OTP Code</span>
                {/* <input className="shrink-0 mt-3.5 bg-white rounded-xl border border-solid border-zinc-300 h-[60px]" /> */}
              </div>
              <div className="flex gap-5 justify-between items-end mt-0 whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                <input className="mt-7 bg-white rounded-xl border border-solid border-zinc-300 h-[60px] w-[52px]" />
                <input className="mt-7 bg-white rounded-xl border border-solid border-zinc-300 h-[60px] w-[52px]" />
                <input className="mt-7 bg-white rounded-xl border border-solid border-zinc-300 h-[60px] w-[52px]" />
                <input className="mt-7 bg-white rounded-xl border border-solid border-zinc-300 h-[60px] w-[52px]" />
                <input className="mt-7 bg-white rounded-xl border border-solid border-zinc-300 h-[60px] w-[52px]" />
                <input className="mt-7 bg-white rounded-xl border border-solid border-zinc-300 h-[60px] w-[52px]" />
              </div>
            </div>
            <button
              onClick={() => console.log("Login")}
              className="justify-center items-center px-16 py-3.5 mt-8 text-base font-medium text-white whitespace-nowrap bg-blue-600 rounded-xl border border-solid border-zinc-300 max-md:px-5 max-md:max-w-full"
            >
              Confirm Code
            </button>
            <a
              onClick={() => alert("Clicked")}
              className="mt-10 text-blue-600 max-md:mt-10 max-md:max-w-full"
            >
              Resend Code
            </a>
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
