import { Edge, Node } from "@xyflow/react";

export type NodeType = "trigger" | "decision" | "delay" | "action";

type BaseType = {
  label: string;
};

export type TriggerDataConfig = {
  name: string;
  description: string;
};

export type DecisionDataConfig = {
  field: string;
  operator: string;
  value: string;
};

export type DelayDataConfig = {
  duration: number;
  unit: string;
};

export type ActionDataConfig = {
  actionName: string;
  parameters: string;
};

export type TriggerNodeData = BaseType & {
  nodeType: "trigger";
  config: TriggerDataConfig | null;
};

export type DecisionNodeData = BaseType & {
  nodeType: "decision";
  config: DecisionDataConfig | null;
};

export type DelayNodeData = BaseType & {
  nodeType: "delay";
  config: DelayDataConfig | null;
};

export type ActionNodeData = BaseType & {
  nodeType: "action";
  config: ActionDataConfig | null;
};

export type WorkflowNodeData =
  | TriggerNodeData
  | DecisionNodeData
  | DelayNodeData
  | ActionNodeData;

export type WorkflowNode = Node<WorkflowNodeData>;

export type WorkflowStoreType = {
  nodes: WorkflowNode[];
  edges: Edge[];
  selectedNodeId: string | null;
};
