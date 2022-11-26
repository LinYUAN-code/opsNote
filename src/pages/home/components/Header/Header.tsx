import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Header.less";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { platform } from "@tauri-apps/api/os";
import { getPlatform } from "../../../../utils/utils";
import { useStore } from "linyuan-storage";
import { globalData } from "../../store/store";
import { Platform } from "../../../../utils/const";
import WindowController from "./components/WindowController/WindowController";

export default function Header() {
  const store = useStore() as globalData;

  const [selectedTab, setSelectedTab] = useState(0);
  const handleMouseDown = (e: any) => {
    if (e.target.dataset.action === "dragging") {
      const m_window = (window as any).__TAURI__?.window.getCurrent();
      m_window.startDragging();
      e.preventDefault();
    }
  };

  // MAC 上使用系统的交通灯 windows上前端进行模拟
  useEffect(() => {
    (async () => {
      store.platform = await getPlatform();
    })();
    return () => {};
  }, []);

  return (
    <div className="Header-container" onMouseDown={handleMouseDown}>
      <BottomNavigation
        showLabels
        data-action="dragging"
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
      {store.platform === Platform.Window ? (
        <WindowController></WindowController>
      ) : (
        <></>
      )}
    </div>
  );
}
