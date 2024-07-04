import ImageAPI from "../../api/imageAPI";

interface PropType {
  userId: string;
}

export default async function GetSavedImages({ userId }: PropType) {
  //Quick test to see if request is called too many times
  // console.log("get saved images runs");

  try {
    const response = await ImageAPI.get("/defaults", {
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

    if (parseRes || parseRes.length === 0) {
      return parseRes;
    } else {
      console.log("Error fetching saved data for image defaults");
    }
  } catch (e) {
    console.log(e);
  }

  return {};
}
