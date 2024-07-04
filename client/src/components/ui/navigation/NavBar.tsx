import { useEffect, useLayoutEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./styles/NavBar.module.css";
import useAuth from "../../hooks/useAuth";
import GetTotalScore from "../../../utils/requests/GetTotalScore";
import GetSavedImages from "../../../utils/requests/GetSavedImages";
import useImg from "../../hooks/useImg";
import useStats from "../../hooks/useStats";
import kittenWebp from "../../../assets/images/kitten.webp";
import kittenJpg from "../../../assets/images/kitten.jpg";

import loadable from "@loadable/component";

const Icon = loadable(() => import("../../../utils/other/Icon"));
const Logo = loadable(() => import("./Logo"));
const LogoutBtn = loadable(() => import("./LogoutBtn"));

interface PropType {
  showMobileMenu?: boolean;
  isLoggedIn?: boolean;
  setShowMobileMenu: (value: boolean) => void;
}

function LoginLinks({ showMobileMenu, setShowMobileMenu }: PropType) {
  return (
    <>
      <li className={`relative flex`}>
        <NavLink
          onClick={() => setShowMobileMenu(false)}
          to="/login"
          className={`relative inline-flex items-center justify-center gap-2 p-5 ${
            showMobileMenu && "w-full items-center justify-center"
          }`}
        >
          Login
          <Icon
            title="login-icon"
            customStyle={`${styles.icon} text-white -translate-y-[0.07em] relative`}
            icon="lockOpen"
          />
        </NavLink>
      </li>

      <li className={`flex `}>
        <NavLink
          onClick={() => setShowMobileMenu(false)}
          to="/register"
          className={`relative inline-flex  py-3 ${
            showMobileMenu && "w-full items-center justify-center pb-6 "
          }`}
        >
          <span
            className={`${styles.btn} relative rounded-[0.3em] border-[2.5px] border-white bg-white px-3 py-2 font-[500] text-defaultblue`}
          >
            Sign Up Free!
          </span>
        </NavLink>
      </li>
    </>
  );
}

function ProfileMenu({ setShowMobileMenu }: PropType) {
  const { userName, userId } = useAuth();
  const { totalScore, setTotalScore } = useStats();

  const { profileImgURL, setImageData } = useImg();

  useEffect(() => {
    const updateImageData = async () => {
      const result = await GetSavedImages({ userId });
      setImageData(result);
    };

    const updateNavStats = async () => {
      const result = await GetTotalScore({ userId });
      setTotalScore(result);
    };

    if (userId) {
      updateNavStats();
      updateImageData();
    }
  }, [setImageData, setTotalScore, userId]);

  return (
    <NavLink
      onClick={() => setShowMobileMenu(false)}
      data-testid="profile-menu"
      to={"/profile/summary"}
      className={`${styles.profile} relative mr-3 hidden items-center gap-3 hover:cursor-pointer`}
    >
      <ul className={` ${styles["profile-stats"]} relative flex-col`}>
        <li data-testid="username" className="mb-1 flex justify-end text-sm">
          {userName}
        </li>
        <li
          data-testid="profile-score"
          className="relative flex justify-end gap-1 text-yellow-300"
        >
          <span className="flex text-lg tracking-widest">
            {totalScore ? Number(totalScore).toLocaleString() : 0}
          </span>
          <Icon
            title="trophy-icon"
            customStyle={`${styles.icon} scale-[1.1] `}
            icon="trophy"
          />
        </li>
      </ul>
      <picture className="flex min-h-[64px] min-w-[64px]">
        <source
          srcSet={profileImgURL ? `${profileImgURL}.webp` : kittenWebp}
          type="image/webp"
        ></source>
        <img
          src={profileImgURL ? `${profileImgURL}.jpg` : kittenJpg}
          alt="Profile card featuring an animal or object or colourful scenery that either matches the level unlocked by user or has been selected by user as profile"
          className={`${styles.img} relative flex h-16 w-16 rounded-xl border-[3px]  object-cover`}
          width={64}
          height={64}
        />
      </picture>
    </NavLink>
  );
}

// Main navigation links for nav bar
function MainLinks({
  showMobileMenu,
  isLoggedIn,
  setShowMobileMenu,
}: PropType) {
  return (
    <ul
      id={showMobileMenu ? "mobile-links" : "main-links"}
      className={`bg-defaultblue  ${
        showMobileMenu ? styles["mobile-nav"] : styles["main-nav"]
      }`}
    >
      <li>
        {showMobileMenu && (
          <NavLink
            onClick={() => setShowMobileMenu(false)}
            to="/"
            className="relative flex items-center justify-center gap-2 py-5 tracking-[0.1em]"
          >
            Typing Test
            <Icon
              icon="speed"
              title="typing-test-icon"
              customStyle={`${styles.icon} text-white -translate-y-[0.07em] relative`}
            />
          </NavLink>
        )}
        <NavLink
          onClick={() => setShowMobileMenu(false)}
          to="/lessons"
          className="relative flex items-center justify-center gap-2 py-5 tracking-[0.1em]"
        >
          Lessons
          <Icon
            icon="graduationHat"
            title="lessons-icon"
            customStyle={`${styles.icon} text-white -translate-y-[0.07em] relative`}
          />
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => setShowMobileMenu(false)}
          to="/games"
          className="relative flex items-center justify-center gap-2 py-5 tracking-[0.1em]"
        >
          Games
          <Icon
            icon="gamepad"
            title="games-icon"
            customStyle={` ${styles.icon} text-white -translate-y-[0.07em] relative`}
          />
        </NavLink>
      </li>
      {showMobileMenu && !isLoggedIn && (
        <>
          <LoginLinks
            showMobileMenu={showMobileMenu}
            setShowMobileMenu={setShowMobileMenu}
          />{" "}
        </>
      )}
      {showMobileMenu && isLoggedIn && (
        <>
          <li>
            <NavLink
              onClick={() => setShowMobileMenu(false)}
              to="/profile/summary"
              className="relative flex items-center justify-center gap-2 py-5 tracking-[0.1em]"
            >
              Profile
              <Icon
                icon="book"
                title="profile-icon"
                customStyle={` ${styles.icon} text-white -translate-y-[0.07em] relative`}
              />
            </NavLink>
          </li>
          <li
            onClick={() => setShowMobileMenu(false)}
            className="relative m-auto flex"
          >
            <LogoutBtn iconStyle="" customStyle={"mt-5 mb-8"} />
          </li>
        </>
      )}
    </ul>
  );
}

//Used by App.tsx component
export default function NavBar() {
  const { isAuthenticated } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  // Close burger menu whenever screen is resized
  useEffect(() => {
    const handleResize = () => {
      setShowMobileMenu(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handles mobile nav bar menu order. Useful when modal is open and nav-bar needs to remain at the very top.
  useEffect(() => {
    const navElement = document.getElementById("nav");

    if (showMobileMenu && navElement) {
      navElement.style.zIndex = "1000";
    } else if (navElement) {
      navElement.style.zIndex = "0";
    }
  }, [showMobileMenu]);

  useLayoutEffect(() => {
    Icon.load();
    Logo.load();
    LogoutBtn.preload();
  }, []);

  return (
    <nav className={`${styles.nav}`}>
      <div
        className={`${styles["fade-in-nav"]} m-auto flex  max-w-[1025px] items-center justify-between`}
      >
        <Logo setShowMobileMenu={setShowMobileMenu} />
        <MainLinks
          isLoggedIn={isAuthenticated}
          showMobileMenu={showMobileMenu}
          setShowMobileMenu={setShowMobileMenu}
        />
        {showMobileMenu && (
          <div
            onClick={() => setShowMobileMenu(false)}
            className="absolute bottom-0 left-0 right-0 top-24 min-h-[100vh] min-w-[100vw] bg-sky-950 bg-opacity-30"
          />
        )}
        {isAuthenticated ? (
          <ProfileMenu setShowMobileMenu={setShowMobileMenu} />
        ) : (
          <ul
            className={`${styles["login-menu"]} relative justify-center gap-3 pr-5`}
          >
            <LoginLinks
              showMobileMenu={showMobileMenu}
              setShowMobileMenu={setShowMobileMenu}
            />
          </ul>
        )}
        <input
          id="burger"
          type="checkbox"
          checked={showMobileMenu ? true : false}
          readOnly
          className="relative hidden"
        />
        <label
          data-testid="burger-icons"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          htmlFor="burger"
          className={`${styles["burger-label"]} relative hover:cursor-pointer`}
        >
          <Icon
            title="burger-closed-icon"
            customStyle={`flex relative justify-center items-center w-[3.324em] h-[3.324em] scale-125 mr-2 ${styles["burger-open"]}`}
            icon="burgerOpen"
          />
          <Icon
            title="burger-open-icon"
            customStyle={`hidden relative justify-center items-center w-[3.324em] h-[3.324em] scale-125 mr-2 ${styles["burger-close"]}`}
            icon="burgerClosed"
          />
        </label>
      </div>
    </nav>
  );
}
