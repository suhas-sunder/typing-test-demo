import AccountAPI from "../../api/accountAPI";

interface PropType {
  test_time_sec: number;
  wpm: number;
  cpm: number;
  test_score: number;
  total_chars: number;
  correct_chars: number;
  misspelled_chars: number;
  test_accuracy: number;
  difficultyScore: number;
  difficultyLevel: string;
  test_name: string;
  user_id: string;
  difficulty_name: string;
  difficulty_settings: string[] | boolean;
}

//Save speed test score to database via TypingStats.txt component
export default async function PostTestStats(props: PropType) {
  //Quick test to see if request is called too many times
  // console.log("post test stats runs");

  const screen_size_info = `screen height: ${window.screen.height}px + screen width: ${window.screen.width}px`;

  try {
    const response = await AccountAPI.post("/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: {
        ...props,
        screen_size_info,
      },
    })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });

    const parseRes = await response;

    if (parseRes) {
      return "update header score";
    } else {
      console.log("Error saving test stats");
    }
  } catch (err) {
    let message: string;

    if (err instanceof Error) {
      message = err.message;
    } else {
      message = String(err);
    }

    console.error(message);
  }

  return true;
}
