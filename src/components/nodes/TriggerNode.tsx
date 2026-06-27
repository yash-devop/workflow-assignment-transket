import { TriggerNodeData, WorkflowNode } from "@/types/types";
import { Handle, Position } from "@xyflow/react";

export function TriggerNode({ data, selected }: WorkflowNode) {
  const triggerData = data as TriggerNodeData;
  return (
    <div
      className={`min-w-[220px] rounded-xl border bg-white p-4 shadow-sm ${
        selected ? "border-blue-500" : "border-slate-200"
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
