import loadable from "@loadable/component";
import { useLayoutEffect } from "react";

const Icon = loadable(() => import("../../utils/other/Icon"));

//Display hearts for games
//Used by SpeedCalculatorGame.tsx
function Hearts({ lives }) {
  //Preload/load all components on component mount
  useLayoutEffect(() => {
    Icon.load();
  }, []);

  return (
    <div className="absolute -top-12 right-8 flex w-full max-w-[9.1em] scale-125 justify-end">
      {lives.map((heart, index) => (
        <div key={`heart-${index}`}>
          <Icon
            title="heart-icon"
            customStyle={`${
              heart === "full" ? "text-red-500" : "text-slate-700"
            }`}
            icon={heart === "full" ? "heart" : "brokenHeart"}
          />
        </div>
      ))}
    </div>
  );
}

export default Hearts;
