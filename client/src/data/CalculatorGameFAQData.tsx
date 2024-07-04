import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
export default function CalculatorGameFAQData() {
  const faqData = [
    {
      id: "how-faq",
      title: "How to play?",
      details: (
        <span>
          The rules are simple. You are given a fixed amount of lives/hearts
          based on the difficulty you select. Each mistake costs you a life and
          once you lose all lives the game ends. If you input a row of
          characters without losing all lives, a new row will be generated
          automatically. The characters displayed and the score awarded depends
          on the{" "}
          {
            <span className="text-sky-700 underline hover:text-sky-500">
              <HashLink to="/speed-calculator#difficulty-faq">
                difficulty settings
              </HashLink>
            </span>
          }
          . The test starts as soon as you press any key on the keyboard except
          for the 'Tab' key, which is not tracked for website accessability
          reasons. Also, keep in mind that unlike the typing speed test found on
          the home page, the 'backspace' key will not delete mistakes and will
          instead count as an invalid input.
        </span>
      ),
    },
    {
      id: "how-faq-1",
      title: "Speed vs Accuracy",
      details:
        "This game is more about improving your accuracy with the number pad as opposed to how fast you can type out numbers/calculations. So, take your time and focus on getting your keys correct. Over time, as your accuracy improves, your typing speed will naturally improve as a consequence.",
    },
    {
      id: "layout-faq",
      title: "Layout and positioning?",
      details:
        "The layout of this calculator is designed based on the number pad found on the right side of a traditional keyboard, however, valid inputs are not limited to just the keys found on the number pad. If you are using the number pad, on most keyboards, you will find a little indent or 'bump' on the number 5 key which can be used to correctly position your fingers without looking at the keyboard. Place your index finger on number 4, middle finger on number 5, and ring finger on number 6. Regardless of which key you press on the number pad, it is good practice to always have at least one finger one of the aforementioned keys at all times. Use your thumb to press the zero key, and use your pinky to press enter.",
    },
    {
      id: "score",
      title: "How is score calculated?",
      details:
        "Your score will not be recorded until the game ends. Therefore, if you decide to quit mid-game, don't forget to exhaust your lives. Once you are redirected to the game over screen your points will automatically be updated and stored. More info on this soon...",
    },
    {
      id: "difficult-faq",
      title: "How do difficulty settings work?",
      details: "More info on this soon...",
    },
    {
      id: "device-faq",
      title: "Will it work on smaller screens?",
      details: (
        <span>
          {" "}
          This page has been designed to be mobile responsive and should work on
          most, if not all, screen sizes. However, some functionality might be
          unfinished at this stage, or may not function due to something
          unaccounted for with your particular device. For example the "123/#+="
          key on mobile keypads will register as an invalid input when it
          shouldn't. Working on fixing such issues. Until this issue is fixed,
          you can play this game on very easy difficulty on smaller devices so
          that only numbers are displayed and you don't have to toggle between
          numbers and operators. Additionally, some features may work well on
          large screens but not on smaller screens. For example, simulated
          keyboard animations will be hidden on smaller screens due to the
          limited real-estate since the device keypad would obscure a portion of
          the screen when active. We try our best to account for various screen
          sizes and devices in order to ensure the best user experience
          possible. If you face any issues please feel free to contact us at{" "}
          <span>
            <Link
              className="text-sky-700 underline hover:text-sky-500"
              to="mailto:admin@freetypingcamp.com"
            >
              admin@freetypingcamp.com
            </Link>{" "}
          </span>
          with details about the device you are using, any feedback you may
          have, and screenshots as needed.
        </span>
      ),
    },
  ];

  return faqData;
}
