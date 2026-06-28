import { DecisionDataConfig, WorkflowNode } from "@/types/types";

export const evaluateDecision = (node: WorkflowNode) => {
  const config = node.data.config as DecisionDataConfig;

  const { field, operator, value } = config;
  const mockContext: Record<string, string> = {
    userType: "premium",
  };

  const left = mockContext[field] ?? "";

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
