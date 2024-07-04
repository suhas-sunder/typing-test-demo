import ImageAPI from "../../api/imageAPI";

interface PropType {
  imgSaveData: { [key: string]: string };
}

export default async function PostImages({ imgSaveData }: PropType) {
  // Quick test to see if request is called too many times
  // console.log("post images runs");

  if (imgSaveData.profilePathname) {
    const profilePathname = imgSaveData.profilePathname;
    const userId = imgSaveData.userId;

    try {
      const response = await ImageAPI.post("/default-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          profilePathname,
          userId,
        },
      });

      if (response.status === 200) {
        return response;
      } else {
        console.log("Failed to save image data.");
        return null;
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (imgSaveData.gameOverPathname) {
    console.log(imgSaveData.gameOverPathname);
  }

  return null;
}
