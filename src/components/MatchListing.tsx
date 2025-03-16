import { Match } from "@/types.ts/teams";
import CustomButton from "./CustomButton";

interface Props {
  match: Match;
  handleCompletion: (teamIndexes: number[]) => void;
}

export default function MatchListing({ match, handleCompletion }: Props) {
  return (
    <div className="grid grid-cols-12 h-20 border-2 border-gray-600 items-center px-1 self-stretch">
      <div className="col-span-4">
        <p>{match.team1.names.name1}</p>
        <p>{match.team1.names.name2}</p>
      </div>
      <div className="col-span-1">vs</div>
      <div className="col-span-4">
        <p>{match.team2.names.name1}</p>
        <p>{match.team2.names.name2}</p>
      </div>
      <div className="col-span-3">
        <div className=" w-fit justify-self-end">
          <p className="text-red-500 text-center block">15:00</p>
          <CustomButton
            styleOption="primary"
            onClick={() =>
              handleCompletion([match.team1.index, match.team2.index])
            }
          >
            Complete
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
