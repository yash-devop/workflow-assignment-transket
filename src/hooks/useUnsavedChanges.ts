import { useAppSelector } from "@/store/store";
import { useEffect } from "react";

export const useUnsavedChanges = () => {
  const { isDirty } = useAppSelector((state) => state.workflow);

  useEffect(() => {
    // load the saved workflow
    const handleUnsaveChange = (e: BeforeUnloadEvent) => {
      if (!isDirty) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleUnsaveChange);
    return () => {
      window.removeEventListener("beforeunload", handleUnsaveChange);
    };
  }, [isDirty]);
};
