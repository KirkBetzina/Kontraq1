import { ObjectId, Filter } from 'mongodb';
import { BaseModel, BaseDocument } from './BaseModel';

export interface MessageDocument extends BaseDocument {
  senderId: ObjectId;
  recipientId: ObjectId;
  jobId?: ObjectId;
  content: string;
  read: boolean;
  readAt?: Date;
  attachments?: string[];
  messageType: 'text' | 'notification' | 'system';
}

export class MessageModel extends BaseModel<MessageDocument> {
  constructor() {
    super('messages');
  }

  public async findByUser(userId: string | ObjectId): Promise<MessageDocument[]> {
    const id = userId instanceof ObjectId ? userId : new ObjectId(userId);
    return this.find({
      $or: [
        { senderId: id },
        { recipientId: id }
      ]
    } as Filter<MessageDocument>);
  }

  public async findConversation(
    user1Id: string | ObjectId,
    user2Id: string | ObjectId
  ): Promise<MessageDocument[]> {
    const id1 = user1Id instanceof ObjectId ? user1Id : new ObjectId(user1Id);
    const id2 = user2Id instanceof ObjectId ? user2Id : new ObjectId(user2Id);

    return this.find({
      $or: [
        { senderId: id1, recipientId: id2 },
        { senderId: id2, recipientId: id1 }
      ]
    } as Filter<MessageDocument>, { sort: { createdAt: 1 } });
  }

  public async findByJob(jobId: string | ObjectId): Promise<MessageDocument[]> {
    const id = jobId instanceof ObjectId ? jobId : new ObjectId(jobId);
    return this.find({ jobId: id } as Filter<MessageDocument>);
  }

  public async findUnreadMessages(userId: string | ObjectId): Promise<MessageDocument[]> {
    const id = userId instanceof ObjectId ? userId : new ObjectId(userId);
    return this.find({
      recipientId: id,
      read: false
    } as Filter<MessageDocument>);
  }

  public async markAsRead(messageId: string | ObjectId): Promise<boolean> {
    const id = messageId instanceof ObjectId ? messageId.toString() : messageId;
    return this.updateById(id, { $set: { read: true, readAt: new Date() } });
  }

  public async markAllAsRead(userId: string | ObjectId): Promise<boolean> {
    try {
      const id = userId instanceof ObjectId ? userId : new ObjectId(userId);
      const result = await this.collection.updateMany(
        { recipientId: id, read: false } as Filter<MessageDocument>,
        { $set: { read: true, readAt: new Date() } }
      );
      return result.modifiedCount > 0;
    } catch (error) {
      console.error('Error marking all messages as read:', error);
      throw error;
    }
  }
}

export default new MessageModel();
