// MongoDB client configuration
import { MongoClient, ServerApiVersion, Db, Collection } from 'mongodb';

// Types for MongoDB models
export interface MongoConfig {
  uri: string;
  dbName: string;
  options?: any;
}

class MongoDBClient {
  private client: MongoClient | null = null;
  private db: Db | null = null;
  private static instance: MongoDBClient | null = null;
  private isConnected: boolean = false;
  private config: MongoConfig | null = null;

  private constructor() {}

  public static getInstance(): MongoDBClient {
    if (!MongoDBClient.instance) {
      MongoDBClient.instance = new MongoDBClient();
    }
    return MongoDBClient.instance;
  }

  public async connect(config: MongoConfig): Promise<void> {
    if (this.isConnected) return;
    
    try {
      this.config = config;
      this.client = new MongoClient(config.uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
        ...config.options
      });
      
      await this.client.connect();
      this.db = this.client.db(config.dbName);
      this.isConnected = true;
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
  }

  public getCollection<T>(collectionName: string): Collection<T> {
    if (!this.db) {
      throw new Error('Database not connected. Call connect() first.');
    }
    return this.db.collection<T>(collectionName);
  }

  public async disconnect(): Promise<void> {
    if (this.client && this.isConnected) {
      await this.client.close();
      this.isConnected = false;
      this.db = null;
      console.log('Disconnected from MongoDB');
    }
  }

  public isConnectedToDb(): boolean {
    return this.isConnected;
  }

  public getDbName(): string | null {
    return this.config?.dbName || null;
  }
}

export default MongoDBClient;
