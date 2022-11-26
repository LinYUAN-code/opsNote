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
