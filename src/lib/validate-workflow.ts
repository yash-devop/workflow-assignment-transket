import { WorkflowNode } from "@/types/types";
import { Edge } from "@xyflow/react";

export function validateWorkflow(nodes: WorkflowNode[], edges: Edge[]) {
  const errors = [];

  const trigger = nodes.find((n) => n.type === "trigger");

  if (!trigger) {
    errors.push("Missing Trigger node");
    return { isValid: false, errors };
  }

  const graph: any = {};
  edges.forEach((edge) => {
    if (!graph[edge.source]) graph[edge.source] = [];
    graph[edge.source].push(edge.target);
  });

  const visited = new Set();
  const recursionStack = new Set();

  function dfs(nodeId: string) {
    if (recursionStack.has(nodeId)) return true;
    if (visited.has(nodeId)) return false;

    visited.add(nodeId);
    recursionStack.add(nodeId);

    for (let next of graph[nodeId] || []) {
      if (dfs(next)) return true;
    }

    recursionStack.delete(nodeId);
    return false;
  }

  if (dfs(trigger.id)) {
    errors.push("Cycle detected in workflow");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
