import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface TournamentStore {
  tournamentStarted: boolean;
  startTournament: () => void;
  endTournament: () => void;
}

export const useTournamentStore = create<TournamentStore>()(
  devtools(
    persist(
      (set, get) => ({
        tournamentStarted: false,
        startTournament: () => set((state) => ({ tournamentStarted: true })),
        endTournament: () => set((state) => ({ tournamentStarted: false })),
      }),
      {
        name: "tournament-storage",
      }
    )
  )
);
