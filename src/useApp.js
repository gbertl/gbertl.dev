import {useEffect} from "react";
import {generateOverlayEffect} from "./components/overlayEffect";

export const useApp = ({isLoading, setIsLoading}) => {
  useEffect(() => {
    window.addEventListener("load", () => {
      setIsLoading(false);
    });

    const bgAnimationItems = () => {
      const rows = 7,
        cols = 10;

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const div = document.createElement("div");
          div.className = `col-${j + 1}`;
          document.querySelector(".bg-animation-effect").appendChild(div);
        }
      }
    };

    bgAnimationItems();

    generateOverlayEffect();
  }, []);
};
