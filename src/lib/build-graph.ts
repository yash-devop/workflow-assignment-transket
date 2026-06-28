import { Edge } from "@xyflow/react";

export const buildGraph = (edges: Edge[]) => {
  const graph: any = {};

  edges.forEach((edge) => {
    if (!graph[edge.source]) {
      graph[edge.source] = [];
    }

    graph[edge.source].push(edge);
  });

  return graph;
};
