export interface Team {
  name1: string;
  name2: string;
}

export interface TeamInfo {
  team: Team;
  status: "Present" | "Absent";
  points: number;
  gamesPlayed: number;
  timeOfLastGame: number | null;
}

export interface Match {
  team1: number;
  team2: number;
}

export interface MatchDisplay {
  team1: Team;
  team2: Team;
}

export interface PriorityQueueEntry {
  team: Team;
  gamesPlayed: number;
  timeOfLastGame: number | null;
}
