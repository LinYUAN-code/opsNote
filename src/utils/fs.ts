import { invoke } from "@tauri-apps/api/tauri";
import { readTextFile, BaseDirectory } from "@tauri-apps/api/fs";
import { open } from "@tauri-apps/api/dialog";
import { desktopDir } from "@tauri-apps/api/path";
import { path } from "@tauri-apps/api";

interface openFileSelectorConfig {
  isSelectDirector?: boolean;
  allowsFileType?: Array<string>; //["md","cpp"]
  allowMultiple?: boolean;
}

/*
    let folderPath = (await openFileSelector({
      allowMultiple: true,
      allowsFileType: ["md", "js", "..."],
    })) as Array<string>;

    let folderPath = (await openFileSelector({
      isSelectDirector: true,
    })) as string;
*/

export async function openFileSelector(
  config: openFileSelectorConfig
): Promise<Array<string> | string | null> {
  const filters = !config.allowsFileType
    ? []
    : config.allowsFileType.map((v) => {
        return {
          name: v,
          extensions: [v],
        };
      });
  const selected = await open({
    directory: !!config.isSelectDirector,
    multiple: !!config.allowMultiple,
    filters,
    defaultPath: await desktopDir(),
  });
  return selected;
  // let list = (await invoke("open_file_selector", {
  //   isDirectoryMode: !!config.isSelectDirector,
  //   allowSelectMultipleFiles: !!config.allowMultiple,
  //   allowsFileType: config.allowsFileType ? config.allowsFileType : [],
  // })) as Array<string>;
  // if (config.allowMultiple) {
  //   return list;
  // } else {
  //   return list[0];
  // }
}

export function readFile(path: string): Promise<string> {
  return invoke("read_file", { path });
}

export async function readDir(
  path: string,
  needInit: boolean = false
): Promise<Array<Path>> {
  const res = (await invoke("read_dir", { path })) as any;
  const pathList = res
    .map((s: string) => new Path(s))
    .filter((path: Path) => path.isDir || path.fileExtension == "md");
  if (needInit) {
    const waitList = pathList.map((path: Path) => path.init());
    await Promise.all(waitList);
  }
  return pathList;
}

export class Path {
  public isDir: boolean;
  public path: string;
  public isEmptyDir: boolean | undefined;
  public _contentCache: string | undefined;
  private _fileName: string | undefined;
  private _fileExtension: string | undefined;
  constructor(s: string) {
    this.isDir = s[0] === "0";
    this.path = this.isDir ? s.slice(1) : s;

    let tmp = this.path.split(".");
    this._fileExtension = tmp[tmp.length - 1];
    tmp = this.path.split(path.sep);
    this._fileName = tmp[tmp.length - 1];
  }
  async init(): Promise<void> {
    if (this.isDir) {
      const dirs = await this.readDir(false);
      this.isEmptyDir = !dirs.length;
    }
    return;
  }
  get fileName() {
    return this._fileName;
  }
  get fileExtension() {
    return this._fileExtension;
  }
  async readContent(): Promise<string> {
    if (this.isDir) {
      throw new Error("cant read content with directory");
    }
    let content = await readFile(this.path);
    this._contentCache = content;
    return this._contentCache;
  }
  async writeContent(content: string): Promise<string> {
    if (this.isDir) {
      throw new Error("cant read content with directory");
    }
    this._contentCache = content;
    try {
      const res = (await invoke("write_file", {
        path: this.path,
        content,
      })) as any;
      return "ok";
    } catch (e: any) {
      return e;
    }
  }
  async readDir(needInit: boolean = false): Promise<Array<Path>> {
    if (!this.isDir) {
      throw new Error("cant read dir with file");
    }
    return await readDir(this.path, needInit);
  }
}
