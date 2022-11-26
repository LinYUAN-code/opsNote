import { type } from "@tauri-apps/api/os";
import { Platform } from "./const";

export async function getPlatform() {
  const osType = await type();
  switch (osType) {
    case "Windows_NT":
      return Platform.Window;
    case "Darwin":
      return Platform.Mac;
    default:
      return Platform.UnKnow;
  }
}

export class Dragger {
  private isSelected: boolean;
  private preX: number;
  private cb: (_arg0: number) => void;
  private cursorBack = "normal";
  constructor() {
    this.isSelected = false;
    this.preX = 0;
    this.cb = () => {};
  }
  setCb(cb: (_arg0: number) => void) {
    this.cb = cb;
  }
  public handleMouseDown = (e: any) => {
    const body = document.getElementsByTagName("body")[0];
    this.cursorBack = body.style.cursor;
    body.style.cursor = "w-resize";
    this.isSelected = true;
    this.preX = e.screenX;
    document.addEventListener("mousemove", this.handleMove);
    document.addEventListener("mouseup", this.handleMoveUp);
  };
  public handleMove = (e: any) => {
    if (!this.isSelected) return;
    const d = e.screenX - this.preX;
    this.preX = e.screenX;
    this.cb(d);
  };
  public handleMoveUp = (e: any) => {
    this.isSelected = false;
    const body = document.getElementsByTagName("body")[0];
    body.style.cursor = this.cursorBack;
    document.removeEventListener("mousemove", this.handleMove);
    document.removeEventListener("mouseup", this.handleMoveUp);
  };
}
