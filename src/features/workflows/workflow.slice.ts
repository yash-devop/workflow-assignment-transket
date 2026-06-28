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
  edges: [],
  selectedNodeId: null,
  isDirty: false,
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
      const userDrivenChangeTypes = ["position", "remove", "reset"];

      console.log("action.payload", action.payload);
      const hasUserDrivenChange = action.payload.some((change) =>
        userDrivenChangeTypes.includes(change.type),
      );

      if (hasUserDrivenChange) {
        state.isDirty = true;
      }
      state.nodes = applyNodeChanges(action.payload, state.nodes);
    },

    onEdgeChange: (state, action: PayloadAction<EdgeChange<Edge>[]>) => {
      const userDrivenChangeTypes = ["remove", "select", "reset"];
      const hasUserDrivenChange = action.payload.some((change) =>
        userDrivenChangeTypes.includes(change.type),
      );

      if (hasUserDrivenChange) {
        state.isDirty = true;
      }

      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    onConnect: (state, action: PayloadAction<Connection>) => {
      const connection = action.payload;
      const newEdge = {
        ...connection,
        id: `${connection.source}-${connection.target}`,
        label:
          connection.sourceHandle === "true"
            ? "TRUE"
            : connection.sourceHandle === "false"
              ? "FALSE"
              : undefined,
      };
      state.isDirty = true;
      state.edges = addEdge(newEdge, state.edges as any);
    },

    // persist the workfow data:

    saveWorkflow: (state) => {
      const workflow = {
        nodes: state.nodes,
        edges: state.edges,
      };

      localStorage.setItem("workflow", JSON.stringify(workflow));

      state.isDirty = false;
    },
    loadWorkflow: (
      state,
      action: PayloadAction<Pick<WorkflowStoreType, "edges" | "nodes">>,
    ) => {
      state.nodes = action.payload.nodes;
      state.edges = action.payload.edges;
    },
    setCurrentExecutionNode: (state, action) => {
      state.currentNodeExecutionId = action.payload;
    },
    startExecution: (state) => {
      state.isRunning = true;
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
  saveWorkflow,
  loadWorkflow,
  setCurrentExecutionNode,
  startExecution,
} = workflowSlice.actions;

export const WorkflowReducer = workflowSlice.reducer;
