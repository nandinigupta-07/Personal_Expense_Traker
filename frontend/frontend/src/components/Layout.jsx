import { useState } from "react";
import Sidebar from "./navigation/Sidebar";
import Header from "./Header";

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden dark:bg-gray-950">

      {/* Sidebar - fixed left */}
      {sidebarOpen && <Sidebar />}

      {/* Right side - full height, scrollable */}
      <div className={`${sidebarOpen ? "ml-60" : "ml-0"} flex flex-col w-full transition-all duration-300`}>

        {/* Header - sticky top, never scrolls away */}
        <div className="sticky top-0 z-50">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>

        {/* Main content - only this part scrolls */}
        <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-black transition-all duration-300">
          {children}
        </div>

      </div>

    </div>
  );
}

export default Layout;
