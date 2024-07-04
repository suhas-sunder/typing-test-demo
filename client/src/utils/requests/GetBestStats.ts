import AccountAPI from "../../api/accountAPI";
interface PropType {
  userId: string;
  difficultyLevel?: string;
  testName?: string;
}

//Get best stats data for specific tests
export default async function GetBestStats({
  userId,
  testName,
  difficultyLevel,
}: PropType) {
  let statsData = {};

  //Quick test to see if request is called too many times
  // console.log("get best stats runs");

  try {
    const response = await AccountAPI.get("/best-stats", {
      method: "GET",
      params: {
        userId,
        test_name: testName,
        difficulty_name: difficultyLevel || null,
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
      statsData = parseRes;
      return parseRes;
    } else {
      console.log("Error fetching header stats");
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

  return statsData;
}
