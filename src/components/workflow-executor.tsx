import { runWorkflow } from "@/lib/run-workflow";
import { validateWorkflow } from "@/lib/validate-workflow";
import { useAppSelector } from "@/store/store";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const WorkflowExecutor = () => {
  const { edges, nodes } = useAppSelector((state) => state.workflow);
  const dispatch = useDispatch();
  const handleRunWorkflow = () => {
    const result = validateWorkflow(nodes, edges);

    if (!result.isValid) {
      console.log(result.errors);
      toast(result.errors.join("\n")); // temporary UI
      return;
    }

    alert("Yeah now can runWORKFLOW");
    // if valid → start execution
    runWorkflow(nodes, edges, dispatch);
  };
  return (
    <div
      onClick={handleRunWorkflow}
      className="fixed top-10 bg-red-400 left-3 p-2"
    >
      Run workflow
    </div>
  );
};
