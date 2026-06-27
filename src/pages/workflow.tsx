import {
  addNode,
  deleteNode,
  onConnect,
  onEdgeChange,
  onNodeChange,
  selectNode,
} from "@/features/workflows/workflow.slice";
import { useAppSelector } from "@/store/store";
import { WorkflowNode } from "@/types/types";
import { cn } from "@/utils/cn";
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
import { useState } from "react";
import { useDispatch } from "react-redux";

export const WorkflowSpacePage = () => {
  const { edges, nodes, selectedNodesId } = useAppSelector(
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
                  data: {
                    nodeType: "trigger",
                    label: "Trigger added",
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
                  data: {
                    nodeType: "decision",
                    label: "Decision",
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
                  data: {
                    nodeType: "action",
                    label: "Decision",
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
                  data: {
                    nodeType: "delay",
                    label: "Decision",
                  },
                  position: { x: Math.random() * 400, y: Math.random() * 200 },
                }),
              );
            }}
          >
            Add Delay
          </button>
          <button
            className={cn(
              `bg-blue-400 cursor-pointer`,
              !selectedNodesId && "bg-neutral-500",
            )}
            onClick={() => {
              if (!selectedNodesId) return;
              dispatch(deleteNode(selectedNodesId));
            }}
          >
            DELETE NODE
          </button>
        </div>
        <Background />
        <Controls className="border border-neutral-300 bg-white" />
      </ReactFlowProvider>
    </div>
  );
};
