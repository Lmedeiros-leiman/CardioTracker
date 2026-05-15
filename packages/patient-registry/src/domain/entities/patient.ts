/*
Patient
id: PatientId
name: PatientName
birthDate: BirthDate
contactInfo: ContactInfo
status: PatientStatus
createdAt
updatedAt
*/

import type { PatientId } from "../value-objects/patient-id";


export class Patient {
  public constructor(
    public readonly PatientId: PatientId,
    
  ) {}
}
