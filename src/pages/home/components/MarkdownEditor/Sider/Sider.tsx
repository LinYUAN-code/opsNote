import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Sider.less";
import Button from "@mui/material/Button";
import { openFileSelector, Path, readDir } from "../../../../../utils/fs";
import PathItem from "./PathItem/PathItem";
import PathTree from "./PathTree/PathTree";
import { Dragger } from "../../../../../utils/utils";

export default function Sider() {
  const [currentFolderPath, setCcurrentFolderPath] = useState<string>("");
  const [pathList, setPathList] = useState<Array<Path>>([]);
  const handleOpenFolder = useCallback(async () => {
    let folderPath = (await openFileSelector({
      isSelectDirector: true,
    })) as string;
    console.log(folderPath);
    if (!folderPath) {
      // 用户没有选择
      return;
    }
    setCcurrentFolderPath(folderPath);
    console.log("select path:", folderPath);
    let paths = await readDir(folderPath, true);
    console.log("readDir:", paths);
    setPathList(paths);
  }, []);

  // resize-bar
  const [width, setWidth] = useState(150);
  const handleAddSize = useCallback(
    (d: number) => {
      setWidth(width + d);
    },
    [width]
  );
  const dragger = useRef<Dragger>(new Dragger());
  dragger.current.setCb(handleAddSize);

  return (
    <div
      className="sider-container"
      style={{
        width: `${width}px`,
      }}
    >
      {!currentFolderPath ? (
        <div className="open-folder-container">
          <div className="info-text">Open File Folder</div>
          <Button variant="contained" size="small" onClick={handleOpenFolder}>
            Open Folder
          </Button>
        </div>
      ) : (
        <PathTree pathList={pathList} depth={0}></PathTree>
      )}
      <div
        className="pull-bar"
        onMouseDown={dragger.current.handleMouseDown}
      ></div>
    </div>
  );
}
