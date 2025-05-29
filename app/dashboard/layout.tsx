import React from "react";
import SideNav from "./_components/SideNav";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="container">
        <SideNav />
        <div className="ml-64">{children}</div>
      </div>
    </div>
  );
}

export default layout;
