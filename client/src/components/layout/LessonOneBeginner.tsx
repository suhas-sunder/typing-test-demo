import { useMemo } from "react";
import LessonsMenu from "../ui/LessonsMenu";
import LessonBeginnerData from "../../data/LessonBeginnerData";

function LessonOneBeginner() {
  const menuData = useMemo(() => LessonBeginnerData(), []);

  return <LessonsMenu menuData={menuData} lessonIndex={1} />;
}

export default LessonOneBeginner;
