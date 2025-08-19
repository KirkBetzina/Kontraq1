import { ObjectId, Filter } from 'mongodb';
import { BaseModel, BaseDocument } from './BaseModel';

export interface SubcontractorProfileDocument extends BaseDocument {
  userId: ObjectId;
  businessName?: string;
  specialties: string[];
  serviceAreas: string[]; // ZIP codes
  rating?: number;
  completedJobs: number;
  availability: boolean;
  insuranceVerified: boolean;
  licenseVerified: boolean;
  backgroundCheckPassed: boolean;
  hourlyRate?: number;
  bio?: string;
  profilePicture?: string;
  documents?: {
    type: 'insurance' | 'license' | 'certification' | 'background_check';
    url: string;
    verified: boolean;
    uploadDate: Date;
    expiryDate?: Date;
  }[];
}

export class SubcontractorProfileModel extends BaseModel<SubcontractorProfileDocument> {
  constructor() {
    super('subcontractor_profiles');
  }

  public async findByUserId(userId: string | ObjectId): Promise<SubcontractorProfileDocument | null> {
    const id = userId instanceof ObjectId ? userId : new ObjectId(userId);
    return this.findOne({ userId: id } as Filter<SubcontractorProfileDocument>);
  }

  public async findBySpecialties(specialties: string[]): Promise<SubcontractorProfileDocument[]> {
    return this.find({ specialties: { $in: specialties } } as Filter<SubcontractorProfileDocument>);
  }

  public async findByServiceArea(zipCode: string): Promise<SubcontractorProfileDocument[]> {
    return this.find({ serviceAreas: zipCode } as Filter<SubcontractorProfileDocument>);
  }

  public async findAvailable(): Promise<SubcontractorProfileDocument[]> {
    return this.find({ availability: true } as Filter<SubcontractorProfileDocument>);
  }

  public async findVerified(): Promise<SubcontractorProfileDocument[]> {
    return this.find({
      insuranceVerified: true,
      licenseVerified: true,
      backgroundCheckPassed: true
    } as Filter<SubcontractorProfileDocument>);
  }

  public async updateAvailability(
    profileId: string | ObjectId,
    availability: boolean
  ): Promise<boolean> {
    const id = profileId instanceof ObjectId ? profileId.toString() : profileId;
    return this.updateById(id, { $set: { availability } });
  }

  public async incrementCompletedJobs(profileId: string | ObjectId): Promise<boolean> {
    const id = profileId instanceof ObjectId ? profileId.toString() : profileId;
    return this.updateById(id, { $inc: { completedJobs: 1 } });
  }

  public async updateVerificationStatus(
    profileId: string | ObjectId,
    field: 'insuranceVerified' | 'licenseVerified' | 'backgroundCheckPassed',
    status: boolean
  ): Promise<boolean> {
    const id = profileId instanceof ObjectId ? profileId.toString() : profileId;
    return this.updateById(id, { $set: { [field]: status } });
  }
}

export default new SubcontractorProfileModel();
