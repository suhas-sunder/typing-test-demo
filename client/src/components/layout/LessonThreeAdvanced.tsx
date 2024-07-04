import { useMemo } from "react";
import LessonsMenu from "../ui/LessonsMenu";
import LessonAdvancedData from "../../data/LessonAdvancedData";

function LessonThreeAdvanced() {
  const menuData = useMemo(() => LessonAdvancedData(), []);

  return <LessonsMenu menuData={menuData} lessonIndex={3} />;
}

export default LessonThreeAdvanced;
