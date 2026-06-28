import { setCurrentExecutionNode } from "@/features/workflows/workflow.slice";
import { WorkflowNode } from "@/types/types";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { Edge } from "@xyflow/react";
import { buildGraph } from "./build-graph";

export const runWorkflow = (
  nodes: WorkflowNode[],
  edges: Edge[],
  dispatch: Dispatch<UnknownAction>,
) => {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  const graph = buildGraph(edges);

  let current = nodes.find((n) => n.type === "trigger");

  const step = () => {
    if (!current) return;

    // 1. highlight current node in UI
    dispatch(setCurrentExecutionNode(current.id));

    // 2. wait a bit (visual effect)
    setTimeout(() => {
      const outgoingEdges = graph[current.id] || [];

      const nextEdge = outgoingEdges[0]; // TEMP: first path only

      if (!nextEdge) return;

      current = nodeMap.get(nextEdge.target);

      step();
    }, 800);
  };

  step();
};
