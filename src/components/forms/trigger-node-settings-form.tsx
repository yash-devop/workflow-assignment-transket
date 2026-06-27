import { selectNode, updateNode } from "@/features/workflows/workflow.slice";
import { TriggerDataConfig, WorkflowNode } from "@/types/types";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SheetHeader, SheetTitle } from "../ui/sheet";

export const TriggerNodeSettingsForm = ({ node }: { node: WorkflowNode }) => {
  if (node.data.nodeType !== "trigger") {
    return null;
  }
  const [formData, setFormData] = useState<TriggerDataConfig>({
    name: node.data.config?.name ?? "",
    description: node.data.config?.description ?? "",
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
        <SheetTitle>Trigger Node Configuration</SheetTitle>
      </SheetHeader>
      <form onSubmit={handleSave} className="flex flex-col pt-8 gap-y-4">
        <div className="space-y-2">
          <Label>Name</Label>
          <Input
            name="name"
            placeholder="Enter node name"
            value={formData.name}
            onChange={(e) => {
              setFormData((prev) => {
                return {
                  ...prev,
                  name: e.target.value,
                };
              });
            }}
          />
        </div>
        <div className="space-y-2">
          <Label>Name</Label>
          <Input
            name="description"
            placeholder="Enter node description"
            value={formData.description}
            onChange={(e) => {
              setFormData((prev) => {
                return {
                  ...prev,
                  description: e.target.value,
                };
              });
            }}
          />
        </div>
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
};
