import { TeamInfo } from "@/types.ts/teams";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface TeamStore {
  teamsInfo: TeamInfo[];
}

export const useTeamStore = create<TeamStore>()(
  persist(
    (set, get) => ({
      teamsInfo: [],
      addTeam: (newTeamInfo: TeamInfo) => {
        get().teamsInfo.push(newTeamInfo);
      },
    }),
    {
      name: "team-storage",
    }
  )
);
