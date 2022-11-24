export interface Regatta {
  rid: string;
  regattaname: string;
  shortname: string;
  jaar: Date;
}

export interface GetRegattasResponse {
  error: string;
  regattas: Regatta[];
}
