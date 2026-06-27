import { Handle, Position } from "@xyflow/react";
import { ActionNodeData, WorkflowNode } from "@/types/types";

export function ActionNode({ data, selected }: WorkflowNode) {
  const actionData = data as ActionNodeData;

  return (
    <div
      className={`min-w-[220px] rounded-xl border bg-white p-4 shadow-sm ${
        selected ? "border-blue-500" : "border-slate-200"
      }`}
    >
      <Handle type="target" position={Position.Top} />

      <div className="mb-2 text-xs font-medium uppercase text-slate-500">
        Action
      </div>

      <div className="text-sm font-semibold text-slate-900">
        {actionData.config?.actionName}
      </div>

      <div className="mt-1 text-xs text-slate-500">
        {actionData.config?.parameters}
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
