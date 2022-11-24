import React from "react";
import { Path } from "../../../../../../utils/fs";
import PathItem from "../PathItem/PathItem";
import "./PathTree.less";

export default function PathTree(props: any) {
  const pathList = props.pathList as Array<Path>;
  const depth = props.depth as number;
  return (
    <div className="path-list-container">
      {pathList.map((path) => (
        <PathItem path={path} key={path.path} depth={depth}></PathItem>
      ))}
    </div>
  );
}
