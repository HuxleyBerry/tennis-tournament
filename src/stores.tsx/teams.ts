import { TeamInfo } from "@/types.ts/teams";
import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

interface TeamStore {
  addTeam: (newTeamInfo: TeamInfo) => void;
  modifyPresence: (index: number, newPresence: "Present" | "Absent") => void;
  teamsInfo: TeamInfo[];
}

export const useTeamStore = create<TeamStore>()(
  devtools(
    persist(
      (set, get) => ({
        teamsInfo: [],
        addTeam: (newTeamInfo: TeamInfo) => {
          set((state) => {
            const newTeamsInfo = [...state.teamsInfo, newTeamInfo];
            return { teamsInfo: newTeamsInfo };
          });
        },
        modifyPresence: (index: number, newPresence: "Present" | "Absent") => {
          set((state) => {
            const newTeamsInfo = [...state.teamsInfo];
            newTeamsInfo[index].status = newPresence;
            return { teamsInfo: newTeamsInfo };
          });
        },
      }),
      {
        name: "team-storage",
      }
    )
  )
);
