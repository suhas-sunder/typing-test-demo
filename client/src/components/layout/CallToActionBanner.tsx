import { Link } from "react-router-dom";
import { useLayoutEffect, useMemo } from "react";
import loadable from "@loadable/component";
import CallToActionData from "../../data/CallToActionData";

const Icon = loadable(() => import("../../utils/other/Icon"));
//Used by LandingPage.tsx
export default function CallToActionBanner() {
  const callToActionData = useMemo(() => CallToActionData(), []);

  useLayoutEffect(() => {
    Icon.load();
  }, []);

  return (
    <>
      <div className="flex w-full max-w-[1200px] flex-col items-center justify-around gap-12 px-5 capitalize leading-6 tracking-widest text-white md:flex-row">
        {callToActionData.map((data) => (
          <div
            key={data.id}
            className="flex min-h-[8em] max-w-[9em] flex-col gap-7 text-center"
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute -top-5 right-[35%] h-10 w-10 rotate-45 rounded-md bg-slate-950 opacity-20"></div>
              <Icon
                icon={data.icon}
                title={data.iconTitle}
                customStyle="scale-[1.65] flex"
              />
            </div>
            <h2>{data.sectionTitle}</h2>
          </div>
        ))}
      </div>
      <Link
        to="/register"
        className={`relative mx-auto inline-flex rounded-full border-[2.5px] border-sky-700 bg-sky-700 px-8 py-3  font-nunito text-xl font-normal tracking-wide text-white hover:scale-[1.02] hover:brightness-105`}
      >
        Sign Up Free!
      </Link>
    </>
  );
}
