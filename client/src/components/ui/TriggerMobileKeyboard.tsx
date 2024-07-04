//Hidden text input is used to trigger mobile keypad
interface PropType {
  children: React.ReactNode;
  showGameOverMenu: boolean;
}

function TriggerMobileKeyboard({ children, showGameOverMenu }: PropType) {
  return (
    <>
      <input
        disabled={showGameOverMenu}
        autoComplete="off"
        aria-describedby="Hidden text input used to trigger hidden menu on mobile and tablet devices when tapped by user to enable typing test functionality."
        type="text"
        id="trigger-mobile-keyboard"
        name="trigger-mobile-keyboard"
        className="  left-0 top-0 z-10 opacity-0 flex h-full w-full  border-2 border-none  caret-transparent outline-none"
        onClick={(e) => {
          e.preventDefault();
        }}
      />

      <label
        htmlFor="trigger-mobile-keyboard"
        className="z-[100] resize-none  outline-none"
      >
        {children}
      </label>
    </>
  );
}

export default TriggerMobileKeyboard;
