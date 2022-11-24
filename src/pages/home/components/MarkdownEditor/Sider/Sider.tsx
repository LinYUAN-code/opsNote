import React, { useCallback, useState } from "react";
import "./Sider.less";
import Button from "@mui/material/Button";
import { openFileSelector, Path, readDir } from "../../../../../utils/fs";
import PathItem from "./PathItem/PathItem";
import PathTree from "./PathTree/PathTree";

export default function Sider() {
  const [currentFolderPath, setCcurrentFolderPath] = useState<string>("");
  const [pathList, setPathList] = useState<Array<Path>>([]);
  const handleOpenFolder = useCallback(async () => {
    let folderPath = (await openFileSelector({
      isSelectDirector: true,
    })) as string;
    setCcurrentFolderPath(folderPath);
    console.log("select path:", folderPath);
    let paths = await readDir(folderPath, true);
    console.log("readDir:", paths);
    setPathList(paths);
  }, []);
  return (
    <div className="sider-container">
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
    </div>
  );
}
