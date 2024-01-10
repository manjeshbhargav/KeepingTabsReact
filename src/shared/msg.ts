class MsgEvent extends Event {
  callback: (data?: any) => void;
  data: any;

  constructor(type: string, data: any, callback: (data?: any) => void) {
    super(type);
    this.callback = callback;
    this.data = data;
  }
}

class Msg extends EventTarget {
  constructor() {
    super();

    chrome.runtime.onMessage.addListener(({ data, type }, sender, sendResponse) => {
      this.dispatchEvent(new MsgEvent(type, data, sendResponse));
      return true;
    });
  }

  addEventListener(type: string, callback: (event: MsgEvent) => void): void {
    return super.addEventListener(type, callback);
  }

  send(type: string, data: any = null, callback: (data?: any) => void = () => { }) {
    chrome.runtime.sendMessage({ data, type }, callback);
  }
}

export const msg = new Msg();
