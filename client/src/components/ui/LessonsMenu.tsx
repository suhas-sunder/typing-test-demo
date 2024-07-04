import useLoadAnimation from "../hooks/useLoadAnimation";
import PerformanceStars from "./PerformanceStars";
import { Link } from "react-router-dom";

import { Fragment, useState } from "react";
import { LessonDataType } from "../../data/LessonBeginnerData";

interface PropType {
  title?: string;
  sectionTitle?: string;
  performanceScore: number[][];
  sectionIndex?: number;
  lessonVisibility?: boolean[];
}

type LevelProps = {
  lessonIndex: number;
  sectionIndex: number;
  performanceScore: number[];
  lesson: {
    sectionId: string;
    sectionData: { levelTitle: string; id: string }[];
  };
};

type LessonMenuProps = {
  lessonIndex: number;
  menuData: LessonDataType;
};

//Displays section title(s) for a set of levels
function SectionTitle({
  sectionTitle,
  sectionIndex = 0,
  performanceScore,
}: PropType) {
  const handleperformanceScore = () => {
    return `(${performanceScore[sectionIndex].filter(Boolean).length}/${
      performanceScore[sectionIndex].length
    })`;
  };

  return (
    <div className="sm:justify-left flex -translate-x-2 items-center justify-center gap-3 text-slate-950 sm:translate-x-0">
      <h3 className="flex items-center justify-center gap-2 text-center font-lato text-base sm:pl-3 sm:text-left sm:text-xl">
        <span className="text-base">{`${handleperformanceScore()}`} </span>
        <span>{sectionTitle}</span>
      </h3>
    </div>
  );
}

//Each link redirects to a specific lesson page
function LevelLinks({
  lesson,
  sectionIndex,
  lessonIndex,
  performanceScore,
}: LevelProps) {
  return (
    <ul className="mx-5 mb-4 grid w-full gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
      {lesson?.sectionData?.map((section, levelIndex) => (
        <li key={lesson.sectionId + "-" + section.id}>
          <Link
            to={`/lessons/lesson/${lessonIndex}/sec-${sectionIndex + 1}/lvl-${
              levelIndex + 1
            }`}
            className="relative flex cursor-pointer flex-col items-center justify-center gap-1 rounded-md border-2 bg-slate-200 p-4 text-center  font-nunito text-base text-slate-950 hover:border-sky-400 hover:bg-white hover:text-sky-600"
          >
            <PerformanceStars performanceScore={performanceScore[levelIndex]} />
            <span>Level: {levelIndex + 1}</span>
            <span className="text-xs">{section.levelTitle}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

//Main title for lesson menu
function LessonTitle({ title, performanceScore }: PropType) {
  return (
    <h2 className={`flex items-center gap-2 text-2xl text-defaultblue`}>
      <span className="text-base">
        {`(${
          performanceScore.filter((section) => section.every(Boolean)).length
        }/${performanceScore.length})`}{" "}
      </span>
      <span>{title} </span>
    </h2>
  );
}

//Displays all lessons depending on lesson selected in menu sidebar
export default function LessonsMenu({
  menuData,
  lessonIndex,
}: LessonMenuProps) {
  //First array is for lesson, second array is sublesson, third array are the tests for each section to track completion status of all tests
  const [performanceScore] = useState<number[][]>(
    menuData.lessonData.map((section) =>
      new Array(section.sectionData.length).fill(0),
    ),
  );

  const { fadeAnim } = useLoadAnimation();

  return (
    <div className="flex min-h-[65em] w-full  overflow-hidden rounded-2xl rounded-tl-none rounded-tr-none bg-white md:rounded-tr-xl">
      <div
        key={menuData.id}
        className={`${fadeAnim} flex w-full flex-col items-center gap-8  bg-white px-10 pb-20 pt-8 font-lora text-3xl text-defaultblue opacity-0`}
      >
        <LessonTitle
          performanceScore={performanceScore}
          title={menuData.title}
        />

        {menuData.lessonData.map((lesson, sectionIndex) => (
          <Fragment key={lesson.sectionId}>
            <SectionTitle
              performanceScore={performanceScore}
              sectionTitle={lesson.sectionTitle}
              sectionIndex={sectionIndex}
              title={menuData.title}
            />
            <LevelLinks
              performanceScore={performanceScore[sectionIndex]}
              lesson={lesson}
              lessonIndex={lessonIndex}
              sectionIndex={sectionIndex}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
