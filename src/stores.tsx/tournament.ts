import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { Match, PriorityQueueEntry, Team } from "@/types.ts/teams";

interface TournamentStore {
  tournamentStarted: boolean;
  courtsAvaliable: number;
  queue: PriorityQueueEntry[];
  currentMatches: Match[];
  getAvaliableCourtsCount: () => number;
  setTournamentStarted: (isTournamentOngoing: boolean) => void;
  setMatches: (newMatches: Match[]) => void;
  getMatches: () => Match[];
  getQueue: () => PriorityQueueEntry[];
  setQueue: (updatedQueue: PriorityQueueEntry[]) => void;
}

export const useTournamentStore = create<TournamentStore>()(
  devtools(
    persist(
      (set, get) => ({
        tournamentStarted: false,
        courtsAvaliable: 1,
        currentMatches: [],
        queue: [],
        getAvaliableCourtsCount: () => get().courtsAvaliable,
        setTournamentStarted: (isTournamentOngoing: boolean) =>
          set((state) => ({ tournamentStarted: isTournamentOngoing })),
        setMatches: (newMatches: Match[]) =>
          set(() => ({ currentMatches: newMatches })),
        getMatches: () => get().currentMatches,
        getQueue: () => get().queue,
        setQueue: (updatedQueue: PriorityQueueEntry[]) =>
          set({ queue: updatedQueue }),
      }),
      {
        name: "tournament-storage",
      }
    )
  )
);
