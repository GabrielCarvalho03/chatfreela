import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <main className="flex-1">
      <Outlet />
    </main>
  );
};

export default DashboardLayout;
