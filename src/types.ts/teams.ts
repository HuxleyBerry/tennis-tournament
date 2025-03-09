export interface Team {
  name1: string;
  name2: string;
}

export interface TeamInfo {
  team: Team;
  status: "Present" | "Absent";
  points: number;
}
