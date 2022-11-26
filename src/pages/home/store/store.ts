import { initStoreDeep } from "linyuan-storage";
import { Platform } from "../../../utils/const";
import { Path } from "../../../utils/fs";
export interface globalData {
  currentFileContent: string;
  openningMarkdownFile?: Path;
  platform?: Platform;
}

const initialData: globalData = {
  currentFileContent: "## 输入内容",
  platform: Platform.UnKnow,
};

initStoreDeep(initialData);
