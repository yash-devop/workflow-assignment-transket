import { NodeSettingsSheet } from "@/components/node-settings-sheet";
import { ActionNode } from "@/components/nodes/ActionNode";
import { DecisionNode } from "@/components/nodes/DecisionNode";
import { DelayNode } from "@/components/nodes/DelayNode";
import { TriggerNode } from "@/components/nodes/TriggerNode";
import {
  addNode,
  deleteNode,
  onConnect,
  onEdgeChange,
  onNodeChange,
  selectNode,
} from "@/features/workflows/workflow.slice";
import { cn } from "@/lib/utils";
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
  const { edges, nodes, selectedNodeId } = useAppSelector(
    (state) => state.workflow,
  );

  const dispatch = useDispatch();

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

  return (
    <div className="w-screen h-screen">
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
          fitView
        />

        <div className="fixed top-0 space-x-4">
          <button
            className="bg-red-400 "
            onClick={() => {
              dispatch(
                addNode({
                  id: crypto.randomUUID(),
                  type: "trigger",
                  data: {
                    nodeType: "trigger",
                    label: "Trigger Node",
                    config: null,
                  },
                  position: { x: Math.random() * 400, y: Math.random() * 200 },
                }),
              );
            }}
          >
            ADD Trigger
          </button>
          <button
            className="bg-red-400"
            onClick={() => {
              dispatch(
                addNode({
                  id: crypto.randomUUID(),
                  type: "decision",
                  data: {
                    nodeType: "decision",
                    label: "Decision Node",
                    config: null,
                  },
                  position: { x: Math.random() * 400, y: Math.random() * 200 },
                }),
              );
            }}
          >
            Add Decision
          </button>
          <button
            className="bg-red-400"
            onClick={() => {
              dispatch(
                addNode({
                  id: crypto.randomUUID(),
                  type: "action",
                  data: {
                    nodeType: "action",
                    label: "Action Node",
                    config: null,
                  },
                  position: { x: Math.random() * 400, y: Math.random() * 200 },
                }),
              );
            }}
          >
            Add Action
          </button>
          <button
            className="bg-red-400"
            onClick={() => {
              dispatch(
                addNode({
                  id: crypto.randomUUID(),
                  type: "delay",
                  data: {
                    nodeType: "delay",
                    label: "Delay Node",

                    config: null,
                  },
                  position: { x: Math.random() * 400, y: Math.random() * 200 },
                }),
              );
            }}
          >
            Add Delay
          </button>
        </div>
        <Background />
        <Controls className="border border-neutral-300 bg-white" />
      </ReactFlowProvider>
      <NodeSettingsSheet />
    </div>
  );
};
