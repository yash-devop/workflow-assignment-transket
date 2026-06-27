import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { deleteNode, selectNode } from "@/features/workflows/workflow.slice";
import { useAppSelector } from "@/store/store";
import { useDispatch } from "react-redux";
import { TriggerNodeSettingsForm } from "./forms/trigger-node-settings-form";
import { DecisionNodeSettingsForm } from "./forms/decision-node-settings-form";
import { ActionNodeSettingsForm } from "./forms/action-node-settings-form";
import { DelayNodeSettingsForm } from "./forms/delay-node-settings-form";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export const NodeSettingsSheet = () => {
  const { selectedNodeId, nodes } = useAppSelector((state) => state.workflow);

  const dispatch = useDispatch();

  const selectedNode = nodes.find((node) => node.id === selectedNodeId);
  return (
    <Sheet
      open={!!selectedNodeId}
      onOpenChange={() => {
        dispatch(selectNode(null));
      }}
    >
      <SheetContent className="px-4">
        {selectedNode?.data.nodeType === "trigger" && (
          <TriggerNodeSettingsForm node={selectedNode} />
        )}
        {selectedNode?.data.nodeType === "decision" && (
          <DecisionNodeSettingsForm node={selectedNode} />
        )}
        {selectedNode?.data.nodeType === "action" && (
          <ActionNodeSettingsForm node={selectedNode} />
        )}
        {selectedNode?.data.nodeType === "delay" && (
          <DelayNodeSettingsForm node={selectedNode} />
        )}
        {selectedNode && (
          <Button
            className="w-full mt-2"
            variant="destructive"
            onClick={() => {
              if (!selectedNodeId) return;

              dispatch(deleteNode(selectedNodeId));
              dispatch(selectNode(null));
            }}
          >
            Delete Node
          </Button>
        )}
      </SheetContent>
    </Sheet>
  );
};
