import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="justify-end py-4 pr-4 pl-20 bg-white max-md:pl-5">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
        <div className="flex flex-col w-[42%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col self-stretch my-auto max-md:mt-10 max-md:max-w-full">
            <div className="text-2xl font-semibold text-zinc-900 max-md:max-w-full">
              Login
            </div>
            <div className="mt-5 text-base text-zinc-900 max-md:max-w-full">
              Enter your credentials to get started
            </div>
            <div className="mt-9 text-base font-medium text-zinc-900 max-md:max-w-full">
              Email
            </div>
            <input className="flex flex-col justify-center items-end py-2.5 pr-4 pl-16 mt-3.5 bg-white rounded-xl border border-solid border-zinc-300 max-md:pl-5 max-md:max-w-full" />
            <div className="mt-6 text-base font-medium text-zinc-900 max-md:max-w-full">
              Password
            </div>
            <input
              type="password"
              className="flex flex-col justify-center items-end py-2.5 pr-4 pl-16 mt-3.5 bg-white rounded-xl border border-solid border-zinc-300 max-md:pl-5 max-md:max-w-full"
            />
            {/* <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2efea8d3ad49ce96ec14d60650421964d7c7bc79f47462a90e3e8dde4e0fab17?apiKey=e20c1380c3024da1bb502cf228422d26&"
              className="w-6 aspect-square"
            /> */}
            <Link
              to="/recovery"
              className="self-start mt-3.5 text-base font-medium text-blue-600 whitespace-nowrap"
            >
              Forgot Password?
            </Link>
            <Link
              to="/workspace"
              className="justify-center items-center px-16 py-3.5 mt-8 text-base font-medium text-white whitespace-nowrap bg-blue-600 rounded-xl border border-solid border-zinc-300 max-md:px-5 max-md:max-w-full"
            >
              Login
            </Link>
            <div className="flex gap-5 items-center self-center mt-11 text-base font-medium whitespace-nowrap text-neutral-400 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
              {/* <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7710ce995ebb0c6ce3ff6e08981412dea17d68fd55ad18a7c80d26c4fe3228ad?apiKey=e20c1380c3024da1bb502cf228422d26&"
                className="self-stretch my-auto max-w-full stroke-[1px] stroke-zinc-300 w-[210px]"
              /> */}
              <div className="self-stretch">OR</div>
              {/* <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7710ce995ebb0c6ce3ff6e08981412dea17d68fd55ad18a7c80d26c4fe3228ad?apiKey=e20c1380c3024da1bb502cf228422d26&"
                className="self-stretch my-auto max-w-full stroke-[1px] stroke-zinc-300 w-[210px]"
              /> */}
            </div>
            <button className="flex justify-center items-center px-16 py-3 mt-11 text-base font-medium whitespace-nowrap bg-white rounded-xl border border-solid border-zinc-300 text-zinc-900 max-md:px-5 max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-1.5">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/bb0808eec4077776ddd4045297f846d03950bf0f50b2d1748cb0c41d5c8eb63b?apiKey=e20c1380c3024da1bb502cf228422d26&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/bb0808eec4077776ddd4045297f846d03950bf0f50b2d1748cb0c41d5c8eb63b?apiKey=e20c1380c3024da1bb502cf228422d26&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bb0808eec4077776ddd4045297f846d03950bf0f50b2d1748cb0c41d5c8eb63b?apiKey=e20c1380c3024da1bb502cf228422d26&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/bb0808eec4077776ddd4045297f846d03950bf0f50b2d1748cb0c41d5c8eb63b?apiKey=e20c1380c3024da1bb502cf228422d26&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/bb0808eec4077776ddd4045297f846d03950bf0f50b2d1748cb0c41d5c8eb63b?apiKey=e20c1380c3024da1bb502cf228422d26&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bb0808eec4077776ddd4045297f846d03950bf0f50b2d1748cb0c41d5c8eb63b?apiKey=e20c1380c3024da1bb502cf228422d26&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/bb0808eec4077776ddd4045297f846d03950bf0f50b2d1748cb0c41d5c8eb63b?apiKey=e20c1380c3024da1bb502cf228422d26&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/bb0808eec4077776ddd4045297f846d03950bf0f50b2d1748cb0c41d5c8eb63b?apiKey=e20c1380c3024da1bb502cf228422d26&"
                  className="aspect-square w-[22px]"
                />
                <div className="grow">Continue with google</div>
              </div>
            </button>
            <button className="flex justify-center items-center px-16 py-3 mt-4 text-base font-medium whitespace-nowrap bg-white rounded-xl border border-solid border-zinc-300 text-zinc-900 max-md:px-5 max-md:max-w-full">
              <div className="flex gap-1.5">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/51c57f882c0782062292315afe903d1230c33f7db5b4de4668c79ca1db13e353?apiKey=e20c1380c3024da1bb502cf228422d26&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/51c57f882c0782062292315afe903d1230c33f7db5b4de4668c79ca1db13e353?apiKey=e20c1380c3024da1bb502cf228422d26&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/51c57f882c0782062292315afe903d1230c33f7db5b4de4668c79ca1db13e353?apiKey=e20c1380c3024da1bb502cf228422d26&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/51c57f882c0782062292315afe903d1230c33f7db5b4de4668c79ca1db13e353?apiKey=e20c1380c3024da1bb502cf228422d26&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/51c57f882c0782062292315afe903d1230c33f7db5b4de4668c79ca1db13e353?apiKey=e20c1380c3024da1bb502cf228422d26&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/51c57f882c0782062292315afe903d1230c33f7db5b4de4668c79ca1db13e353?apiKey=e20c1380c3024da1bb502cf228422d26&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/51c57f882c0782062292315afe903d1230c33f7db5b4de4668c79ca1db13e353?apiKey=e20c1380c3024da1bb502cf228422d26&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/51c57f882c0782062292315afe903d1230c33f7db5b4de4668c79ca1db13e353?apiKey=e20c1380c3024da1bb502cf228422d26&"
                  className="aspect-square w-[22px]"
                />
                <div className="grow">Continue with apple</div>
              </div>
            </button>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[58%] max-md:ml-0 max-md:w-full">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/260fff4c5b61a8076cefddf6c7cc8a2cfe6d4456e164349cfddd0af3bb1c2ec6?apiKey=e20c1380c3024da1bb502cf228422d26&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/260fff4c5b61a8076cefddf6c7cc8a2cfe6d4456e164349cfddd0af3bb1c2ec6?apiKey=e20c1380c3024da1bb502cf228422d26&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/260fff4c5b61a8076cefddf6c7cc8a2cfe6d4456e164349cfddd0af3bb1c2ec6?apiKey=e20c1380c3024da1bb502cf228422d26&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/260fff4c5b61a8076cefddf6c7cc8a2cfe6d4456e164349cfddd0af3bb1c2ec6?apiKey=e20c1380c3024da1bb502cf228422d26&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/260fff4c5b61a8076cefddf6c7cc8a2cfe6d4456e164349cfddd0af3bb1c2ec6?apiKey=e20c1380c3024da1bb502cf228422d26&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/260fff4c5b61a8076cefddf6c7cc8a2cfe6d4456e164349cfddd0af3bb1c2ec6?apiKey=e20c1380c3024da1bb502cf228422d26&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/260fff4c5b61a8076cefddf6c7cc8a2cfe6d4456e164349cfddd0af3bb1c2ec6?apiKey=e20c1380c3024da1bb502cf228422d26&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/260fff4c5b61a8076cefddf6c7cc8a2cfe6d4456e164349cfddd0af3bb1c2ec6?apiKey=e20c1380c3024da1bb502cf228422d26&"
            className="grow w-full aspect-[0.71] max-md:mt-10 max-md:max-w-full"
          />
        </div>
      </div>
    </div>
  );
}
