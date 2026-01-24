import React from "react";
import { RouterProvider } from "react-router";
import { Router } from "./router/RouterBase";
function App() {
  return (
    <>
      <RouterProvider router={Router}></RouterProvider>
    </>
  );
}

export default App;
