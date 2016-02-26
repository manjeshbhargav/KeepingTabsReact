//
// Messaging API
//
class _Message {
  //
  // Attach chrome message listener and initialize
  // the callback queues based on the message type
  //
  constructor () {
    this.listeners = {};
    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
      if (this.listeners.hasOwnProperty(msg['type'])) {
        this.listeners[msg['type']].forEach(callback => {
          callback(msg['data'], sendResponse);
        });
      }
      return true;
    });
  }
  //
  // Send a message of a particular type with
  // optional data and callback
  //
  send (type: string, ...rest) {
    let data = typeof(rest[0]) != 'function' ? rest[0] : {},
        callback = typeof(rest[0]) == 'function' ? rest[0] : rest[1];

    callback = typeof(callback) == 'function' ? callback : (() => {});
    chrome.runtime.sendMessage({ type, data }, callback);
  }
  //
  // Listen for a particular type of message and an
  // optional response function
  //
  listen (type: string, callback: Function) {
    callback = callback || (() => {});
    if (!this.listeners.hasOwnProperty(type)) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(callback);
  }
}

export default new _Message();
