import { NODE_ACTIVE_STAGE } from "@/constants";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/store";
import { TriggerNodeData, WorkflowNode } from "@/types/types";
import { Handle, Position } from "@xyflow/react";

export function TriggerNode({ data, selected, id }: WorkflowNode) {
  const { currentNodeExecutionId } = useAppSelector((state) => state.workflow);
  const triggerData = data as TriggerNodeData;
  const isActiveExecution = id === currentNodeExecutionId;
  return (
    <div
      className={cn(
        `ring ring-neutral-400 min-w-52 max-w-52 shadow-sm shadow-neutral-400 bg-white`,
        isActiveExecution && NODE_ACTIVE_STAGE.active,
      )}
    >
      <Handle type="target" position={Position.Top} />
      <div
        className={cn(
          `font-mono text-xs uppercase flex items-center justify-between border-neutral-300 py-3 px-2 bg-neutral-100`,
          triggerData.config?.description && "border-b",
          isActiveExecution && NODE_ACTIVE_STAGE.active,
        )}
      >
        <span className="text-neutral-500 font-medium">Trigger</span>
        <span className="text-black font-medium">
          {triggerData.config?.name}
        </span>
      </div>
      {triggerData.config?.description && (
        <div className="py-3 px-2 text-sm text-neutral-500 min-w-0 truncate">
          <span className="">{triggerData.config?.description}</span>
        </div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
