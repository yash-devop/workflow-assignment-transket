import { loadWorkflow } from "@/features/workflows/workflow.slice";
import { useAppSelector } from "@/store/store";
import { WorkflowStoreType } from "@/types/types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export function usePersistWorkflow() {
  const { isDirty } = useAppSelector((state) => state.workflow);

  const dispatch = useDispatch();

  useEffect(() => {
    const data = localStorage.getItem("workflow");

    if (!data) return;

    const workflow: Pick<WorkflowStoreType, "edges" | "nodes"> =
      JSON.parse(data);

    dispatch(loadWorkflow(workflow));

    toast("Workflow loaded successfully");
  }, []);
}
