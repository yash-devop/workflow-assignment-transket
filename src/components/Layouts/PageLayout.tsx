import { Outlet } from "react-router";

export const PageLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar here if .... */}
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};
