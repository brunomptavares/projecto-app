import axios from 'axios'

export default {
  storageAdaptor: localStorage,
  getItem: function(key) {
    var item = this.storageAdaptor.getItem(key);
    try {
      item = JSON.parse(item);
    } catch (e) {}
    return item;
  },
  storeItem: function(key, value) {
    this.storageAdaptor.setItem(key, JSON.stringify(value));
  },
  removeItem: function(key) {
    this.storageAdaptor.removeItem(key);
  },
  getToken() {
    return this.getItem('jwtToken')
  },
  getUserID() {
    return this.getItem('userID')
  },
  storeSession(token, userID) {
    this.storeItem('jwtToken', token)
    this.storeItem('userID', userID)
  },
  clearSession() {
    this.removeItem('jwtToken')
    this.removeItem('userID')
  }
}