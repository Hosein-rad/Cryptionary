import { HeaderSVGs } from "./HeaderSVGs";

export default function AccountIcon() {
  return (
    <div className="my-auto mx-1 flex justify-center items-center size-11 rounded-full bg-cyan-200 hover:bg-cyan-300 duration-300">
      {HeaderSVGs.account}
    </div>
  );
}
