import { WorkflowReducer } from "@/features/workflows/workflow.slice";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    workflow: WorkflowReducer,
  },
});

export type RootStoreType = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootStoreType> = useSelector;
