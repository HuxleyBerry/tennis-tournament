import CustomButton from "@/components/CustomButton";
import MatchListing from "@/components/MatchListing";
import { useTeamStore } from "@/stores.tsx/teams";
import { useTournamentStore } from "@/stores.tsx/tournament";
import { Match, MatchDisplay, PriorityQueueEntry } from "@/types.ts/teams";
import FastPriorityQueue from "fastpriorityqueue";
import { customComparator } from "@/utils/matchmaking";

export default function Matches() {
  const tournamentStore = useTournamentStore();
  const teamStore = useTeamStore();

  function handleTournamentStart() {
    tournamentStore.currentMatches = [];
    tournamentStore.queue = new FastPriorityQueue<PriorityQueueEntry>(
      customComparator
    );
    const avaliableTeams = teamStore.teamsInfo.filter(
      (teamInfo) => teamInfo.status === "Present"
    );
    for (
      let i = 0;
      i < avaliableTeams.length - (avaliableTeams.length % 2);
      i += 2
    ) {
      tournamentStore.queue.add(avaliableTeams[i]);
      tournamentStore.queue.add(avaliableTeams[i + 1]);
    }
    tournamentStore.setTournamentStarted(true);
    createMatches();
  }

  function createMatches() {
    if (tournamentStore.queue) {
      const matchesCopy = [...tournamentStore.currentMatches];
      while (matchesCopy.length < tournamentStore.courtsAvaliable) {
        const team1 = tournamentStore.queue.poll();
        const team2 = tournamentStore.queue.poll();
        if (team1 === undefined || team2 === undefined) {
          // nothing left in queue
          break;
        }
        matchesCopy.push({
          team1: team1.team,
          team2: team2.team,
        });
      }
      tournamentStore.setMatches(matchesCopy);
    }
  }

  return (
    <div className="flex flex-col h-full items-center justify-center">
      {tournamentStore.tournamentStarted ? (
        <div className="lg:w-lg md:w-md w-sm flex flex-col justify-center items-center px-4">
          {tournamentStore.currentMatches.map((match, index) => (
            <MatchListing match={match} key={index} />
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
