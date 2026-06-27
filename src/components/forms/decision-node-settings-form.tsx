import { selectNode, updateNode } from "@/features/workflows/workflow.slice";
import { DecisionDataConfig, WorkflowNode } from "@/types/types";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SheetHeader, SheetTitle } from "../ui/sheet";

export const DecisionNodeSettingsForm = ({ node }: { node: WorkflowNode }) => {
  if (node.data.nodeType !== "decision") {
    return null;
  }

  const [formData, setFormData] = useState<DecisionDataConfig>({
    field: node.data.config?.field ?? "",
    operator: node.data.config?.operator ?? "",
    value: node.data.config?.value ?? "",
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
        <SheetTitle>Decision Node Configuration</SheetTitle>
      </SheetHeader>

      <form onSubmit={handleSave} className="flex flex-col pt-8 gap-y-4">
        <div className="space-y-2">
          <Label>Field</Label>

          <Input
            name="field"
            placeholder="Enter field name"
            value={formData.field}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                field: e.target.value,
              }));
            }}
          />
        </div>

        <div className="space-y-2">
          <Label>Operator</Label>

          <Input
            name="operator"
            placeholder="Enter operator (equals, contains...)"
            value={formData.operator}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                operator: e.target.value,
              }));
            }}
          />
        </div>

        <div className="space-y-2">
          <Label>Value</Label>

          <Input
            name="value"
            placeholder="Enter comparison value"
            value={formData.value}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                value: e.target.value,
              }));
            }}
          />
        </div>

        <Button type="submit">Save</Button>
      </form>
    </div>
  );
};
