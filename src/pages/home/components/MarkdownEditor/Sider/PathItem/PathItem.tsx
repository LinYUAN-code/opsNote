import React, { useCallback, useState } from "react";
import "./PathItem.less";
import FolderIcon from "@mui/icons-material/Folder";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Path } from "../../../../../../utils/fs";
import PathTree from "../PathTree/PathTree";
import { globalEventBus, useStore } from "linyuan-storage";
import { globalData } from "../../../../store/store";

export default function PathItem(props: any) {
  const path = props.path as Path;
  const depth = props.depth as number; //文件层级深度
  const [pathList, setPathList] = useState<Array<Path>>([]);
  const store = useStore((state: globalData) => {
    state.currentFileContent;
    state.openningMarkdownFile;
  }) as globalData;
  const handleClick = useCallback(async () => {
    if (path.isDir && !path.isEmptyDir) {
      if (pathList.length) {
        setPathList([]);
        return;
      }
      const res = await path.readDir(true);
      setPathList(res);
    } else if (!path.isDir) {
      const res = await path.readContent();
      store.openningMarkdownFile = path;
      store.currentFileContent = res;
      globalEventBus.emit("openFile");
    }
  }, [pathList, setPathList, path]);
  return (
    <>
      <div
        className={`path-item-container ${
          store.openningMarkdownFile === path ? "selected" : ""
        }`}
        onClick={handleClick}
        style={{
          paddingLeft: `calc(${depth}*var(--depth-padding))`,
        }}
      >
        <div className="icon">
          {path.isDir ? (
            <>
              {path.isEmptyDir ? (
                <div className="icon-placeholder"></div>
              ) : pathList.length ? (
                <ArrowDropDownIcon
                  fontSize="small"
                  className="arrow-icon"
                ></ArrowDropDownIcon>
              ) : (
                <ArrowRightIcon
                  fontSize="small"
                  className="arrow-icon"
                ></ArrowRightIcon>
              )}
              <FolderIcon className="folder-icon"></FolderIcon>
            </>
          ) : (
            <>
              <div className="icon-placeholder"></div>
              <TextSnippetIcon className="markdown-icon"></TextSnippetIcon>
            </>
          )}
        </div>
        <div className="file-name">{path.fileName}</div>
      </div>
      {pathList.length ? (
        <PathTree pathList={pathList} depth={depth + 1}></PathTree>
      ) : (
        <></>
      )}
    </>
  );
}
