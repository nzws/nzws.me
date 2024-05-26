import { Dispatch, SetStateAction, useEffect } from "react";

type Action = Dispatch<SetStateAction<boolean>>;

export const useCmdk = (setIsOpened: Action) => {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && e.metaKey) {
        setIsOpened((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setIsOpened]);
};
