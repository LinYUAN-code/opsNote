import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React, { useState } from "react";
import "./Header.less";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function Header() {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleMouseDown = (e: any) => {
    const m_window = (window as any).__TAURI__?.window.getCurrent();
    m_window.startDragging();
    e.preventDefault();
  };
  return (
    <div className="Header-container" onMouseDown={handleMouseDown}>
      <BottomNavigation
        showLabels
        value={selectedTab}
        onChange={(event, newValue) => {
          console.log(event, newValue);
          setSelectedTab(newValue);
        }}
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </div>
  );
}
