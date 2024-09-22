import React from "react";
import Sidebar from "../layout/Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminPage() {
  return (
    <div className="flex relative overflow-x-hidden">
      <div className="min-w-[250px] w-[250px]">
        <Sidebar />
      </div>
      <Outlet />
    </div>
  );
}
