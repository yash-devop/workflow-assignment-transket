import { NodeSettingsSheet } from "@/components/node-settings-sheet";
import { ActionNode } from "@/components/nodes/ActionNode";
import { DecisionNode } from "@/components/nodes/DecisionNode";
import { DelayNode } from "@/components/nodes/DelayNode";
import { TriggerNode } from "@/components/nodes/TriggerNode";
import { SaveProgress } from "@/components/save-progress";
import { Toaster } from "@/components/ui/sonner";
import { WorkflowExecutor } from "@/components/workflow-executor";
import {
  addNode,
  onConnect,
  onEdgeChange,
  onNodeChange,
  selectNode,
} from "@/features/workflows/workflow.slice";
import { usePersistWorkflow } from "@/hooks/usePersistWorkflow";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";
import { useAppSelector } from "@/store/store";
import { WorkflowNode } from "@/types/types";
import {
  Background,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  NodeChange,
  ReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useDispatch } from "react-redux";

const customNodes = {
  trigger: TriggerNode,
  action: ActionNode,
  decision: DecisionNode,
  delay: DelayNode,
};

export const WorkflowSpacePage = () => {
  const { edges, nodes, isDirty } = useAppSelector((state) => state.workflow);
  const dispatch = useDispatch();

  usePersistWorkflow();
  useUnsavedChanges();

  const handleNodeChange = (changes: NodeChange<WorkflowNode>[]) => {
    dispatch(onNodeChange(changes));
  };
  const handleEdgeChange = (changes: EdgeChange<Edge>[]) => {
    dispatch(onEdgeChange(changes));
  };

  const handleEdgeConnect = (params: Connection) => {
    // onConnect runs when you connect edges to nodes.
    dispatch(onConnect(params));
  };

  const addTrigger = () => {
    dispatch(
      addNode({
        id: `trigger-${crypto.randomUUID()}`,
        type: "trigger",
        data: {
          nodeType: "trigger",
          label: "Trigger Node",
          config: null,
        },
        position: {
          x: Math.random() * 400,
          y: Math.random() * 200,
        },
      }),
    );
  };
  const addDecision = () => {
    dispatch(
      addNode({
        id: `decision-${crypto.randomUUID()}`,
        type: "decision",
        data: {
          nodeType: "decision",
          label: "Decision Node",
          config: null,
        },
        position: {
          x: Math.random() * 400,
          y: Math.random() * 200,
        },
      }),
    );
  };

  const addAction = () => {
    dispatch(
      addNode({
        id: `action-${crypto.randomUUID()}`,
        type: "action",
        data: {
          nodeType: "action",
          label: "Action Node",
          config: null,
        },
        position: {
          x: Math.random() * 400,
          y: Math.random() * 200,
        },
      }),
    );
  };
  const addDelay = () => {
    dispatch(
      addNode({
        id: `delay-${crypto.randomUUID()}`,
        type: "delay",
        data: {
          nodeType: "delay",
          label: "Delay Node",
          config: null,
        },
        position: {
          x: Math.random() * 400,
          y: Math.random() * 200,
        },
      }),
    );
  };
  return (
    <div className="w-screen h-screen flex">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={customNodes}
          onNodesChange={handleNodeChange}
          onEdgesChange={handleEdgeChange}
          onConnect={handleEdgeConnect}
          onNodeClick={(e, node) => {
            console.log("cclicked", node.id);
            dispatch(selectNode(node.id));
          }}
          deleteKeyCode={"Delete"}
          fitView
        >
          <div className="fixed bottom-5 left-1/2 z-10 -translate-x-1/2">
            <div className="flex items-center gap-1 rounded-[14px] border border-neutral-200 bg-white p-1.5 shadow-md">
              {[
                {
                  label: "Trigger",
                  color: "#378ADD",
                  nodeType: "trigger",
                  onClick: addTrigger,
                },
                {
                  label: "Decision",
                  color: "#7F77DD",
                  nodeType: "decision",
                  onClick: addDecision,
                },
                {
                  label: "Action",
                  color: "#1D9E75",
                  nodeType: "action",
                  onClick: addAction,
                },
                {
                  label: "Delay",
                  color: "#BA7517",
                  nodeType: "delay",
                  onClick: addDelay,
                },
              ].map(({ label, color, onClick }) => (
                <button
                  key={label}
                  onClick={onClick}
                  className="flex items-center gap-2 rounded-[10px] px-3 py-1.5 text-sm font-medium text-neutral-800 transition hover:bg-neutral-100"
                >
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ background: color }}
                  />
                  {label}
                </button>
              ))}
            </div>
          </div>
          <Background />
          <Controls className="border border-neutral-300 bg-white" />
        </ReactFlow>
        <Toaster />
      </ReactFlowProvider>
      {/* <div className="w-[600px] bg-red-400 h-full">uo</div> */}
      <NodeSettingsSheet />
      <WorkflowExecutor />
      {isDirty && <SaveProgress />}
    </div>
  );
};
