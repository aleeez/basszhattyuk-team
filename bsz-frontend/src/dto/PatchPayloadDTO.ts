export interface PatchPayloadDTO {
    op: 'replace';
    path: string;
    value: any;
  }