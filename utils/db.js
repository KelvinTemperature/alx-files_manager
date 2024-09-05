#!/usr/bin/env node
const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || '27017';
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}`;

    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.client.connect();
    this.db = this.client.db(database);
  }

  isAlive() {
    return this.client.isConnected();
  }

  async isAliveWithTimeout(timeout = 2000) {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        console.error('MongoDB ping timed out');
        resolve(false);
      }, timeout);

      this.client
        .db()
        .admin()
        .ping()
        .then(() => {
          clearTimeout(timer);
          resolve(true);
        })
        .catch((error) => {
          clearTimeout(timer);
          console.error('MongoDB ping failed:', error.message);
          resolve(false);
        });
    });
  }

  async nbUsers() {
    return this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    return this.db.collection('files').countDocuments();
  }
}

const dbClient = new DBClient();

export default dbClient;
