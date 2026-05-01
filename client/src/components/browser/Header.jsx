import React from "react";
import AddressBar from "./menu/AddressBar";
import BackButton from "./menu/BackButton";
import ForwardButton from "./menu/ForwardButton";
import RefreshButton from "./menu/RefreshButton";
import Options from "./menu/Options";
import TabsBar from "./TabsBar";
import MenuBar from "./menu/MenuBar";

const Header = () => {
  return (
    <div className="w-full flex flex-col h-fit">
      <TabsBar />
      <MenuBar/>
    </div>
  );
};

export default Header;
