import { Edge, Node } from "@xyflow/react";

export type NodeType = "trigger" | "decision" | "delay" | "action";
export type WorkflowNodeData = {
  nodeType: NodeType;
  label: string;
};
export type WorkflowNode = Node<WorkflowNodeData>;

export type WorkflowStoreType = {
  nodes: WorkflowNode[];
  edges: Edge[];
  selectedNodesId: string | null;
};
