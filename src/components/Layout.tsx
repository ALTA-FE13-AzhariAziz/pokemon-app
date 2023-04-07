import { FC, ReactNode } from "react";

import "@/styles/fonts/ARCADECLASSIC.ttf";
import TopNavbar from "./TopNavbar";
import BottomNavbar from "./BottomNavbar";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = (props) => {
  return (
    <div className="bg-slate-900  flex justify-center main ">
      <div className=" transition-all  dark:bg-zinc-800 bg-slate-200 layout-container md:min-w-[480px] md:max-w-[480px]md:min-w-[480px] md:max-w-[480px]md:min-w-[480px] md:max-w-[480px] ">
        <TopNavbar />
        {props.children}
        <BottomNavbar />
      </div>
    </div>
  );
};

export default Layout;
