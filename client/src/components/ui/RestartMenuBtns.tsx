interface PropType {
  handleRestart: () => void;
  gameOver: boolean;
  showMainMenu: () => void;
}

export default function RestartMenuBtns({
  handleRestart,
  gameOver,
  showMainMenu,
}: PropType) {
  return (
    <div className="mb-6 mt-2 flex w-full items-center justify-center gap-10 text-sm sm:text-base font-nunito">
      <button
        className="rounded-md bg-sky-700 px-6 py-2 tracking-wider text-white hover:scale-[1.03] hover:brightness-105"
        onClick={showMainMenu}
      >
        Main Menu
      </button>
      <button
        className="flex min-w-[8em] items-center justify-center rounded-lg  bg-sky-700 px-4 py-2 text-white hover:scale-105"
        onClick={handleRestart}
      >
        {gameOver ? "Try Again" : "Restart"}
      </button>
    </div>
  );
}
