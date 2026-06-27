import { WorkflowNode, WorkflowStoreType } from "@/types/types";
import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  NodeChange,
} from "@xyflow/react";

const initialState: WorkflowStoreType = {
  nodes: [
    {
      id: "n1",
      type: "trigger", // this type is related to our custom node rendering.
      data: {
        nodeType: "trigger", // i created this code level logics rendering.
        label: "Trigger Node Label 1",
        config: {
          name: "Trigger 1",
          description: "This is my trigger 1",
        },
      },
      position: { x: 100, y: 140 },
    },
    {
      id: "n2",
      type: "decision",
      data: {
        nodeType: "decision",
        label: "Decision Node label 2",
        config: {
          field: "userType",
          operator: "==",
          value: "premium",
        },
      },
      position: { x: 370, y: 140 },
    },
  ],
  edges: [
    {
      id: "n1-n2",
      source: "n1",
      target: "n2",
      label: "Edge Label 1",
    },
  ],
  selectedNodeId: null,
};
const workflowSlice = createSlice({
  initialState,
  name: "workflow-slice",
  reducers: {
    // crud nodes:

    addNode: (state, action: PayloadAction<WorkflowNode>) => {
      // used to add node
      state.nodes.push(action.payload);
    },
    deleteNode: (state, action: PayloadAction<WorkflowNode["id"]>) => {
      // when i click on DELETE node , that node gets deleted.
      const nodeId = action.payload;
      state.nodes = state.nodes.filter((node) => node.id !== nodeId);
      state.edges = state.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId,
      );
      state.selectedNodeId = null;
    },

    selectNode: (state, action: PayloadAction<string | null>) => {
      // when i click on any of the node , that node becomes my selected one
      state.selectedNodeId = action.payload;
    },

    updateNode: (
      state,
      action: PayloadAction<{
        id: string;
        config: any;
      }>,
    ) => {
      const node = state.nodes.find((node) => node.id === action.payload.id);

      if (node) {
        node.data.config = {
          ...node.data.config,
          ...action.payload.config,
        };
      }

      state.selectedNodeId = null;
    },

    // change nodes:
    onNodeChange: (
      state,
      action: PayloadAction<NodeChange<WorkflowNode>[]>,
    ) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes);
    },

    onEdgeChange: (state, action: PayloadAction<EdgeChange<Edge>[]>) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    onConnect: (state, action: PayloadAction<Connection>) => {
      state.edges = addEdge(action.payload, state.edges);
    },
  },
});

export const {
  onNodeChange,
  onEdgeChange,
  onConnect,
  addNode,
  deleteNode,
  selectNode,
  updateNode,
} = workflowSlice.actions;

export const WorkflowReducer = workflowSlice.reducer;
