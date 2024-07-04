import { useMemo } from "react";
import LessonsMenu from "../ui/LessonsMenu";
import LessonGraduationData from "../../data/LessonGraduationData";

function LessonFourGraduation() {
  const menuData = useMemo(() => LessonGraduationData(), []);

  return <LessonsMenu menuData={menuData} lessonIndex={4} />;
}

export default LessonFourGraduation;
