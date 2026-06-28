import { CONTEXT } from "@/constants";
import { DecisionDataConfig, WorkflowNode } from "@/types/types";

export const evaluateDecision = (node: WorkflowNode) => {
  const config = node.data.config as DecisionDataConfig;

  const { field, operator, value } = config;
  const left = CONTEXT[field] ?? ""; // ASSUMPTION , this context will come from api data.

  switch (operator) {
    case "==":
      return left == value;

    case "!=":
      return left != value;

    case ">":
      return left > value;

    case "<":
      return left < value;

    default:
      return false;
  }
};
