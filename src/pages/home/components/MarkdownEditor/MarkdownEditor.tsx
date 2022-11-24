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

export default function MarkdownEditor() {
  const [vd, setVd] = React.useState<Vditor>();
  const store = useStore((state: globalData) => {
    state.openningMarkdownFile;
  }) as globalData;
  const initVditor = useCallback(async () => {
    const vditor = await getVditor({
      input: (value) => {
        store.currentFileContent = value;
      },
    });
    setVd(vditor);
    vditor.setValue(store.currentFileContent);
  }, []);
  React.useEffect(() => {
    initVditor();
  }, []);
  // 监听快捷键 -- 以及打开文件事件
  useEffect(() => {
    const cb1 = rustEvent.register("save", () => {
      store.currentFileContent = vd!.getValue();
      store.openningMarkdownFile?.writeContent(store.currentFileContent);
    });
    const cb2 = globalEventBus.register("openFile", () => {
      vd?.setValue(store.currentFileContent);
    });
    return () => {
      rustEvent.remove("save", cb1);
      globalEventBus.remove("openFile", cb2);
    };
  }, [vd]);

  return (
    <div className="MarkdownEditor-container">
      <Sider></Sider>
      <div id="vditor" className="vditor" />
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
