import { ObjectId, Filter } from 'mongodb';
import { BaseModel, BaseDocument } from './BaseModel';

export interface JobDocument extends BaseDocument {
  title: string;
  description: string;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  contractorId: ObjectId;
  subcontractorId?: ObjectId;
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  specialties: string[];
  startDate?: Date;
  endDate?: Date;
  budget?: number;
  priority: 'low' | 'medium' | 'high';
  notes?: string;
  attachments?: string[];
}

export class JobModel extends BaseModel<JobDocument> {
  constructor() {
    super('jobs');
  }

  public async findByContractor(contractorId: string | ObjectId): Promise<JobDocument[]> {
    const id = contractorId instanceof ObjectId ? contractorId : new ObjectId(contractorId);
    return this.find({ contractorId: id } as Filter<JobDocument>);
  }

  public async findBySubcontractor(subcontractorId: string | ObjectId): Promise<JobDocument[]> {
    const id = subcontractorId instanceof ObjectId ? subcontractorId : new ObjectId(subcontractorId);
    return this.find({ subcontractorId: id } as Filter<JobDocument>);
  }

  public async findByStatus(status: JobDocument['status']): Promise<JobDocument[]> {
    return this.find({ status } as Filter<JobDocument>);
  }

  public async findBySpecialties(specialties: string[]): Promise<JobDocument[]> {
    return this.find({ specialties: { $in: specialties } } as Filter<JobDocument>);
  }

  public async assignToSubcontractor(
    jobId: string | ObjectId,
    subcontractorId: string | ObjectId
  ): Promise<boolean> {
    const id = jobId instanceof ObjectId ? jobId.toString() : jobId;
    const subId = subcontractorId instanceof ObjectId 
      ? subcontractorId 
      : new ObjectId(subcontractorId);
    
    return this.updateById(id, { 
      $set: { 
        subcontractorId: subId,
        status: 'assigned' 
      } 
    });
  }

  public async updateStatus(
    jobId: string | ObjectId,
    status: JobDocument['status']
  ): Promise<boolean> {
    const id = jobId instanceof ObjectId ? jobId.toString() : jobId;
    return this.updateById(id, { $set: { status } });
  }
}

export default new JobModel();
