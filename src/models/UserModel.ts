import { ObjectId, Filter } from 'mongodb';
import { BaseModel, BaseDocument } from './BaseModel';

export interface UserDocument extends BaseDocument {
  email: string;
  password?: string; // Hashed password
  firstName: string;
  lastName: string;
  role: 'admin' | 'contractor' | 'subcontractor';
  phone?: string;
  isActive: boolean;
  lastLogin?: Date;
  profileCompleted: boolean;
}

export class UserModel extends BaseModel<UserDocument> {
  constructor() {
    super('users');
  }

  public async findByEmail(email: string): Promise<UserDocument | null> {
    return this.findOne({ email } as Filter<UserDocument>);
  }

  public async findByRole(role: UserDocument['role']): Promise<UserDocument[]> {
    return this.find({ role } as Filter<UserDocument>);
  }

  public async updateLastLogin(userId: string | ObjectId): Promise<boolean> {
    const id = userId instanceof ObjectId ? userId.toString() : userId;
    return this.updateById(id, { $set: { lastLogin: new Date() } });
  }

  public async markProfileCompleted(userId: string | ObjectId): Promise<boolean> {
    const id = userId instanceof ObjectId ? userId.toString() : userId;
    return this.updateById(id, { $set: { profileCompleted: true } });
  }

  public async deactivateUser(userId: string | ObjectId): Promise<boolean> {
    const id = userId instanceof ObjectId ? userId.toString() : userId;
    return this.updateById(id, { $set: { isActive: false } });
  }

  public async activateUser(userId: string | ObjectId): Promise<boolean> {
    const id = userId instanceof ObjectId ? userId.toString() : userId;
    return this.updateById(id, { $set: { isActive: true } });
  }
}

export default new UserModel();
