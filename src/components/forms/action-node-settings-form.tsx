import { selectNode, updateNode } from "@/features/workflows/workflow.slice";
import { ActionDataConfig, WorkflowNode } from "@/types/types";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SheetHeader, SheetTitle } from "../ui/sheet";

export const ActionNodeSettingsForm = ({ node }: { node: WorkflowNode }) => {
  if (node.data.nodeType !== "action") {
    return null;
  }

  const [formData, setFormData] = useState<ActionDataConfig>({
    actionName: node.data.config?.actionName ?? "",
    parameters: node.data.config?.parameters ?? "",
  });

  const dispatch = useDispatch();

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      updateNode({
        id: node.id,
        config: formData,
      }),
    );

    dispatch(selectNode(null));
  };

  return (
    <div className="">
      <SheetHeader>
        <SheetTitle>Action Node Configuration</SheetTitle>
      </SheetHeader>

      <form onSubmit={handleSave} className="flex flex-col pt-8 gap-y-4">
        <div className="space-y-2">
          <Label>Action Name</Label>

          <Input
            placeholder="Enter action name"
            value={formData.actionName}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                actionName: e.target.value,
              }));
            }}
          />
        </div>

        <div className="space-y-2">
          <Label>Parameters</Label>

          <Input
            placeholder="Enter parameters"
            value={formData.parameters}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                parameters: e.target.value,
              }));
            }}
          />
        </div>

        <Button type="submit">Save</Button>
      </form>
    </div>
  );
};
