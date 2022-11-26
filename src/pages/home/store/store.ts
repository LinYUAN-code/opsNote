import {
  getStore,
  initLogLevel,
  initStoreDeep,
  useStore,
} from "linyuan-storage";
import { Platform } from "../../../utils/const";
import { Path } from "../../../utils/fs";
import { getPlatform as getPlatformUtil } from "../../../utils/utils";

export interface globalData {
  currentFileContent: string;
  openningMarkdownFile?: Path;
  platform?: Platform;
  getPlatform: () => Promise<Platform>;
}

const promiseLib: any = {};
const initialData: globalData = {
  currentFileContent: "## 输入内容",
  getPlatform: async () => {
    if (initialData.platform) return initialData.platform;
    if (promiseLib.getPlatform) return await promiseLib.getPlatform;
    promiseLib.getPlatform = getPlatformUtil();
    const store = getStore();
    store.platform = await promiseLib.getPlatform;
    return initialData.platform;
  },
};

initStoreDeep(initialData);
