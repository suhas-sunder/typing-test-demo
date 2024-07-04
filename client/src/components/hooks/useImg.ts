import { useContext, useLayoutEffect, useState } from "react";
import { ImageContext } from "../../providers/ImageProvider";

//Used to simplify context fetching for auth context
export default function useImg() {
  const { imageData } = useContext(ImageContext);

  const [profileImgURL, setProfileImgURL] = useState<string>("");

  useLayoutEffect(() => {
    const savedImgURL = imageData.profile_pathname;
    if (savedImgURL && profileImgURL !== savedImgURL) {
      setProfileImgURL(
        `https://www.honeycombartist.com${imageData.profile_pathname}`,
      );
    } else {
      setProfileImgURL(
        `https://www.honeycombartist.com/origami%2Fkitten%2Fkitten`,
      );
    }
  }, [imageData, profileImgURL]);

  return { ...useContext(ImageContext), profileImgURL };
}
