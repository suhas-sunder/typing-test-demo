import GenerateRandNum from "./GenerateRandNum";

interface PropType {
  characters: string;
  lessonIndex: number;
}

//This component was used to generate lessons text but lessons text should not change so now that I've generated it all I don't need this component. However, I'm keeping it around incase I need to use it again in the future.
//Reminder to delete this after enough time has passed and I know I don't need to use it anymore.
export default function LessonTextGenerator({
  characters,
  lessonIndex,
}: PropType) {
  const goodWPMSpeed = 70;
  const charsPerWord = 5;
  const lessonMultiplier = lessonIndex + 1;

  const totalCharsDisplayed = goodWPMSpeed * charsPerWord * lessonMultiplier; //Calculate how many wors of text should be generated depending on lesson

  let text = "";
  const maxLengthOfWord = Math.ceil(characters.length * 3);

  for (let i = 0; i < totalCharsDisplayed; i++) {
    const randNum = GenerateRandNum({ max: maxLengthOfWord || 1 });

    for (let j = 0; j < randNum; j++) {
      const randIndex = GenerateRandNum({ max: characters.length || 1 });
      text += characters[randIndex];
    }

    text += " ";
  }

  return text.trim();
}
