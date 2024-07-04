import { useEffect, useRef } from "react";
import useMouseEnter from "../hooks/useMouseEnter";
import Icon from "../../utils/other/Icon";
import styles from "./styles/SparkleAnim.module.css";

interface PropType {
  children: React.ReactNode;
}

// Used by ProfileImageLink.tsx,
function SparkleAnim({ children }: PropType) {
  const elementRef = useRef<HTMLDivElement>(null); //Keep track of mouse over event
  const [isHovered] = useMouseEnter({ elementRef });

  // Add random values to css variable stored in module.css (styles)
  useEffect(() => {
    if (isHovered) {
      const elements = document.getElementsByClassName(
        styles.sparkle,
      ) as HTMLCollectionOf<HTMLElement>;

      Array.from(elements)?.forEach((element) => {
        const randomAnimationTime =
          (Math.random() * 1.6 + 0.7).toString() + "s";
        const randomScaleMin = (Math.random() * 0.2 + 0.3).toString();
        const randomScaleMax = (
          Math.random() * 0.6 +
          parseInt(randomScaleMin) +
          0.5
        ).toString();

        element.style.setProperty("--animation-timer", randomAnimationTime);
        element.style.setProperty("--initial-scale", randomScaleMin);
        element.style.setProperty("--final-scale", randomScaleMax);
      });
    }
  }, [isHovered]);

  return (
    <div
      ref={elementRef}
      id="sparkle-animation"
      className={`${styles["sparkle-wrapper"]} relative flex`}
    >
      <div className={`${styles.sparkle} absolute -left-10 text-sky-500`}>
        <Icon icon="sparkle" title="sparkle star" customStyle="" />
      </div>
      <div className={`${styles.sparkle} absolute -top-12 text-sky-500`}>
        <Icon icon="sparkle" title="sparkle star" customStyle="" />
      </div>
      <div
        className={`${styles.sparkle} absolute -left-14 -top-14 text-sky-500`}
      >
        <Icon icon="sparkle" title="sparkle star" customStyle="" />
      </div>
      <div
        className={`${styles.sparkle} absolute -bottom-0 -left-10 text-sky-500`}
      >
        <Icon icon="sparkle" title="sparkle star" customStyle="" />
      </div>
      <div className={`${styles.sparkle} absolute -bottom-12 text-sky-500`}>
        <Icon icon="sparkle" title="sparkle star" customStyle="" />
      </div>
      <div
        className={`${styles.sparkle} absolute -bottom-14 -left-14 text-sky-500`}
      >
        <Icon icon="sparkle" title="sparkle star" customStyle="" />
      </div>

      <div className={`${styles.sparkle} absolute -right-10 text-sky-500`}>
        <Icon icon="sparkle" title="sparkle star" customStyle="" />
      </div>
      <div
        className={`${styles.sparkle} absolute -top-12  right-0 text-sky-500`}
      >
        <Icon icon="sparkle" title="sparkle star" customStyle="" />
      </div>
      <div
        className={`${styles.sparkle} absolute -right-14 -top-14 text-sky-500`}
      >
        <Icon icon="sparkle" title="sparkle star" customStyle="" />
      </div>

      <div
        className={`${styles.sparkle} absolute -right-10 bottom-0 text-sky-500`}
      >
        <Icon icon="sparkle" title="sparkle star" customStyle="" />
      </div>
      <div
        className={`${styles.sparkle} absolute -bottom-12 right-0 text-sky-500`}
      >
        <Icon icon="sparkle" title="sparkle star" customStyle="" />
      </div>
      <div
        className={`${styles.sparkle} absolute -bottom-14 -right-14 text-sky-500`}
      >
        <Icon icon="sparkle" title="sparkle star" customStyle="" />
      </div>
      {children}
    </div>
  );
}

export default SparkleAnim;
