import { useEffect } from "react";

// Remove completed rows of text when screen is resized. Used by Textbox.tsx
export default function useRemoveRowsOnResize(handleRemoveRows) {
  useEffect(() => {
    // Add delay to resize event since we only need to reset rows once resizing is complete.
    let resizeTimer: ReturnType<typeof setTimeout>;
    window.onresize = function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleRemoveRows, 100);
    };

    // Cleanup function
    return () => {
      clearTimeout(resizeTimer);
      window.onresize = null;
    };
  }, [handleRemoveRows]);
}
