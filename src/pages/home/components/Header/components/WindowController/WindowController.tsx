import React, { useCallback, useEffect, useState } from "react";
import "./WindowController.less";
import {
  appWindow,
  currentMonitor,
  LogicalSize,
  PhysicalSize,
} from "@tauri-apps/api/window";
export default function WindowController() {
  const handleMinimize = useCallback(() => {
    appWindow.minimize();
  }, []);
  const handleMaximize = useCallback(() => {
    appWindow.toggleMaximize();
    appWindow.isFullscreen();
  }, []);
  const handleClose = useCallback(() => {
    appWindow.close();
  }, []);
  const [isMax, setIsMax] = useState(false);
  useEffect(() => {
    let listener: Function | null = null;
    (async () => {
      const isMaxReq = await appWindow.isMaximized();
      setIsMax(isMaxReq);
      listener = await appWindow.listen("tauri://resize", async (e: any) => {
        const isMaxReq = await appWindow.isMaximized();
        const width = e.payload.width;
        const height = e.payload.height;
        if (isMaxReq) {
          setIsMax(true);
        } else if (isMax) {
          setIsMax(false);
          // 强制修改大小 否则webview感知不到大小变化
          await appWindow.setSize(new PhysicalSize(width, height - 1));
        }
      });
    })();
    return () => {
      listener && listener();
    };
  }, [isMax]);
  return (
    <div className="window-controller">
      <div className="button" data-action="minimize" onClick={handleMinimize}>
        <Minimize></Minimize>
      </div>
      <div className="button" data-action="maximize" onClick={handleMaximize}>
        {isMax ? <Unmaximize></Unmaximize> : <Maximize></Maximize>}
      </div>
      <div
        className="button red-hover"
        data-action="close"
        onClick={handleClose}
      >
        <Close></Close>
      </div>
    </div>
  );
}

const Minimize = () => (
  <svg viewBox="0 0 10.2 1" fill="currentColor" className="icon">
    <rect x="0" y="50%" width="10.2" height="1" />
  </svg>
);
const Maximize = () => (
  <svg viewBox="0 0 10 10" fill="currentColor" className="icon">
    <path d="M0,0v10h10V0H0z M9,9H1V1h8V9z" />
  </svg>
);
const Unmaximize = () => (
  <svg viewBox="0 0 10.2 10.1" fill="currentColor" className="icon">
    <path d="M2.1,0v2H0v8.1h8.2v-2h2V0H2.1z M7.2,9.2H1.1V3h6.1V9.2z M9.2,7.1h-1V2H3.1V1h6.1V7.1z" />
  </svg>
);
const Close = () => (
  <svg viewBox="0 0 10 10" fill="currentColor" className="icon">
    <polygon points="10.2,0.7 9.5,0 5.1,4.4 0.7,0 0,0.7 4.4,5.1 0,9.5 0.7,10.2 5.1,5.8 9.5,10.2 10.2,9.5 5.8,5.1" />
  </svg>
);
