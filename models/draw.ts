export interface DrawItem {
  knrbid: string;
  teamname: string;
  fieldnameshort: string;
  fieldnameshortsub: string;
  clubname: string;
  clubnameshort: string;
  slotid: string;
  raceid: string;
  tossorder: number;
  backnumber: number;
  comments: string | null;
  rower8: string | null;
  coachnames: string | null;
}

export interface DrawGet {
  error: boolean;
  message: string;
  setting: Record<string, unknown>;
  teams: DrawItem[];
}
