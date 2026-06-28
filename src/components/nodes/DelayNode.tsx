import { Handle, Position } from "@xyflow/react";
import { DelayNodeData, WorkflowNode } from "@/types/types";
import { useAppSelector } from "@/store/store";
import { NODE_ACTIVE_STAGE } from "@/constants";
import { cn } from "@/lib/utils";

export function DelayNode({ data, selected, id }: WorkflowNode) {
  const delayData = data as DelayNodeData;
  const { currentNodeExecutionId } = useAppSelector((state) => state.workflow);

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
          `font-mono text-xs  flex items-center justify-between border-neutral-300 py-3 px-2 bg-neutral-100`,
          isActiveExecution && NODE_ACTIVE_STAGE.active,
        )}
      >
        <span className="text-neutral-500 font-medium uppercase">DELAY</span>
        <h2 className="text-xs text-neutral-500">
          {delayData.config && "~"}
          <span className="text-black font-semibold font-sans text-sm pr-0.5">
            {delayData.config?.duration}
          </span>
          {delayData.config?.unit === "seconds"
            ? "sec"
            : delayData.config?.unit === "minutes"
              ? "min"
              : "ms"}
        </h2>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
