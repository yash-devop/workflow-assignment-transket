import { selectNode, updateNode } from "@/features/workflows/workflow.slice";
import { DelayDataConfig, WorkflowNode } from "@/types/types";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SheetHeader, SheetTitle } from "../ui/sheet";

export const DelayNodeSettingsForm = ({ node }: { node: WorkflowNode }) => {
  if (node.data.nodeType !== "delay") {
    return null;
  }

  const [formData, setFormData] = useState<DelayDataConfig>({
    duration: node.data.config?.duration ?? 0,
    unit: node.data.config?.unit ?? "",
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
        <SheetTitle>Delay Node Configuration</SheetTitle>
      </SheetHeader>
      <form onSubmit={handleSave} className="flex flex-col pt-8 gap-y-4">
        <div className="space-y-2">
          <Label>Duration</Label>

          <Input
            type="number"
            placeholder="Enter duration"
            value={formData.duration}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                duration: Number(e.target.value),
              }));
            }}
          />
        </div>

        <div className="space-y-2">
          <Label>Unit</Label>

          <Input
            placeholder="seconds / minutes / hours"
            value={formData.unit}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                unit: e.target.value,
              }));
            }}
          />
        </div>

        <Button type="submit">Save</Button>
      </form>
    </div>
  );
};
