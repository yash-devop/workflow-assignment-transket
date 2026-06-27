import { Provider as ToolkitProvider } from "react-redux";
import { RouterProvider } from "react-router";
import { Toaster } from "./components/ui/sonner";
import { Router } from "./router/RouterBase";
import { store } from "./store/store";
function App() {
  return (
    <>
      <ToolkitProvider store={store}>
        <RouterProvider router={Router} />
        <Toaster />
      </ToolkitProvider>
    </>
  );
}

export default App;
