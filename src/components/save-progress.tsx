import { useAppSelector } from "@/store/store";
import { Button } from "./ui/button";
import { saveWorkflow } from "@/features/workflows/workflow.slice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const SaveProgress = () => {
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(saveWorkflow());
    toast.success("Workflow saved successfully!");
  };
  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 border border-yellow-500 p-4 flex flex-col gap-3 bg-yellow-50 items-center select-none">
      <span className="text-xs text-yellow-700">
        Save your progress so you can continue later.
      </span>
      <Button
        className="w-fit bg-yellow-500 hover:bg-yellow-600 cursor-pointer"
        onClick={handleSave}
      >
        Save Progress
      </Button>
    </div>
  );
};
