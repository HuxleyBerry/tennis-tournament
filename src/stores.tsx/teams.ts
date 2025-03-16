import { TeamInfo } from "@/types.ts/teams";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface TeamStore {
  addTeam: (newTeamInfo: TeamInfo) => void;
  modifyPresence: (index: number, newPresence: "Present" | "Absent") => void;
  teamMatchComplete: (index: number) => TeamInfo;
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
        teamMatchComplete: (index: number) => {
          const oldInfo = get().teamsInfo[index];
          const newInfo = {
            ...oldInfo,
            gamesPlayed: oldInfo.gamesPlayed + 1,
            timeOfLastGame: Date.now(),
          };
          get().teamsInfo[index] = newInfo;
          return newInfo;
        },
      }),
      {
        name: "team-storage",
      }
    )
  )
);
