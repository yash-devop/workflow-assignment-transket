import { runWorkflow } from "@/lib/run-workflow";
import { validateWorkflow } from "@/lib/validate-workflow";
import { useAppSelector } from "@/store/store";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const WorkflowExecutor = () => {
  const { edges, nodes } = useAppSelector((state) => state.workflow);
  const dispatch = useDispatch();
  const handleRunWorkflow = () => {
    toast.success("Workflow started");
    const result = validateWorkflow(nodes, edges);

    if (!result.isValid) {
      console.log(result.errors);
      toast(result.errors.join("\n"));
      return;
    }

    runWorkflow(nodes, edges, dispatch);
  };
  return (
    <div
      onClick={handleRunWorkflow}
      className="fixed bottom-5.5 bg-blue-50 border border-blue-500 text-blue-500 left-1/2 z-10 translate-x-52 py-2 px-4 select-none cursor-pointer rounded-[10px] active:scale-[0.98] text-sm"
    >
      Run workflow
    </div>
  );
};
