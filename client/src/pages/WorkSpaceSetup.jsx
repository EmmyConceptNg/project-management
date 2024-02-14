import { Link } from "react-router-dom";

export default function WorkSpaceSetup() {
  return (
    <div className="flex flex-col items-center py-6 bg-white">
      <div className="mt-8 text-3xl font-semibold whitespace-nowrap text-neutral-800">
        Set Up Your Workspace
      </div>
      <div className="mt-3.5 text-sm text-center text-neutral-800">
        Enter the name of your workspace and manage all projects in it.
      </div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/60ce284d417f19e79e4bafdf9cd9cd944337a9428f044c1a93fb83defdb1e18a?"
        className="mt-12 max-w-full aspect-square w-[114px] max-md:mt-10"
      />
      <div className="mt-14 text-base font-medium whitespace-nowrap text-neutral-800 max-md:mt-10">
        Work Space Name
      </div>
      <input className="mt-2.5 max-w-full h-11 rounded-lg border border-solid border-zinc-300 w-[520px]" />
      <div className="mt-6 text-base font-medium text-neutral-800 max-md:max-w-full">
        How many projects you intend to manage in this workspace
      </div>
      <select className="flex flex-col justify-center items-end py-2.5 pr-5 pl-16 mt-2.5 max-w-full rounded-lg border border-solid border-zinc-300 w-[520px] max-md:pl-5">
        <option></option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
      </select>
      <Link
        to="/profile"
        className="justify-center items-center px-16 py-4 mt-10 max-w-full text-base font-medium text-white whitespace-nowrap bg-blue-600 rounded-xl w-[520px] max-md:px-5"
      >
        Next
      </Link>
    </div>
  );
}
