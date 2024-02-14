export default function ProfileSetup() {
  return (
    <div className="flex flex-col items-center py-12 bg-white">
      <div className="mt-4 text-3xl font-semibold whitespace-nowrap text-neutral-800">
        Profile Setup
      </div>
      <div className="mt-3.5 text-sm text-center text-neutral-800">
        Now manage your projects in fast and efficient way!
      </div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc0d1b1abd062f9deaecbfd72c19c956afa9ee8f500ceb12c0c40112fdf8f414?"
        className="mt-12 max-w-full aspect-square w-[114px] max-md:mt-10"
      />
      <div className="mt-14 text-base font-medium whitespace-nowrap text-neutral-800 max-md:mt-10">
        Full Name
      </div>
      <input className="mt-3.5 max-w-full h-11 rounded-lg border border-solid border-zinc-300 w-[520px]" />
      <div className="mt-6 text-base font-medium whitespace-nowrap text-neutral-800">
        Your Role
      </div>
      <div className="flex flex-col justify-center items-end py-2.5 pr-5 pl-16 mt-3.5 max-w-full rounded-lg border border-solid border-zinc-300 w-[520px] max-md:pl-5">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a4ac3faf8b89531f5fb8b8db063a7ad6201ace175961cb40546796a464092c10?"
          className="w-6 aspect-square"
        />
      </div>
      <div className="mt-6 text-base font-medium whitespace-nowrap text-neutral-800">
        Your Industry
      </div>
      <div className="flex flex-col justify-center items-end py-2.5 pr-5 pl-16 mt-2 max-w-full rounded-lg border border-solid border-zinc-300 w-[520px] max-md:pl-5">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a4ac3faf8b89531f5fb8b8db063a7ad6201ace175961cb40546796a464092c10?"
          className="w-6 aspect-square"
        />
      </div>
      <div className="mt-6 text-base font-medium whitespace-nowrap text-neutral-800">
        Number of people you intend to add in your project
      </div>
      <div className="flex flex-col justify-center items-end py-2.5 pr-5 pl-16 mt-2.5 max-w-full rounded-lg border border-solid border-zinc-300 w-[520px] max-md:pl-5">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7f5ab6bedd7161cc5331f2c07248ffd4532460567249711ce6b91959057f9df3?"
          className="w-6 aspect-square"
        />
      </div>
      <div className="mt-6 text-base font-medium whitespace-nowrap text-neutral-800">
        How many projects you intend to manage?
      </div>
      <div className="flex flex-col justify-center items-end py-2.5 pr-5 pl-16 mt-2.5 max-w-full rounded-lg border border-solid border-zinc-300 w-[520px] max-md:pl-5">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7f5ab6bedd7161cc5331f2c07248ffd4532460567249711ce6b91959057f9df3?"
          className="w-6 aspect-square"
        />
      </div>
      <button className="justify-center items-center px-16 py-4 mt-10 max-w-full text-base font-medium text-white whitespace-nowrap bg-blue-600 rounded-xl border border-solid border-zinc-300 w-[520px] max-md:px-5">
        Done
      </button>
    </div>
  );
}
