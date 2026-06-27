import { DecisionNodeData, WorkflowNode } from "@/types/types";
import { Handle, Position } from "@xyflow/react";

export function DecisionNode({ data, selected }: WorkflowNode) {
  const decisionData = data as DecisionNodeData;
  return (
    <div
      className={`min-w-[220px] rounded-xl border bg-white p-4 shadow-sm ${
        selected ? "border-blue-500" : "border-slate-200"
      }`}
    >
      <Handle type="target" position={Position.Top} />

      <div className="mb-2 text-xs font-medium uppercase text-slate-500">
        DECISION
      </div>

      <div className="text-sm font-semibold text-slate-900">
        {decisionData.config?.field}
      </div>
      <div className="mt-1 text-xs text-slate-500">
        {decisionData.config?.operator}&{decisionData.config?.value}
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
