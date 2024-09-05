#!/usr/bin/env node
const redis = require('redis');
const { promisify } = require('util');

class RadisClient {
  constructor() {
    this.client = redis
      .createClient()
      .on('error', (err) => {
        console.error(`Redis client not connected to the server: ${err.message}`);
      })
      .on('connect', () => {
        console.log('Redis client connected to the server');
      });

    this.client.getAsync = promisify(this.client.get).bind(this.client);
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return this.client.getAsync(key).then((res) => res);
  }

  async set(key, value, duration) {
    await this.client.set(key, value);
    await this.client.expire(key, duration);
  }

  async del(key) {
    const data = await this.get(key);
    if (!data) {
      throw new Error(`${key}: not found`);
    }
    return this.client.del(key);
  }
}

const redisClient = new RadisClient();

export default redisClient;
