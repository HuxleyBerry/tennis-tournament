import CustomButton from "@/components/CustomButton";
import MatchListing from "@/components/MatchListing";
import { useTeamStore } from "@/stores.tsx/teams";
import { useTournamentStore } from "@/stores.tsx/tournament";
import { PriorityQueueEntry } from "@/types.ts/teams";
import { customComparator } from "@/utils/matchmaking";
import Heap from "heap-js";

export default function Matches() {
  const tournamentStore = useTournamentStore();
  const teamStore = useTeamStore();

  function handleTournamentStart() {
    tournamentStore.currentMatches = [];
    const newQueue: PriorityQueueEntry[] = [];
    teamStore.teamsInfo.forEach((teamInfo, index) => {
      newQueue.push({ ...teamInfo, teamIndex: index });
    });
    Heap.heapify(newQueue, customComparator);
    tournamentStore.queue = newQueue;
    tournamentStore.setTournamentStarted(true);
    createMatches();
  }

  function createMatches() {
    const matchesCopy = [...tournamentStore.getMatches()];
    while (matchesCopy.length < tournamentStore.courtsAvaliable) {
      const queue = tournamentStore.getQueue();
      const team1 = Heap.heappop(queue, customComparator);
      const team2 = Heap.heappop(queue, customComparator);
      if (team1 === undefined || team2 === undefined) {
        // nothing left in queue
        break;
      }
      matchesCopy.push({
        team1: { index: team1.teamIndex, names: team1.team },
        team2: { index: team2.teamIndex, names: team2.team },
      });
    }
    tournamentStore.setMatches(matchesCopy);
  }

  function handleCompletion(matchIndex: number, teamIndexes: number[]) {
    tournamentStore.setMatches(
      tournamentStore.getMatches().filter((_, index) => index !== matchIndex)
    );
    const queue = tournamentStore.getQueue();
    teamIndexes.forEach((teamIndex) => {
      const newTeamInfo = teamStore.teamMatchComplete(teamIndex);
      Heap.heappush(queue, { teamIndex, ...newTeamInfo }, customComparator);
    });
    console.log(tournamentStore.getQueue(), tournamentStore.getQueue()[0]);
    createMatches();
  }

  return (
    <div className="flex flex-col h-full items-center justify-center">
      {tournamentStore.tournamentStarted ? (
        <div className="lg:w-lg md:w-md w-sm flex flex-col justify-center items-center px-4">
          {tournamentStore.currentMatches.map((match, index) => (
            <MatchListing
              match={match}
              key={index}
              handleCompletion={(teamIndexes) =>
                handleCompletion(index, teamIndexes)
              }
            />
          ))}
          <div className="h-2" />
          <CustomButton
            styleOption="secondary"
            onClick={() => tournamentStore.setTournamentStarted(false)}
          >
            End Tournament
          </CustomButton>
        </div>
      ) : (
        <CustomButton
          styleOption="primary"
          onClick={() => handleTournamentStart()}
        >
          Start Tournament!
        </CustomButton>
      )}
    </div>
  );
}
