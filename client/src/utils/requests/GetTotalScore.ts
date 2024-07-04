import AccountAPI from "../../api/accountAPI";

interface PropType {
  userId: string;
}

export default async function GetTotalScore({ userId }: PropType) {
    //Quick test to see if request is called too many times
  // console.log("get total score runs");

  let totalscore = 0
  try {
    const response = await AccountAPI.get("/totalscore", {
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
      totalscore = parseRes.totalscore
      return totalscore;
    } else {
      console.log("Error fetching total score for nav");
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

  return totalscore;
}
