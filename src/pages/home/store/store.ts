import { initStoreDeep } from "linyuan-storage";
import { Path } from "../../../utils/fs";
export interface globalData {
  currentFileContent: string;
  openningMarkdownFile?: Path;
}

const initialData: globalData = {
  currentFileContent: "## 输入内容",
};

initStoreDeep(initialData);
