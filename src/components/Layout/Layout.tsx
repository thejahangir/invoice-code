import React from "react";

const Layout = ({ sidebar, header, children }) => {
  return (
    <div className="dashboard-container">
      {sidebar}
      <main className="main-content">
        {header}
        {children}
      </main>
    </div>
  );
};

export default Layout;
