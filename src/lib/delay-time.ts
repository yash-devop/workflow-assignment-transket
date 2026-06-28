import { DelayDataConfig, WorkflowNode } from "@/types/types";

export const getDelayTime = (node: WorkflowNode) => {
  const config = node.data.config as DelayDataConfig;

  const { unit, duration } = config;

  if (unit.toLowerCase() === "seconds") return duration * 1000;
  if (unit.toLowerCase() === "minutes") return duration * 60 * 1000;

  return duration; // ms
};
