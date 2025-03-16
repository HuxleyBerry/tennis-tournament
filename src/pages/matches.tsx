import CustomButton from "@/components/CustomButton";
import { useTournamentStore } from "@/stores.tsx/tournament";

export default function Matches() {
  const tournamentStore = useTournamentStore();
  return (
    <div className="flex h-full items-center justify-center">
      {tournamentStore.tournamentStarted ? (
        <p>Hi</p>
      ) : (
        <CustomButton
          styleOption="primary"
          onClick={() => tournamentStore.startTournament()}
        >
          Start Tournament!
        </CustomButton>
      )}
    </div>
  );
}
