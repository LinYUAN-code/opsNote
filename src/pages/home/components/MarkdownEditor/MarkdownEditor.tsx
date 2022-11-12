import React from "react";
import { openFileSelector, readDir, readFile } from "../../../../utils/fs";
// Vditor
import Vditor from "vditor";
import "vditor/dist/index.css";

import "./MarkdownEditor.less";
import Sider from "./Sider/Sider";

export default function MarkdownEditor() {
  const [vd, setVd] = React.useState<Vditor>();
  React.useEffect(() => {
    const vditor = new Vditor("vditor", {
      after: () => {
        vditor.setValue("`Vditor` 最小代码示例");
        setVd(vditor);
      },
    });
  }, []);
  return (
    <div className="MarkdownEditor-container">
      <Sider></Sider>

      <div id="vditor" className="vditor" />
    </div>
  );
}
