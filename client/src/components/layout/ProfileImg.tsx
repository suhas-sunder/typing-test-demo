import { Link } from "react-router-dom";
import SparkleAnim from "../ui/SparkleAnim";
import useImg from "../hooks/useImg";
import Icon from "../../utils/other/Icon";
import kittenWebp from "../../assets/images/kitten.webp";
import kittenJpg from "../../assets/images/kitten.jpg";

interface ProfileImageLinkType {
  level: number;
  url: string;
}

//Displays profile image and user level info
function ProfileImageLink({ level, url }: ProfileImageLinkType) {
  const { profileImgURL } = useImg();

  return (
    <SparkleAnim>
      <Link to={url}>
        <picture className="flex  min-h-[190px] min-w-[144px]">
          <source
            srcSet={profileImgURL ? `${profileImgURL}.webp` : kittenWebp}
            type="image/webp"
          ></source>
          <img
            loading="eager"
            src={profileImgURL ? `${profileImgURL}.jpg` : kittenJpg}
            alt="Profile card featuring an animal or object or colourful scenery that either matches the level unlocked by user or has been selected by user as profile"
            className={`relative flex w-full rounded-lg border-slate-800 drop-shadow-lg`}
            width={144}
            height={190}
          />
        </picture>
        <p className="absolute -bottom-6 w-full rounded-full text-center text-[0.75rem] tracking-wider">
          Level: {level.toLocaleString()}
        </p>
      </Link>
    </SparkleAnim>
  );
}

interface ProfileImgType {
  level: number;
  nextMilestone: number;
  redirectUrl: string;
  mastery: string;
}

function ProfileImg({
  level,
  nextMilestone,
  redirectUrl,
  mastery,
}: ProfileImgType) {
  return (
    <section className="relative  mr-3 flex w-full scale-90 flex-col items-center justify-center gap-5 tracking-wider sm:mb-12 sm:ml-4 sm:w-auto sm:scale-100 md:mr-2 lg:mb-4 ">
      <div className="relative flex min-h-[11.4em] max-w-[12em] cursor-pointer justify-center rounded-xl bg-slate-800 px-[7px] pb-8 pt-[9px] hover:scale-105 sm:min-h-[14.7em] sm:w-[12em]">
        <ProfileImageLink level={level} url={redirectUrl} />
      </div>
      <div className="md:text-md z-10 flex flex-col items-center justify-center gap-2 md:mb-1 lg:text-lg">
        <div className="flex items-center justify-start text-center">
          <Icon
            icon="mastery"
            title="Player mastery level (100 levels per mastery)"
            customStyle="scale-75"
          />
          <p className="text-sm">{mastery}</p>
        </div>
        <div
          title="Points needed to reach next milestone"
          className="center absolute -bottom-8 flex cursor-default items-center justify-start text-[0.7rem] lg:-bottom-7 lg:text-[0.8rem]"
        >
          <div className="flex items-center justify-center">
            <Icon
              icon="upgrade"
              title="Points to next milestone icon"
              customStyle="scale-75"
            />
            <p className=" whitespace-pre text-sky-200">Next Level:</p>
          </div>
          <p className="flex items-center justify-center pl-1 tracking-widest text-sky-100">
            <span className="inline-flex">
              {nextMilestone.toLocaleString()}
            </span>
            <Icon
              icon="trophy"
              customStyle="inline-flex scale-75"
              title={`Next Milestone: ${nextMilestone.toLocaleString()}`}
            />
          </p>
        </div>
      </div>
    </section>
  );
}

export default ProfileImg;
