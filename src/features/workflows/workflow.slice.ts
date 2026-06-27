import { WorkflowNode, WorkflowStoreType } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
      data: {
        nodeType: "trigger",
        label: "Trigger Node Label 1",
      },
      position: { x: 100, y: 140 },
    },
    {
      id: "n2",
      data: {
        nodeType: "decision",
        label: "Decision Node label 2",
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
  selectedNodesId: null,
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
      state.selectedNodesId = null;
    },

    selectNode: (state, action: PayloadAction<string>) => {
      // when i click on any of the node , that node becomes my selected one
      state.selectedNodesId = action.payload;
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
} = workflowSlice.actions;

export const WorkflowReducer = workflowSlice.reducer;
