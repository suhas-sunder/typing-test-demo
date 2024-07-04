import { Link } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "../../styles/global.module.css";
import loadable from "@loadable/component";
import useHexToCSSFilter from "../hooks/useHexToCSSFilter";

const CallToActionBanner = loadable(() => import("./CallToActionBanner"));

function FirstFeatureSection() {
  const divsRef = useRef<HTMLDivElement[]>([]);
  const imgRef = useRef<HTMLImageElement>(null);
  const firstImgRef = useRef<HTMLImageElement>(null);

  const firstShowcaseData = [
    {
      id: "mobile-friendly",
      pngImg: "https://www.honeycombartist.com/defaults/phone.png",
      webpImg: "https://www.honeycombartist.com/defaults/phone.webp",
      ref: firstImgRef,
      alt: "Mobile phone with a beautiful scenic background that spills out of the frame of the phone in some areas.",
      title: "Mobile friendly",
      description:
        "Free Typing Camp offers the most accessible typing program for all users. Our tests & courses are fully responsive and optimized for devices large & small.",
    },
    {
      id: "fully-customizable",
      pngImg: "https://www.honeycombartist.com/defaults/customizability.png",
      webpImg: "https://www.honeycombartist.com/defaults/customizability.webp",
      ref: imgRef,
      alt: "Lush forest landscape with trees that changes colour programmatically to demonstrate website customizability features",
      title: "Fully customizable",
      description:
        "Craft your ideal space & bring it to life by unlocking vibrant illustrations to customize the site according to your preferences. Make it truly yours!",
    },
    {
      id: "start-learning",
      pngImg: "https://www.honeycombartist.com/defaults/learning.png",
      webpImg: "https://www.honeycombartist.com/defaults/learning.webp",
      ref: null,
      alt: "A human brain sprouting from a tree that contains a forest landscape with geese flying in the sky",
      title: "Start learning for free",
      description:
        "Accumulate points, monitor your progress, & elevate your learning with a wide array of unlockables by creating a free account!",
    },
  ];

  const colourPallet = [
    {
      id: "pink-700",
      style: "bg-pink-700",
      hexCode: "#be185d", //Pink 700
    },
    {
      id: "rose-800",
      style: "bg-rose-800",
      hexCode: "#9f1239", //Rose 800
    },
    {
      id: "emerald-600",
      style: "bg-emerald-600",
      hexCode: "#059669", //Emerald 600
    },
    {
      id: "black",
      style: "bg-black",
      hexCode: "#0a0a0a", //Black
    },
    {
      id: "slate-700",
      style: "bg-slate-700",
      hexCode: "#334155", //Slate 700
    },
    {
      id: "orange-700",
      style: "bg-orange-700",
      hexCode: "#c2410c", //Orange 700
    },
    {
      id: "purple-600",
      style: "bg-purple-600",
      hexCode: "#9333ea", //Purple 600
    },
    {
      id: "yellow-950",
      style: "bg-yellow-950",
      hexCode: "#422006", //Yellow 950 (brown)
    },

    {
      id: "teal-700",
      style: "bg-teal-700",
      hexCode: "#0f766e", //Teal 700
    },
  ];

  useHexToCSSFilter({
    divsRef,
    imgRef,
    hexCodes: colourPallet.map((colours) => colours.hexCode),
  });

  // Lazy loaz first content paintful img for mobile
  useEffect(() => {
    if (window.innerWidth <= 500 && firstImgRef.current) {
      firstImgRef.current.loading = "lazy";
    }
  }, []);

  return (
    <div className="relative flex w-full max-w-[1200px] flex-col items-center gap-20 px-5 pb-14 text-center md:flex-row md:justify-around md:gap-0">
      {firstShowcaseData.map((data) => (
        <div
          key={data.id}
          className="relative flex max-w-[280px] flex-col items-center gap-6"
        >
          {data.id === "fully-customizable" && (
            <div className="absolute -bottom-10 flex w-full items-center justify-center gap-4 md:-bottom-12">
              {colourPallet.map((colour, index) => (
                <div
                  key={colour.id}
                  ref={(el) => {
                    if (el) divsRef.current.push(el);
                  }}
                  className={`flex h-2 w-2 rounded-sm ${colour.style} ${
                    index === 0 && "scale-[1.3]"
                  }`}
                  aria-hidden="true" // Hide from screen readers as it's decorative
                ></div>
              ))}
            </div>
          )}
          <div className="relative flex">
            <picture className="flex min-h-[245px] min-w-[190px]">
              <source srcSet={data.webpImg} type="image/webp"></source>
              <img
                ref={data.ref}
                src={data.pngImg}
                alt={data.alt}
                width={190}
                height={245}
                className={`${
                  data.ref === imgRef ? styles["image-theme"] : styles.image
                } mb-2 rounded-lg`}
              />
            </picture>
          </div>
          <h2 className="font-lora text-xl font-bold capitalize text-defaultblue">
            {data.title}
          </h2>
          <p className="font-lato font-normal leading-8">{data.description}</p>
        </div>
      ))}
    </div>
  );
}

function SecondFeatureSection() {
  const sectionData = [
    {
      cardStyles: [
        {
          cardInBack:
            "absolute -right-5 -top-5 flex-col justify-between brightness-[97%]",
          cardInBackBanners: "brightness-[25%]",
        },
        {
          cardInFront: "relative items-center justify-center",
        },
      ],
      pngImg:
        "https://www.honeycombartist.com/defaults/controller_with_letters.png",
      alt: "Video game controller to showcase games feature",
      webpImg:
        "https://www.honeycombartist.com/defaults/controller_with_letters.webp",
      imgStyle: "scale-y-[0.7] scale-x-[0.8] md:scale-[1.15]",
      title: <span>Gamify your learning</span>,
      description: (
        <span>
          Our collection of fun &amp; engaging typing games are the heart of the
          action. Experience a down-to-earth, game-filled journey while
          improving your typing speed and accuracy.
        </span>
      ),
    },
    {
      cardStyles: [
        {
          cardInBack:
            "absolute -top-5 right-5 flex-col justify-between brightness-[97%]",
          cardInBackBanners: "brightness-50",
        },
        {
          cardInFront: "relative items-center justify-center",
        },
      ],
      pngImg: "https://www.honeycombartist.com/defaults/robots-typing.png",
      alt: "Educational tips and articles",
      webpImg: "https://www.honeycombartist.com/defaults/robots-typing.webp",
      imgStyle: "scale-y-[0.6] scale-x-[1.2] md:scale-y-100 md:scale-x-[1.67]",
      title: <span>Educational articles &amp; tips</span>,
      description: (
        <span>
          From expert advice on improving typing speed to in-depth articles
          exploring the nuances of effective keyboard usage, we've got you
          covered. Explore our educational tips &amp; articles to enrich your
          typing literacy &amp; elevate your digital skills.
        </span>
      ),
    },
    {
      cardStyles: [
        {
          cardInBack:
            "absolute -right-5 top-5 flex-col justify-between brightness-[97%]",
          cardInBackBanners: "brightness-50",
        },
        {
          cardInFront: "relative items-center justify-center",
        },
      ],
      pngImg: "https://www.honeycombartist.com/defaults/trophy.png",
      alt: "Unlockable achievements and more",
      webpImg: "https://www.honeycombartist.com/defaults/trophy.webp",
      imgStyle: "scale-y-[0.7] scale-x-[0.8] md:scale-[1.15]",
      title: <span>Achievements</span>,
      description: (
        <span>
          Celebrate your milestones &amp; victories by unlocking achievements
          that tell a unique story of your journey towards typing mastery. So,
          keep typing, keep achieving, &amp; let the accolades roll in.
        </span>
      ),
    },
    {
      cardStyles: [
        {
          cardInBack:
            "absolute right-5 top-5 flex-col justify-between brightness-[97%]",
          cardInBackBanners: "brightness-50",
        },
        {
          cardInFront: "relative items-center justify-center",
        },
      ],
      pngImg:
        "https://www.honeycombartist.com/defaults/robots-typing-competing.png",
      webpImg:
        "https://www.honeycombartist.com/defaults/robots-typing-competing.webp",
      alt: "Compete against others leaderboard",
      imgStyle: "scale-y-[0.6] scale-x-[1.2] md:scale-y-100 md:scale-x-[1.67]",
      title: <span>Leaderboard</span>,
      description: (
        <span>
          Step up to the challenge &amp; experience the thrill of real-time
          competition. Engage in friendly rivalry as you measure your points
          against fellow typists on a weekly, monthly, yearly, &amp; overall
          basis.
        </span>
      ),
    },
  ];

  return (
    <div className="mb-20 flex w-full flex-col items-center gap-32 px-14 ">
      {sectionData.map((section, index) => (
        <div
          key={uuidv4()}
          className={`flex w-full max-w-[1060px] flex-col items-center justify-between gap-20 sm:gap-10 ${
            index % 2 === 0 ? "sm:flex-row-reverse" : "sm:flex-row"
          }`}
        >
          <div className="relative flex">
            {section.cardStyles.map((card) => (
              <div
                key={uuidv4()}
                className={`flex h-[14.5em] w-[16.75em] overflow-hidden rounded-md bg-white shadow-lg shadow-slate-400 sm:h-[22em] sm:w-[25em] ${
                  card.cardInFront || card.cardInBack
                }`}
                aria-hidden="true" // Hide from screen readers as decorative
              >
                <div
                  className={`absolute top-0 flex h-8 w-full bg-slate-800 opacity-70 ${card.cardInBackBanners}`}
                ></div>
                <div className="${card.cardInBackBanners} absolute bottom-0 flex h-6 w-full bg-slate-900 opacity-10"></div>
              </div>
            ))}

            <picture className="absolute left-1/2 top-[53%] flex -translate-x-1/2 -translate-y-1/2">
              <source srcSet={section.webpImg} type="image/webp"></source>
              <img
                src={section.pngImg}
                alt={section.alt} // Provide descriptive alt text
                width={190}
                height={245}
                loading="lazy"
                className={`${styles.image} ${
                  index % 2 !== 0 && "scale-150"
                } mb-2 flex rounded-lg`}
              />
            </picture>
          </div>
          <div className="flex flex-col items-center justify-center gap-5 text-center lg:items-start lg:gap-10 lg:text-start">
            <h2 className="font-lora text-2xl font-bold capitalize lg:translate-y-2 lg:text-3xl">
              {section.title}
            </h2>
            <p className="tracking-loose flex max-w-[25em] font-lato text-base font-normal leading-loose lg:text-lg lg:leading-loose">
              {section.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

//Used by Home.tsx component
function LandingPage() {
  useLayoutEffect(() => {
    CallToActionBanner.load();
  }, []);

  return (
    <>
      <FirstFeatureSection />
      <section className="flex w-full flex-col items-center justify-center gap-5 bg-sky-50 px-7 py-20 font-lato font-normal sm:gap-10 md:px-14 lg:px-20 ">
        <h2 className="flex w-full max-w-[1160px] justify-end font-lora text-base md:text-lg lg:text-xl">
          Why learn to type?
        </h2>
        <div className="flex w-full flex-col text-center text-[1.3rem] leading-[3.5rem] tracking-wider text-defaultblue sm:text-[1.5rem] md:text-justify md:text-[2rem] md:leading-[4.5rem] lg:max-w-[1160px] lg:text-[2.4rem] lg:leading-[5.5rem]">
          <p>
            Master the art of typing and unlock new levels of efficiency,
            productivity, and success. Our courses empower you to take your
            skills to the next level. Start practicing today and make
            improvements in no time!
          </p>
        </div>
        <Link
          to="/lessons"
          className={`relative mx-auto mt-3 inline-flex rounded-full border-[2.5px] border-sky-700 bg-sky-700 px-8 py-3 font-nunito text-base font-normal text-white hover:scale-[1.02] hover:brightness-105 sm:mt-0 sm:text-lg lg:text-xl`}
        >
          View Lessons
        </Link>
      </section>
      <SecondFeatureSection />
      <div className="flex w-full flex-col gap-16 bg-defaultblue pb-16 pt-20 sm:pb-20 sm:pt-24 md:hidden">
        <CallToActionBanner />
      </div>
    </>
  );
}

export default LandingPage;
