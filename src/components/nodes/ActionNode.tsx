import { NODE_ACTIVE_STAGE } from "@/constants";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/store";
import { ActionNodeData, WorkflowNode } from "@/types/types";
import { Handle, Position } from "@xyflow/react";

export function ActionNode({ data, selected, id }: WorkflowNode) {
  const actionData = data as ActionNodeData;
  const { currentNodeExecutionId } = useAppSelector((state) => state.workflow);

  const isActiveExecution = id === currentNodeExecutionId;

  return (
    <div
      className={cn(
        "ring ring-neutral-400 min-w-52 max-w-52 shadow-sm shadow-neutral-400 bg-white transition-all",
        isActiveExecution && NODE_ACTIVE_STAGE.active,
        selected && "ring-2 ring-blue-500 shadow-md shadow-blue-200",
      )}
    >
      <Handle type="target" position={Position.Top} />

      <div
        className={cn(
          "font-mono text-xs uppercase flex items-center justify-between border-neutral-300 py-3 px-2 bg-neutral-100 border-b",
          isActiveExecution && NODE_ACTIVE_STAGE.active,
          selected && "bg-blue-50",
        )}
      >
        <span className="text-neutral-500 font-medium">Action</span>
        <span className="text-black font-medium">
          {actionData.config?.actionName}
        </span>
      </div>

      {actionData.config?.parameters && (
        <div className="py-3 px-2 text-sm text-neutral-500 min-w-0 truncate">
          <span>{actionData.config.parameters}</span>
        </div>
      )}

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
