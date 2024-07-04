import type { LessonDataType } from "./LessonBeginnerData";

export default function LessonAdvancedData() {
  const data: LessonDataType = {
    id: "advanced-id",
    title: "Advanced",
    lessonData: [
      {
        sectionTitle: "Number Row",
        sectionId: "number-row-id",
        sectionData: [
          {
            id: "number-row-left",
            levelTitle: "123456",
            
          },
          {
            id: "number-row-right",
            levelTitle: "7890-=",
           
          },
          {
            id: "number-row-full",
            levelTitle: "1234567890-=",
            
          },
          {
            id: "number-row-left-1",
            levelTitle: "!@#$%^",
           
          },
          {
            id: "number-row-right-1",
            levelTitle: "&*()_+",
           
          },
          {
            id: "number-left-full-1",
            levelTitle: "123456!@#$%^",
           
          },
          {
            id: "number-right-full-1",
            levelTitle: "7890-=&*()_+",
           
          },
          {
            id: "number-full-1",
            levelTitle: "Full Number Row",
            
          },
        ],
      },
      {
        sectionTitle: "Brackets",
        sectionId: "brackets-id",
        sectionData: [
          {
            id: "brackets-1",
            levelTitle: "asdfjkl{}",
            
          },
          {
            id: "brackets-2",
            levelTitle: "asdfjkl[]",
           
          },
          {
            id: "brackets-3",
            levelTitle: "asdfjkl{}[]",
            
          },
          {
            id: "brackets-4",
            levelTitle: "asdfjkl()",
           
          },
          {
            id: "brackets-5",
            levelTitle: "asdfjkl{}[]()",
           
          },
        ],
      },
      {
        sectionTitle: "Symbols",
        sectionId: "symbols-id",
        sectionData: [
          {
            id: "symbol-top-left-row-1",
            levelTitle: "`~!@#$%^",
            
          },
          {
            id: "symbol-top-right-row-1",
            levelTitle: "&*()_+-=",
            
          },
          {
            id: "symbol-top-row-1",
            levelTitle: "~!@#$%^&*()_+-=",
            
          },
          {
            id: "symbol-right-right-col-1",
            levelTitle: "=+[{]}|;':,<.>/?\\\"",
            
          },
          {
            id: "symbol-all-1",
            levelTitle: "`@#$%^&*()_~=+[{]}|;':,<.>/?\\\"",
           
          },
        ],
      },
      {
        sectionTitle: "Letters, Numbers, & Symbols",
        sectionId: "letters-nums-symbols-id",
        sectionData: [
          {
            id: "symbol-words-quotes",
            levelTitle: "Words In Quotes",
            
          },
          {
            id: "symobol-numbers-quotes",
            levelTitle: "Numbers In Quotes",
            
          },
          {
            id: "text-in-brackets-quotes",
            levelTitle: "Text In Brackets",
            
          },
          {
            id: "hashed-tags-quotes",
            levelTitle: "Hash Tags",
            
          },
          {
            id: "calculations-quotes",
            levelTitle: "Math Equations",
            
          },
          {
            id: "emails-quotes",
            levelTitle: "Emails",
            
          },
          {
            id: "money-quotes",
            levelTitle: "Money",
            
          },
          {
            id: "conditionals-quotes",
            levelTitle: "Conditionals and Equality &|!*=",
            
          },
          {
            id: "punctuated-words-quotes",
            levelTitle: "Punctuated words ,.?!",
            
          },
        ],
      },
      {
        sectionTitle: "Tricky Words",
        sectionId: "tricky-words-id",
        sectionData: [
          {
            id: "tricky-words",
            levelTitle: "Words",
            
          },
          {
            id: "mixed-case",
            levelTitle: "MiXed CasE",
            
          },
          {
            id: "tricky-words-symbols",
            levelTitle: "Words & Symbols",
           
          },
          {
            id: "tricky-mixed-words-symbols",
            levelTitle: "MiXed CaSe & Symbols",
            
          },
          {
            id: "mixed-case-3",
            levelTitle: "MiXed CaSe & All",
            
          },
        ],
      },
    ],
  };

  return data;
}
