class RustEventBus {
  public cbMap: Record<string, Array<() => void>>;
  constructor() {
    (window as any).handleRustEvent = (eventName: string) => {
      this.emit(eventName);
    };
    this.cbMap = {};
  }
  emit(eventName: string) {
    for (let cb of this.cbMap[eventName]) {
      cb();
    }
  }
  register(eventName: string, cb: () => void): () => void {
    if (!this.cbMap[eventName]) {
      this.cbMap[eventName] = [];
    }
    this.cbMap[eventName].push(cb);
    return cb;
  }
  remove(eventName: string, cb: () => void) {
    const pos = this.cbMap[eventName].indexOf(cb);
    if (pos === -1) return;
    this.cbMap[eventName].splice(pos, 1);
  }
}

export default new RustEventBus();
