import { useLayoutEffect } from "react";
import useAuth from "../hooks/useAuth";
import loadable from "@loadable/component";
import useLoadAnimation from "../hooks/useLoadAnimation";

const BestStats = loadable(() => import("./BestStats"));

function ProfileStatsMenu() {
  return (
    <ul className="-top-[6.5em] grid w-full  max-w-[80%] grid-cols-2 items-center justify-between gap-x-4 gap-y-5 text-center md:absolute md:grid-cols-4">
      {/* <h1 className="text-3xl">All time best stats across the board!</h1> */}
      <li className="cursor-pointer rounded-tl-2xl rounded-tr-2xl bg-gray-300 py-3 hover:bg-white hover:text-defaultblue">
        Overall
      </li>
      <li className="cursor-pointer rounded-tl-2xl rounded-tr-2xl bg-white py-3  text-defaultblue hover:bg-white hover:text-defaultblue">
        Speed Test
      </li>
      <li className="cursor-pointer rounded-tl-2xl rounded-tr-2xl bg-gray-300 py-3 hover:bg-white hover:text-defaultblue">
        Lessons
      </li>
      <li className="cursor-pointer rounded-tl-2xl rounded-tr-2xl bg-gray-300 py-3  hover:bg-white hover:text-defaultblue">
        Games
      </li>
    </ul>
  );
}

//Used by Profile.tsx component
export default function ProfileStats() {
  const { userId } = useAuth();

  const { fadeAnim } = useLoadAnimation();

  useLayoutEffect(() => {
    BestStats.load();
  }, []);

  return (
    <div
      id="profile-img"
      className={`${fadeAnim} flex w-full -translate-y-6 flex-col items-center justify-center gap-10`}
    >
      <div className="flex w-full flex-col  items-center justify-center gap-12 text-center">
        <ProfileStatsMenu />
        <h1 className="text-3xl">All time best stats for Speed Test!</h1>
      </div>

      <div className="flex min-h-[68em] w-full flex-col items-center justify-center gap-5">
        {/* <div>Print option for printing page or saving as pdf</div> */}
        <BestStats userId={userId} testName="speed-test" />
        {/* <div>Display certificate here & provide options for download</div> */}
        <h2 className="font-lora text-xl tracking-widest text-defaultblue underline underline-offset-8 sm:no-underline">
          Certificate
        </h2>
        <p>Coming soon...</p>
      </div>
    </div>
  );
}
