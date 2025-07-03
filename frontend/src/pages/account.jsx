import React from "react";
import { Link } from "react-router-dom";
import Sidebar from '../partials/SideBar';
import Header from "../partials/Header";

function Account() {
  return (
    <div className="flex h-[100dvh] overflow-hidden bg-white dark:bg-gray-900">
      {/* Sidebar - Manteniendo tu estructura base */}
      <Sidebar sidebarOpen={false} setSidebarOpen={() => {}} variant="v2" />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={false} setSidebarOpen={() => {}} variant="v3" />
        
      </div>
    </div>
  );
}

export default Account;