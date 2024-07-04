export type LessonDataType = {
  id: string;
  linkToNovelsWebsite?: string;
  listOfAnimals?: string[];
  title: string;
  lessonData: {
    sectionTitle: string;
    sectionId: string;
    sectionData: {
      id: string;
      levelTitle: string;
    }[];
  }[];
};

function LessonBeginnerData() {
  const data: LessonDataType = {
    id: "beginner-id",
    title: "Beginner",
    lessonData: [
      {
        sectionTitle: "Home Row Left Hand",
        sectionId: "home-row-left-id",
        sectionData: [
          {
            id: "as",
            levelTitle: "as",
          },
          {
            id: "ad",
            levelTitle: "ad",
          },
          {
            id: "af",
            levelTitle: "af",
          },
          {
            id: "sd",
            levelTitle: "sd",
          },
          {
            id: "fd",
            levelTitle: "fd",
          },
          {
            id: "asd",
            levelTitle: "asd",
          },
          {
            id: "fds",
            levelTitle: "fds",
          },
          {
            id: "asdf",
            levelTitle: "asdf",
          },
          {
            id: "asdf-capital",
            levelTitle: "ASDF",
          },
          {
            id: "asdfasdf",
            levelTitle: "ASDFasdf",
          },
        ],
      },
      {
        sectionTitle: "Home Row Right Hand",
        sectionId: "home-row-right-id",
        sectionData: [
          {
            id: "jk",
            levelTitle: "jk",
          },
          {
            id: "jl",
            levelTitle: "jl",
          },
          {
            id: "j;",
            levelTitle: "j;",
          },
          {
            id: "kl",
            levelTitle: "kl",
          },
          {
            id: ";k",
            levelTitle: ";k",
          },
          {
            id: "jkl",
            levelTitle: "jkl",
          },
          {
            id: ";lk",
            levelTitle: ";lk",
          },
          {
            id: "jkl:",
            levelTitle: "JKL:",
          },
          {
            id: "jkl:jkl;",
            levelTitle: "JKL:jkl;",
          },
        ],
      },
      {
        sectionTitle: "Home Row",
        sectionId: "home-row-id",
        sectionData: [
          {
            id: "asjk",
            levelTitle: "asjk",
          },
          {
            id: "adjl",
            levelTitle: "adjl",
          },
          {
            id: "afj;",
            levelTitle: "afj;",
          },
          {
            id: "sdkl",
            levelTitle: "sdkl",
          },
          {
            id: "fs;k",
            levelTitle: "fs;k",
          },
          {
            id: "asdjkl",
            levelTitle: "asdjkl",
          },
          {
            id: "fds;lk",
            levelTitle: "fds;lk",
          },
          {
            id: "asdfjkl:",
            levelTitle: "ASDFJKL:",
          },
          {
            id: "asdfasdfjkl:jkl;",
            levelTitle: "ASDFasdfJKL:jkl;",
          },
        ],
      },
      {
        sectionTitle: "Top Row Left Hand",
        sectionId: "top-row-left-id",
        sectionData: [
          {
            id: "qw",
            levelTitle: "qw",
          },
          {
            id: "qe",
            levelTitle: "qe",
          },
          {
            id: "qr",
            levelTitle: "qr",
          },
          {
            id: "qt",
            levelTitle: "qt",
          },
          {
            id: "wer",
            levelTitle: "wer",
          },
          {
            id: "qwe",
            levelTitle: "qwe",
          },
          {
            id: "ert",
            levelTitle: "ert",
          },
          {
            id: "qwert",
            levelTitle: "qwert",
          },
          {
            id: "qwert-capital",
            levelTitle: "QWERT",
          },
        ],
      },
      {
        sectionTitle: "Top Row Right Hand",
        sectionId: "top-row-right-id",
        sectionData: [
          {
            id: "yu",
            levelTitle: "yu",
          },
          {
            id: "yi",
            levelTitle: "yi",
          },
          {
            id: "yo",
            levelTitle: "yo",
          },
          {
            id: "yp",
            levelTitle: "yp",
          },
          {
            id: "uio",
            levelTitle: "uio",
          },
          {
            id: "yui",
            levelTitle: "yui",
          },
          {
            id: "iop",
            levelTitle: "iop",
          },
          {
            id: "yuiop",
            levelTitle: "yuiop",
          },
          {
            id: "yuiop-capital",
            levelTitle: "YUIOP",
          },
        ],
      },
      {
        sectionTitle: "Top Row",
        sectionId: "top-row-id",
        sectionData: [
          {
            id: "qwyu",
            levelTitle: "qwyu",
          },
          {
            id: "qeyi",
            levelTitle: "qeyi",
          },
          {
            id: "qryo",
            levelTitle: "qryo",
          },
          {
            id: "qtyp",
            levelTitle: "qtyp",
          },
          {
            id: "weruio",
            levelTitle: "weruio",
          },
          {
            id: "qweyui",
            levelTitle: "qweyui",
          },
          {
            id: "ertiop",
            levelTitle: "ertiop",
          },
          {
            id: "qwertyuiop",
            levelTitle: "qwertyuiop",
          },
          {
            id: "qwertyuiop-capital",
            levelTitle: "QWERTYUIOP",
          },
          {
            id: "qwertqwertyuiopyuiop",
            levelTitle: "QWERTqwertYUIOPyuiop",
          },
        ],
      },
    ],
  };

  return data;
}

export default LessonBeginnerData;
