"use client";

import React from "react";
import { useSidebar } from "./SidePanel";

interface MainContentProps {
  children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  const { isCollapsed } = useSidebar();

  return (
    <div
      className={`
        h-screen transition-all duration-300 ease-in-out relative
        /* Default margin for mobile (always shows collapsed bar underneath or doesn't push content) */
        ml-16 
        /* Desktop margin adjustments based on sidebar state */
        ${isCollapsed ? "md:ml-16" : "md:ml-64"}
      `}
      style={{
        // Removed explicit width calculation to allow CSS/Tailwind to handle responsiveness naturally
        // width: `calc(100vw - ${isCollapsed ? "4rem" : "16rem"})`, 
      }}
    >
      {children}
    </div>
  );
};

export default MainContent;