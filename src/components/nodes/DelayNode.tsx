import { Handle, Position } from "@xyflow/react";
import { DelayNodeData, WorkflowNode } from "@/types/types";

export function DelayNode({ data, selected }: WorkflowNode) {
  const delayData = data as DelayNodeData;

  return (
    <div
      className={`min-w-[220px] rounded-xl border bg-white p-4 shadow-sm ${
        selected ? "border-blue-500" : "border-slate-200"
      }`}
    >
      <Handle type="target" position={Position.Top} />

      <div className="mb-2 text-xs font-medium uppercase text-slate-500">
        Delay
      </div>

      <div className="text-sm font-semibold text-slate-900">
        {delayData.config?.duration} {delayData.config?.unit}
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
