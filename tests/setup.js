import '@testing-library/jest-dom';

global.localStorage = {
  store: {},

  getItem(key) {
    return this.store[key] || null
  },

  setItem(key, value) {
    this.store[key] = String(value)
  },

  clear() {
    this.store = {}
  },
}

global.pause = async (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}