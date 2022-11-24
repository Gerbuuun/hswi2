export interface Field {
  blockid: string;
  blocknumber: number;
  category: string;
  daydate: string;
  field_id: string;
  field_starttime: null;
  fieldnameshort: string;
  isapproved: boolean;
  islight: boolean;
  isman: boolean;
  name: string;
  numberofrowers: number;
  numberofteams: number;
  slotid: string;
  startorder: null;
  starttime: string;
  status: string;
}

export interface GetFieldResponse {
  status: boolean;
  fields: Field[];
  message: string;
  name: string;
}
