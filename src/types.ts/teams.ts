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
  team1: { index: number; names: Team };
  team2: { index: number; names: Team };
}

export interface PriorityQueueEntry {
  team: Team;
  teamIndex: number;
  gamesPlayed: number;
  timeOfLastGame: number | null;
}
