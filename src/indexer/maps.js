import { handleActionAsync, handleAction } from "../handlers";
const INDEX_TYPE = "mapIndex";
export default class mapsIndex {
  constructor(id) {
    this.instanceID = id;
  }

  async getKeys() {
    return await handleActionAsync(
      global.getIndexMMKV,
      INDEX_TYPE,
      this.instanceID
    );
  }

  hasKey(key) {
    let keys = handleAction(global.getIndexMMKV, INDEX_TYPE, this.instanceID);
    return keys.indexOf(key) > -1;
  }

  async getAll() {
    return new Promise((resolve) => {
      let keys = handleAction(global.getIndexMMKV, INDEX_TYPE, this.instanceID);
      let items = [];
      for (let i = 0; i < keys.length; i++) {
        let item = [];
        item[0] = keys[i];
        let map = global.getMapMMKV(keys[i], this.instanceID);
        item[1] = JSON.parse(map);
        items.push(item);
      }
      resolve(items);
    });
  }
}
