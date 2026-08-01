import React, { useState } from "react";
import Sidebar from "@/components/chat/Sidebar";
import TopBar from "@/components/chat/TopBar";
import PageTransition from "@/components/chat/PageTransition";

export default function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen((v) => !v)} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar onMenuClick={() => setSidebarOpen((v) => !v)} />
        <main className="relative flex-1 overflow-hidden">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}
