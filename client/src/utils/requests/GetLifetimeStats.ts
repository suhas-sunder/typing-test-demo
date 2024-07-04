import AccountAPI from "../../api/accountAPI";
interface PropType {
  userId: string;
}

export default async function GetLifetimeStats({ userId }: PropType) {
  let statsData = {};

  //Quick test to see if request is called too many times
  // console.log("get header stats runs");

  try {
    const response = await AccountAPI.get("/lifetime-stats", {
      method: "GET",
      params: {
        userId,
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
