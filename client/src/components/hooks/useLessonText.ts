import { useEffect, useMemo, useState } from "react";
// import LessonData from "../../data/LessonData";
import { useNavigate } from "react-router-dom";
import LessonBeginnerData from "../../data/LessonBeginnerData";
import LessonIntermediateData from "../../data/LessonIntermediateData";
import LessonAdvancedData from "../../data/LessonAdvancedData";
import LessonGraduationData from "../../data/LessonGraduationData";
import GetLessonText from "../../utils/requests/GetLessonText";

//Generate and provide lesson text based on characters applicable to test or fetch from API as needed
function useLessonText() {
  const [lessonText, setLessonText] = useState<string>(
    "This lesson is still under development and will be implemented soon. Thanks for your patience! This lesson is still under development and will be implemented soon. Thanks for your patience!This lesson is still under development and will be implemented soon. Thanks for your patience!This lesson is still under development and will be implemented soon. Thanks for your patience!This lesson is still under development and will be implemented soon. Thanks for your patience!This lesson is still under development and will be implemented soon. Thanks for your patience!This lesson is still under development and will be implemented soon. Thanks for your patience!This lesson is still under development and will be implemented soon.",
  );

  const navigate = useNavigate();
  const lessonBeginnerData = useMemo(() => LessonBeginnerData(), []);
  const lessonIntermediateData = useMemo(() => LessonIntermediateData(), []);
  const lessonAdvancedData = useMemo(() => LessonAdvancedData(), []);
  const lessonGraduationData = useMemo(() => LessonGraduationData(), []);
  const lessonData = [
    lessonBeginnerData,
    lessonIntermediateData,
    lessonAdvancedData,
    lessonGraduationData,
  ];

  const lessonIndex: number = parseInt(location.pathname?.split("/")[3]) - 1;
  const sectionIndex: number =
    parseInt(location.pathname.split("/")[4]?.split("-")[1]) - 1;
  const levelIndex: number =
    parseInt(location.pathname.split("/")[5]?.split("-")[1]) - 1;
  const lessonName = lessonData[lessonIndex]?.title;
  const sectionName =
    lessonData[lessonIndex]?.lessonData[sectionIndex]?.sectionTitle;
  const levelName =
    lessonData[lessonIndex]?.lessonData[sectionIndex]?.sectionData[levelIndex]
      ?.levelTitle;

  useEffect(() => {
    if (location.pathname === "/lessons/lesson")
      navigate("/lessons/lesson/1/sec-1/lvl-1");
  }, [navigate]);

  useEffect(() => {
    let url = "";

    const updateText = async () => {
      //Create a url that matches text url stored on cms based on lesson section and level index
      url = `https://www.honeycombartist.com/lesson-text%2Flesson_${
        lessonIndex + 1
      }_sec_${sectionIndex + 1}_lvl_${levelIndex + 1}.json`;

      await GetLessonText({ url, setLessonText });
    };

    levelIndex >= 0 && updateText();
  }, [lessonIndex, levelIndex, navigate, sectionIndex, levelName]);

  return {
    sectionIndex,
    lessonIndex,
    levelIndex,
    lessonName,
    sectionName,
    levelName,
    lessonText,
  };
}

export default useLessonText;
