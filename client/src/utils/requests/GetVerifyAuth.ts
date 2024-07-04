import userAPI from "../../api/userAPI";

export default async function GetVerifyAuth() {
  //Quick test to see if request is called too many times
  // console.log("get verify auth runs");

  try {
    const response = await userAPI
      .get("/is-verify", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt_token"),
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
      return parseRes;
    } else {
      console.log("Failed to validate user!");
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

  return null;
}
