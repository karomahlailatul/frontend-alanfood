import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./navbar";

const Layouts: FunctionComponent = () => {
  return (
    <>
      <main className="flex w-full flex-col justify-start overflow-y-auto bg-primary-background">
        <Navbar />
        <div className="h-full w-full overflow-y-auto ">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layouts;
