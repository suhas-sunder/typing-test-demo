import { hexToCSSFilter } from "hex-to-css-filter";
import { useEffect } from "react";

type FilterProps = {
  hexColourCode: string;
  elementRef: HTMLDivElement | null;
};

function useHexToCSSFilter({ imgRef, divsRef, hexCodes }) {
  useEffect(() => {
    const filter = ({ hexColourCode, elementRef }: FilterProps) => {
      const cssFilter = hexToCSSFilter(hexColourCode);

      const filter = cssFilter.filter.split(";").join("");

      if (elementRef) elementRef.style.filter = filter;
    };

    const handleAddFilter = (index: number) => {
      filter({
        hexColourCode: hexCodes[index],
        elementRef: imgRef.current,
      });

      if (divsRef) {
        // Scale up colour pallet selection
        divsRef.current[index].style.transform = "scale(1.3,1.3)";

        // Scale down colour previous pallet selection
        if (index - 1 >= 0) {
          divsRef.current[index - 1].style.transform = "scale(1,1)";
        }

        if (index === 0) {
          divsRef.current[divsRef.current.length - 1].style.transform =
            "scale(1,1)";
        }
      }
    };

    let index: number = 1; //Starting index to cycle through colour pallet divs

    // highlight colour pallet and change image colour
    const timer = setInterval(() => {
      if (index >= 9) {
        index = 0;
      }
      handleAddFilter(index);
      index++;
    }, 4000);

    return () => {
      clearInterval(timer);
    };
  }, [divsRef, hexCodes, imgRef]);
}

export default useHexToCSSFilter;
