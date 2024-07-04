import type { LessonDataType } from "./LessonBeginnerData";

export default function LessonGraduationData() {
  const data: LessonDataType = {
    id: "graduation-id",
    title: "Graduation",
    lessonData: [
      {
        sectionTitle: "You Made It",
        sectionId: "you-made-it-id",
        sectionData: [
          {
            id: "congratulations",
            levelTitle: "Congratulations!",
          },
        ],
      },
    ],
  };

  return data;
}
