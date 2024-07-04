import axios from "axios";

interface PropType {
  url: string;
  setLessonText: (value: string) => void;
}

export default async function GetLessonText({ url, setLessonText }: PropType) {
  try {
    const response = await axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        let message;

        if (err instanceof Error) {
          message = err.message;
        } else {
          message = String(err);
        }

        console.log(message);
      });

    const parseRes = await response;

    if (parseRes && url.includes("lesson_6_sec")) {
      setLessonText([parseRes.keywords.split(",").join(" ")].join(" "));
      return parseRes;
    } else if (parseRes) {
      setLessonText([parseRes].join(" "));
      return parseRes;
    } else {
      console.log("Error fetching lesson text from url!");
    }
  } catch (err) {
    let message;

    if (err instanceof Error) {
      message = err.message;
    } else {
      message = String(err);
    }

    console.error(message);
  }
}
