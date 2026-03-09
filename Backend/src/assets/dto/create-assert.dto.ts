export class CreateAssetDto {
 name: string;
 type: string;
 serialNumber: string;
 assignedTo?: string;
 status?: string;
 count?: number;
}