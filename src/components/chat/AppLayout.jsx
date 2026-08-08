import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/chat/Sidebar";
import TopBar from "@/components/chat/TopBar";
import PageTransition from "@/components/chat/PageTransition";

export default function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-slate-100 flex">
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen((v) => !v)} />
      <div className="flex flex-1 flex-col overflow-hidden min-w-0 h-full">
        <TopBar onMenuClick={() => setSidebarOpen((v) => !v)} />
        <main className="relative flex-1 overflow-y-auto min-h-0 min-w-0">
          <PageTransition>{children || <Outlet />}</PageTransition>
        </main>
      </div>
    </div>
  );
}
