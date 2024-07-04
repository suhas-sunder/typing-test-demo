import { useMemo } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useImg from "../hooks/useImg";
import loadable from "@loadable/component";
import ProfilePgLinks from "../../data/ProfilePgLinks";
import useLoadAnimation from "../hooks/useLoadAnimation";
import kittenWebp from "../../assets/images/kitten.webp";
import kittenJpg from "../../assets/images/kitten.jpg";

const TripleImgLinks = loadable(() => import("../navigation/ImgLinks"));

//Used by Profile.tsx component
export default function ProfileSummary() {
  const { userName } = useAuth();
  const { profileImgURL } = useImg();

  const linkData = useMemo(() => ProfilePgLinks(), []);

  const { fadeAnim } = useLoadAnimation();

  return (
    <>
      <div
        className={`${fadeAnim} flex flex-col items-center gap-8 pb-6 transition-opacity  duration-700 ease-in`}
      >
        <Link to="/profile/img">
          <picture className="flex min-h-[176px] min-w-[176px] hover:scale-105">
            <source
              srcSet={profileImgURL ? `${profileImgURL}.webp` : kittenWebp}
              type="image/webp"
            ></source>
            <img
              src={profileImgURL ? `${profileImgURL}.jpg` : kittenJpg}
              alt="Colourful wolf standing on a mountain top."
              className={`relative flex h-44 w-44 rounded-2xl border-defaultblue bg-defaultblue object-cover`}
              width={176}
              height={176}
            />
          </picture>
        </Link>
        <h2 className="min-h-10 text-center text-3xl text-defaultblue  sm:text-4xl">
          Welcome <span className="text-sky-700">{userName}</span>!
        </h2>
      </div>
      <div
        className={`${fadeAnim} flex min-h-[14em] w-full items-center justify-center`}
      >
        <TripleImgLinks linkData={linkData} customStyle="" />
      </div>
    </>
  );
}
