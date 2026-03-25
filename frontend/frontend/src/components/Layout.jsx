import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({ children }) {
  return (
    <div className="flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-60 w-full">

        {/* Header */}
        <Header />

        {/* Page Content */}
        <div className="p-8 bg-gradient-to-br from-gray-100 to-blue-100 min-h-screen">
          {children}
        </div>

      </div>
    </div>
  );
}

export default Layout;