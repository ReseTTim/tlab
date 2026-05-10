import { describe, expect, test, vi } from 'vitest';
import storageHelper from './localStorageHelper';

const localStore = new storageHelper();

describe("storageHelper", () => {
  it('Stores data locally and be able to collect', () => {

    const testData = {
      id: 1,
      name: 'The Rookie'
    }
    localStore.set('test', testData);

    const data = localStore.get('test');
    expect(data).toStrictEqual(testData);
  });

  it('Stores data with a ttl and be able to collect', async () => {
    const testData = {
      id: 2,
      name: 'The Junior'
    }; 
    const ttl =  1000 * 5;
    localStore.setWithExpiry('test', testData, ttl);

    await pause(1000);
    
    const data = localStore.get('test');
    expect(data).toStrictEqual(testData);
  });

  it('Removed stored data, because ttl is expired', async () => {
    const testData = {
      id: 2,
      name: 'The Junior'
    }; 
    const ttl = 500;
    localStore.setWithExpiry('test', testData, ttl);

    await pause(1000);
    
    const data = localStore.get('test');
    expect(data).toBe(null);
  });
})
