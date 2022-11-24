export interface Club {
  clubid: string;
  clubname: string;
  clubshort: string;
  numberofteams: number;
}

export interface ClubGet {
  clubs: Club[];
  error: boolean;
  message: string;
}
