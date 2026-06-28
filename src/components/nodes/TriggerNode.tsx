import { useAppSelector } from "@/store/store";
import { TriggerNodeData, WorkflowNode } from "@/types/types";
import { Handle, Position } from "@xyflow/react";

export function TriggerNode({ data, selected, id }: WorkflowNode) {
  const { currentNodeExecutionId } = useAppSelector((state) => state.workflow);
  const triggerData = data as TriggerNodeData;
  const isActiveExecution = id === currentNodeExecutionId;
  return (
    <div
      className={`min-w-[220px] rounded-xl border bg-white p-4 shadow-sm ${
        isActiveExecution
          ? "border-red-500"
          : selected
            ? "border-blue-500"
            : "border-slate-200"
      }`}
    >
      <Handle type="target" position={Position.Top} />

      <div className="mb-2 text-xs font-medium uppercase text-slate-500">
        Trigger
      </div>

      <div className="text-sm font-semibold text-slate-900">
        {triggerData.config?.name}
      </div>
      <div className="mt-1 text-xs text-slate-500">
        {triggerData.config?.description}
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
