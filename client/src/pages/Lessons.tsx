import { useLayoutEffect, useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import loadable from "@loadable/component";
import LessonMenuData from "../data/LessonMenuData";

const SidebarMenu = loadable(
  () => import("../components/ui/navigation/SidebarMenu"),
);

export default function Lessons() {
  const [displayLesson, setDisplayLesson] = useState<number>(0); //Used to manage which menu section is to be displayed
  const navigate = useNavigate();
  const sidebarMenuData = useMemo(() => LessonMenuData(), []);

  useLayoutEffect(() => {
    if (location.pathname === "/lessons") navigate("/lessons/beginner");

    SidebarMenu.load();
  }, [navigate]);

  return (
    <>
      {location.pathname.includes("/lesson/") ? (
        <Outlet />
      ) : (
        <div className={`mx-auto flex max-w-[1200px] flex-col gap-10 py-12 `}>
          <header>
            <h1 className="flex w-full justify-center font-nunito text-3xl text-white">
              Typing Lessons
            </h1>
            {/* <div>Progress summary: Continue where you left off</div> */}
          </header>
          <main className="mb-10 flex flex-col rounded-2xl  md:flex-row">
            <section
              role="navigation"
              aria-label="Sidebar lessons menu"
              className="mb-auto flex min-w-[13em] items-start rounded-l-2xl md:min-h-[28em] md:bg-slate-200"
            >
              <SidebarMenu
                displayMenuItem={displayLesson}
                setDisplayMenuItem={setDisplayLesson}
                menuData={sidebarMenuData}
              />
            </section>
            <section className="flex min-h-[60em] w-full rounded-2xl rounded-tl-none rounded-tr-none bg-white md:rounded-tr-xl">
              <Outlet />
            </section>
            {/* <LessonMenu displayLesson={displayLesson} menuData={menuData} /> */}
          </main>
        </div>
      )}
    </>
    // ADD advert for games and additional BOOKS/NOVELS at very bottom that levels to the book/novel typing test site. Also level ads for other sites. Add bible to books site, not here.
  );
}
