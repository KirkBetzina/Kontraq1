import { Collection, ObjectId, Filter, UpdateFilter, FindOptions } from 'mongodb';
import MongoDBClient from '../lib/mongodb';

export interface BaseDocument {
  _id?: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class BaseModel<T extends BaseDocument> {
  protected collection: Collection<T>;
  protected collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
    const mongoClient = MongoDBClient.getInstance();
    this.collection = mongoClient.getCollection<T>(collectionName);
  }

  public async findById(id: string): Promise<T | null> {
    try {
      return await this.collection.findOne({ _id: new ObjectId(id) } as Filter<T>);
    } catch (error) {
      console.error(`Error finding document by ID in ${this.collectionName}:`, error);
      throw error;
    }
  }

  public async findOne(filter: Filter<T>): Promise<T | null> {
    try {
      return await this.collection.findOne(filter);
    } catch (error) {
      console.error(`Error finding document in ${this.collectionName}:`, error);
      throw error;
    }
  }

  public async find(filter: Filter<T> = {}, options?: FindOptions): Promise<T[]> {
    try {
      return await this.collection.find(filter, options).toArray();
    } catch (error) {
      console.error(`Error finding documents in ${this.collectionName}:`, error);
      throw error;
    }
  }

  public async create(data: Omit<T, '_id'>): Promise<T> {
    try {
      const now = new Date();
      const documentToInsert = {
        ...data,
        createdAt: now,
        updatedAt: now
      } as T;

      const result = await this.collection.insertOne(documentToInsert);
      return { ...documentToInsert, _id: result.insertedId };
    } catch (error) {
      console.error(`Error creating document in ${this.collectionName}:`, error);
      throw error;
    }
  }

  public async updateById(id: string, update: UpdateFilter<T>): Promise<boolean> {
    try {
      const updateData = { $set: { ...update.$set, updatedAt: new Date() } };
      const result = await this.collection.updateOne(
        { _id: new ObjectId(id) } as Filter<T>,
        updateData
      );
      return result.modifiedCount > 0;
    } catch (error) {
      console.error(`Error updating document in ${this.collectionName}:`, error);
      throw error;
    }
  }

  public async deleteById(id: string): Promise<boolean> {
    try {
      const result = await this.collection.deleteOne({ _id: new ObjectId(id) } as Filter<T>);
      return result.deletedCount > 0;
    } catch (error) {
      console.error(`Error deleting document in ${this.collectionName}:`, error);
      throw error;
    }
  }

  public async count(filter: Filter<T> = {}): Promise<number> {
    try {
      return await this.collection.countDocuments(filter);
    } catch (error) {
      console.error(`Error counting documents in ${this.collectionName}:`, error);
      throw error;
    }
  }
}
