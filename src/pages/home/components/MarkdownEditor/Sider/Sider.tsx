import React, { useCallback } from "react";
import "./Sider.less";
import Button from "@mui/material/Button";
import { openFileSelector, readDir } from "../../../../../utils/fs";

export default function Sider() {
  const handleOpenFolder = async () => {
    let folderPath = (await openFileSelector({
      // isSelectDirector: true,
      allowMultiple: true,
      allowsFileType: ["md", "js"],
    })) as string;
    console.log(folderPath);
    let res = await readDir(folderPath);
    console.log("readDir:", res);
  };
  return (
    <div>
      <div>
        <div>Open File Folder</div>
        <Button variant="contained" onClick={handleOpenFolder}>
          Open Folder
        </Button>
      </div>
    </div>
  );
}
