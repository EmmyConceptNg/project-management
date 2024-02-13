export default function Signup() {
  return (
    <div className="justify-end py-4 pr-4 pl-20 bg-white max-md:pl-5">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
        <div className="flex flex-col w-[42%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col self-stretch my-auto max-md:mt-10 max-md:max-w-full">
            <div className="text-2xl font-semibold text-zinc-900 max-md:max-w-full">
              Sign Up
            </div>
            <div className="mt-5 text-base text-zinc-900 max-md:max-w-full">
              Create your account to start managing your projects today!
            </div>
            <div className="mt-9 text-base font-medium text-zinc-900 max-md:max-w-full">
              Email
            </div>
            <input className="flex flex-col justify-center items-end py-2.5 pr-4 pl-16 mt-3.5 bg-white rounded-xl border border-solid border-zinc-300 max-md:pl-5 max-md:max-w-full" />
            <div className="mt-6 text-base font-medium text-zinc-900 max-md:max-w-full">
              Password
            </div>
            {/* <div className="flex flex-col justify-center items-end py-2.5 pr-4 pl-16 mt-3.5 bg-white rounded-xl border border-solid border-zinc-300 max-md:pl-5 max-md:max-w-full">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ca9f57a3f61fe62be96441e73e9e12dd7a7fa9f68ad3104efe147c86760340e9?"
                className="w-6 aspect-square"
              />
            </div> */}
            <input className="flex flex-col justify-center items-end py-2.5 pr-4 pl-16 mt-3.5 bg-white rounded-xl border border-solid border-zinc-300 max-md:pl-5 max-md:max-w-full" />
            <div className="flex gap-4 justify-between mt-4 text-sm text-black max-md:flex-wrap max-md:max-w-full">
              <input
                type="checkbox"
                className="w-6 h-6 bg-white rounded-sm border border-solid border-zinc-300"
              />
              <div className="flex-auto max-md:max-w-full">
                I agree to terms of service and privacy policy
              </div>
            </div>
            <button className="justify-center items-center px-16 py-4 mt-10 text-base font-medium text-white whitespace-nowrap bg-blue-600 rounded-xl border border-solid border-zinc-300 max-md:px-5 max-md:max-w-full">
              Continue with email
            </button>
            <div className="flex gap-5 items-center self-center mt-11 text-base font-medium whitespace-nowrap text-neutral-400 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
              {/* <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7710ce995ebb0c6ce3ff6e08981412dea17d68fd55ad18a7c80d26c4fe3228ad?"
                className="self-stretch my-auto max-w-full stroke-[1px] stroke-zinc-300 w-[210px]"
              /> */}
              <div className="self-stretch">OR</div>
              {/* <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7710ce995ebb0c6ce3ff6e08981412dea17d68fd55ad18a7c80d26c4fe3228ad?"
                className="self-stretch my-auto max-w-full stroke-[1px] stroke-zinc-300 w-[210px]"
              /> */}
            </div>
            <div className="flex justify-center items-center px-16 py-3 mt-11 text-base font-medium whitespace-nowrap bg-white rounded-xl border border-solid border-zinc-300 text-zinc-900 max-md:px-5 max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-1.5">
                <img
                  loading="lazy"
                  srcSet="..."
                  className="aspect-square w-[22px]"
                />
                <div className="grow">Continue with google</div>
              </div>
            </div>
            <div className="flex justify-center items-center px-16 py-3 mt-4 text-base font-medium whitespace-nowrap bg-white rounded-xl border border-solid border-zinc-300 text-zinc-900 max-md:px-5 max-md:max-w-full">
              <div className="flex gap-1.5">
                <img
                  loading="lazy"
                  srcSet="..."
                  className="aspect-square w-[22px]"
                />
                <div className="grow">Continue with apple</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[58%] max-md:ml-0 max-md:w-full">
          <img
            loading="lazy"
            srcSet="..."
            className="grow w-full aspect-[0.71] max-md:mt-10 max-md:max-w-full"
          />
        </div>
      </div>
    </div>
  );
}
