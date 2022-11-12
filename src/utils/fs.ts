import { invoke } from "@tauri-apps/api/tauri";
import { readTextFile, BaseDirectory } from "@tauri-apps/api/fs";

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
): Promise<Array<string> | string> {
  let list = (await invoke("open_file_selector", {
    isDirectoryMode: !!config.isSelectDirector,
    allowSelectMultipleFiles: !!config.allowMultiple,
    allowsFileType: config.allowsFileType ? config.allowsFileType : [],
  })) as Array<string>;
  if (config.allowMultiple) {
    return list;
  } else {
    return list[0];
  }
}

export function readFile(path: string): Promise<string> {
  return invoke("read_file", { path });
}

export async function readDir(path: string): Promise<Array<Path>> {
  const res = (await invoke("read_dir", { path })) as any;
  return res.map((s: string) => new Path(s));
}

export class Path {
  public isDir: boolean;
  public path: string;
  constructor(s: string) {
    this.isDir = s[0] === "0";
    this.path = this.isDir ? s.slice(1) : s;
  }
  fileName(): string {
    return "hello";
  }
  async readContent(): Promise<string> {
    if (this.isDir) {
      throw new Error("cant read content with directory");
    }
    return await readFile(this.path);
  }
  async writeContent(content: string): Promise<string> {
    if (this.isDir) {
      throw new Error("cant read content with directory");
    }
    try {
      const res = (await invoke("read_dir", {
        path: this.path,
        content,
      })) as any;
      return "ok";
    } catch (e: any) {
      return e;
    }
  }
  async readDir(): Promise<Array<Path>> {
    if (!this.isDir) {
      throw new Error("cant read dir with file");
    }
    return readDir(this.path);
  }
}
