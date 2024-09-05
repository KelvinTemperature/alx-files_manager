#!/usr/bin/env node
import { createClient } from 'redis';

class RadisClient {
  
    constructor() {
      const client = createClient();
      client.on('error', err => {
        console.log('Redis client not connected to the server:', err.toString());
      });

      client.on('connect', () => {
        console.log('Redis client connected to the server');
      });
    };

    isAlive() {
      return this.client.connected;
    };

    async get(key) {
      return await this.client.get(key);
    };

    async set(key, value, duration) {
      await this.client.set(key, value);
      await this.client.expire(key, duration);
    };

    async del(key) {
      const data = await this.get(key);
      if (!data) {
        throw new Error(`${key}: not found`);
      };
      return this.client.del(key);
    };
}

const redisClient = new RadisClient();

export default redisClient;
