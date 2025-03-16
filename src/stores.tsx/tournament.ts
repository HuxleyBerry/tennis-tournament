import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import FastPriorityQueue from "fastpriorityqueue";
import { MatchDisplay, PriorityQueueEntry, Team } from "@/types.ts/teams";

interface TournamentStore {
  tournamentStarted: boolean;
  courtsAvaliable: number;
  queue: FastPriorityQueue<PriorityQueueEntry> | null;
  currentMatches: MatchDisplay[];
  setTournamentStarted: (isTournamentOngoing: boolean) => void;
  setMatches: (newMatches: MatchDisplay[]) => void;
}

export const useTournamentStore = create<TournamentStore>()(
  devtools(
    persist(
      (set, get) => ({
        tournamentStarted: false,
        courtsAvaliable: 8,
        currentMatches: [],
        queue: null,
        setTournamentStarted: (isTournamentOngoing: boolean) =>
          set((state) => ({ tournamentStarted: isTournamentOngoing })),
        setMatches: (newMatches: MatchDisplay[]) =>
          set(() => ({ currentMatches: newMatches })),
      }),
      {
        name: "tournament-storage",
      }
    )
  )
);
