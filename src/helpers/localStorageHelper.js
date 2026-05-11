export default class storageHelper {
  /**
   * Sets a local storage value
   * @param {string} key 
   * @param {*} value 
   * @param {number} ttl 
   * @returns 
   */
  set (key, value) {
    if (!value) {
      return;
    }

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (_error) {
      // user doesn't need to know about this, just fail silently 
    }
  }

  /**
   * Sets a local storage value with ttl (ms) 
   * @param {string} key 
   * @param {*} value 
   * @param {number} ttl 
   * @returns 
   */
  setWithExpiry (key, value, ttl) {
    if (!value) {
      return;
    }

    const now = Date.now();
    const item = {
      value: value,
      expiry: now + ttl,
    };

    try {
      localStorage.setItem(key, JSON.stringify(item));
    } catch (_error) {
      // user doesn't need to know about this, just fail silently 
    }
  }

  /**
   * Determines if storedData is within ttl
   * @param {string} key 
   * @param {*} storedData 
   * @returns 
   */
  getWithExpiry (key, storedData) {
    try {
      const now = Date.now();

      if (now > storedData.expiry) {
        // stored data is expired, clear local storage and return empty
        localStorage.removeItem(key);
        return null;
      }

      // Returns the value without the ttl data
      return storedData.value;
    } catch (_error) {
      // user doesn't need to know about this, just fail silently 
      return null;
    }
  }

  /**
   * Get data based on key from local storage
   * @param {string} key 
   * @returns 
   */
  get (key) {
    try {
      const cached = localStorage.getItem(key);
      const storedData = cached ? JSON.parse(cached) : null;

      if (storedData.expiry) {
        return this.getWithExpiry(key, storedData);
      }

      return storedData;
    } catch (_error) {
      // user doesn't need to know about this, just fail silently 
      return null;
    }
  }

  /**
   * Clear any stored data based on key
   * @param {string} key 
   * @returns 
   */
  clear (key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (_error) {
      // user doesn't need to know about this, just fail silently 
    }
    
    return false;
  }
}