import MongoDBClient, { MongoConfig } from '../lib/mongodb';
import UserModel from '../models/UserModel';
import JobModel from '../models/JobModel';
import SubcontractorProfileModel from '../models/SubcontractorProfileModel';
import MessageModel from '../models/MessageModel';

export class MongoDBService {
  private static instance: MongoDBService | null = null;
  private isInitialized: boolean = false;
  
  // Expose models
  public users = UserModel;
  public jobs = JobModel;
  public subcontractorProfiles = SubcontractorProfileModel;
  public messages = MessageModel;

  private constructor() {}

  public static getInstance(): MongoDBService {
    if (!MongoDBService.instance) {
      MongoDBService.instance = new MongoDBService();
    }
    return MongoDBService.instance;
  }

  public async initialize(config: MongoConfig): Promise<void> {
    if (this.isInitialized) return;

    try {
      const mongoClient = MongoDBClient.getInstance();
      await mongoClient.connect(config);
      this.isInitialized = true;
      console.log('MongoDB service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize MongoDB service:', error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.isInitialized) return;

    try {
      const mongoClient = MongoDBClient.getInstance();
      await mongoClient.disconnect();
      this.isInitialized = false;
      console.log('MongoDB service disconnected');
    } catch (error) {
      console.error('Failed to disconnect MongoDB service:', error);
      throw error;
    }
  }

  public isConnected(): boolean {
    return this.isInitialized;
  }
}

export default MongoDBService.getInstance();
