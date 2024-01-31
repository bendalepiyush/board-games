import React from "react";

import AccountGroupIcon from "../icons/account-group";
import HelpIcon from "../icons/help";
import KeyIcon from "../icons/key";
import DatabaseIcon from "../icons/database";
import VacationIcon from "../icons/vacation";
import AuctionIcon from "../icons/auction";
import DownTrendIcon from "../icons/down-trend";
import CashIcon from "../icons/cash";
import HouseIcon from "../icons/house";
import SyncIcon from "../icons/sync";

interface MdiIconProps {
  icon: string;
}

const MdiIcon: React.FC<MdiIconProps> = ({ icon }) => {
  switch (icon) {
    case "account-group":
      return <AccountGroupIcon />;

    case "key":
      return <KeyIcon />;

    case "database":
      return <DatabaseIcon />;

    case "vacation":
      return <VacationIcon />;

    case "auction":
      return <AuctionIcon />;

    case "down-trend":
      return <DownTrendIcon />;

    case "cash":
      return <CashIcon />;

    case "house":
      return <HouseIcon />;

    case "sync":
      return <SyncIcon />;

    default:
      return <HelpIcon />;
  }
};

export default MdiIcon;
