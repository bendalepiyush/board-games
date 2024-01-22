// utils/documentVisibility.ts

import { useState, useEffect } from "react";

type DocumentVisibilityState = "hidden" | "visible" | undefined;

const useDocumentVisibility = (): DocumentVisibilityState => {
  const [documentVisibility, setDocumentVisibility] =
    useState<DocumentVisibilityState>(() => {
      if (typeof document !== "undefined") {
        return document.visibilityState as DocumentVisibilityState;
      }
      return undefined;
    });

  const handleVisibilityChange = () => {
    if (typeof document !== "undefined") {
      setDocumentVisibility(
        document.visibilityState as DocumentVisibilityState
      );
    }
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      };
    }
  }, []);

  return documentVisibility;
};

export default useDocumentVisibility;
