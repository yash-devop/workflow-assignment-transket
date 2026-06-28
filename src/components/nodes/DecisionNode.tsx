import { NODE_ACTIVE_STAGE } from "@/constants";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/store";
import { DecisionNodeData, WorkflowNode } from "@/types/types";
import { Handle, Position } from "@xyflow/react";

export function DecisionNode({ data, selected, id }: WorkflowNode) {
  const { currentNodeExecutionId } = useAppSelector((state) => state.workflow);

  const decisionData = data as DecisionNodeData;
  const isActiveExecution = id === currentNodeExecutionId;

  return (
    <div
      className={cn(
        `ring ring-neutral-400 min-w-64 max-w-6min-w-64 shadow-sm shadow-neutral-400 bg-white`,
        isActiveExecution && NODE_ACTIVE_STAGE.active,
      )}
    >
      <Handle type="target" position={Position.Top} />
      <div
        className={cn(
          `font-mono text-xs uppercase flex justify-between items-center border-neutral-300 py-3 px-2 bg-neutral-100`,
          decisionData.config?.operator && "border-b",
          isActiveExecution
            ? NODE_ACTIVE_STAGE.active
            : selected
              ? NODE_ACTIVE_STAGE.select
              : "",
        )}
      >
        <span className="text-neutral-500 font-medium">Decision</span>
      </div>
      <Handle type="target" position={Position.Top} />
      <div className="pt-3 pb-5 px-2 grid grid-cols-3 ">
        <div className="flex flex-col text-xs">
          <span className="font-mono text-neutral-500">Field</span>
          <span className="text-black font-medium text-sm">
            {decisionData.config?.field}
          </span>
        </div>
        <div className="flex flex-col text-xs">
          <span className="font-mono text-neutral-500">Operator</span>
          <span className="text-black font-medium text-sm pl-1">
            {decisionData.config?.operator}
          </span>
        </div>
        <div className="flex flex-col text-xs">
          <span className="font-mono text-neutral-500">Value</span>
          <span className="text-black font-medium text-sm">
            {decisionData.config?.value}
          </span>
        </div>
      </div>
      <div className=" absolute bottom-0 right-10">
        <Handle type="source" position={Position.Bottom} id="false" />
      </div>
      <div className="absolute bottom-0 left-10">
        <Handle type="source" position={Position.Bottom} id="true" />
      </div>
    </div>
  );
}
