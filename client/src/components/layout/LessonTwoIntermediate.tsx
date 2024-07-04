import { useMemo } from "react";
import LessonsMenu from "../ui/LessonsMenu";
import LessonIntermediateData from "../../data/LessonIntermediateData";

function LessonTwoIntermediate() {
  const menuData = useMemo(() => LessonIntermediateData(), []);

  return <LessonsMenu menuData={menuData} lessonIndex={2} />;
}

export default LessonTwoIntermediate;
