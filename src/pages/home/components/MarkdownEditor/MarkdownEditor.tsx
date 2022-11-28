import React, { useCallback, useEffect } from "react";
import { openFileSelector, readDir, readFile } from "../../../../utils/fs";
// Vditor
import Vditor from "vditor/src/index";
import "vditor/src/assets/less/index.less";

import "./MarkdownEditor.less";
import Sider from "./Sider/Sider";
import { globalEventBus, useStore } from "linyuan-storage";
import { globalData } from "../../store/store";
import rustEvent from "../../../../utils/rustEvent";
import LinYuanEditor from "../../../../components/LinYuanEditor/LinYuanEditor";

export default function MarkdownEditor() {
  const store = useStore((state: globalData) => {
    state.openningMarkdownFile;
  }) as globalData;
  // 初始化编辑器
  // 监听快捷键 -- 以及打开文件事件
  useEffect(() => {
    const cb1 = rustEvent.register("save", () => {
      console.log("[save]");
      // 获取编辑器中的文本值
      store.openningMarkdownFile?.writeContent(store.currentFileContent);
    });
    const cb2 = globalEventBus.register("openFile", () => {
      console.log(store.currentFileContent);
    });
    return () => {
      rustEvent.remove("save", cb1);
      globalEventBus.remove("openFile", cb2);
    };
  }, []);

  return (
    <div className="MarkdownEditor-container">
      <Sider></Sider>
      <LinYuanEditor></LinYuanEditor>
    </div>
  );
}

async function getVditor(params: IOptions): Promise<Vditor> {
  return new Promise((resolve) => {
    const vditor = new Vditor("vditor", {
      after: () => {
        resolve(vditor);
      },
      ...params,
    });
  });
}
