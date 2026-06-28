import { setCurrentExecutionNode } from "@/features/workflows/workflow.slice";
import { WorkflowNode } from "@/types/types";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { Edge } from "@xyflow/react";
import { toast } from "sonner";
import { getDelayTime } from "./delay-time";
import { evaluateDecision } from "./evaluate-decision";

export const runWorkflow = (
  nodes: WorkflowNode[],
  edges: Edge[],
  dispatch: Dispatch<UnknownAction>,
) => {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  console.log("nodeMap", Array.from(nodeMap));

  const graph: Record<string, Edge[]> = {};
  edges.forEach((edge) => {
    if (!graph[edge.source]) graph[edge.source] = [];
    graph[edge.source].push(edge);
  });

  console.log("graph", graph);

  let current = nodes.find((n) => n.type === "trigger");

  const step = () => {
    if (!current) return;

    if (current.data.nodeType === "action") {
      dispatch(setCurrentExecutionNode(current.id));
      console.log("Executing action:", current.data.config);

      setTimeout(() => {
        const actionEdges = graph[current!.id] || [];
        toast.success(
          `Workflow Action ${current!.data.config?.actionName} Completed `,
        );
        if (actionEdges.length === 0) {
          console.log(
            "Workflow completed at:",
            current!.data.config?.actionName,
          );

          dispatch(setCurrentExecutionNode(null));
          return;
        }

        const next = nodeMap.get(actionEdges[0].target);
        current = next || null;
        step();
      }, 500);

      return;
    }

    dispatch(setCurrentExecutionNode(current.id));

    setTimeout(() => {
      const outgoingEdges = graph[current!.id] || [];
      let nextEdge: Edge | null = null;

      if (current?.data.nodeType === "decision") {
        const result = evaluateDecision(current);
        nextEdge =
          outgoingEdges.find((e) =>
            result ? e.label === "TRUE" : e.label === "FALSE",
          ) ?? null;
      } else {
        nextEdge = outgoingEdges[0] || null;
      }

      if (!nextEdge) {
        toast("No outgoing edge from node");
        return;
      }

      const nextNode = nodeMap.get(nextEdge.target);

      if (!nextNode) {
        toast("Invalid next node");
        return;
      }

      if (nextNode.type === "delay") {
        dispatch(setCurrentExecutionNode(nextNode.id));

        const waitTime = getDelayTime(nextNode);
        const delayEdges = graph[nextNode.id] || [];
        const delayNextEdge = delayEdges[0];
        const nextAfterDelay = delayNextEdge
          ? nodeMap.get(delayNextEdge.target)
          : null;

        setTimeout(() => {
          current = nextAfterDelay ?? null;
          step();
        }, waitTime);

        return;
      }

      if (nextNode.data.nodeType === "action") {
        current = nextNode;
        step();
        return;
      }

      current = nextNode;
      step();
    }, 800);
  };

  step();
};
