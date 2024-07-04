import { Fragment } from "react";
import Icon from "../../utils/other/Icon";
import { v4 as uuidv4 } from "uuid";

interface PropType {
  performanceScore: number;
}

//Displays performance score for each level in the form of stars
export default function PerformanceStars({ performanceScore = 0 }: PropType) {
  const starArr = new Array(5).fill("");
  const styleArr = [
    "scale-[0.8] translate-x-1 -translate-y-2",
    "scale-[1.15] z-[1] -translate-y-1",
    "scale-[1.3] z-[2]",
    "scale-[1.15] -translate-y-1",
    "scale-[0.8] -translate-x-1 -translate-y-2",
  ];

  return (
    <div className="absolute -bottom-[1.25rem] flex ">
      {starArr.map((_star, index) => (
        <Fragment key={uuidv4()}>
          <Icon
            icon={`${index + 1 <= performanceScore ? "starFull" : "starEmpty"}`}
            title="star-icon"
            customStyle={`${styleArr[index]} ${
              index + 1 <= performanceScore ? "text-sky-500" : "text-slate-400"
            } bg-white rounded-full`}
          />
        </Fragment>
      ))}
    </div>
  );
}
