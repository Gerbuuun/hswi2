export interface Time {
  alteredTime: number;
  backnumber: string;
  bonussecond: string;
  comments: string;
  disqualified: number;
  excluded: number;
  knrbid: string;
  rank: number;
  round: string;
  splash1: number;
  splash2: number;
  splash3: number;
  splash4: number;
  status: string;
  subRank: number;
  times: SubTime[];
  totaltime: number;
}

export interface SubTime {
  alteredTime: number;
  distance: string;
  equal_time_correction: string;
  name: string;
  time: number;
  type: string;
}
