import { Team } from "@/types.ts/teams";
import CustomButton from "./CustomButton";
import { useTeamStore } from "@/stores.tsx/teams";

interface Props {
  team: Team;
  status: "Present" | "Absent";
  index: number;
}

export default function TeamListing({ team, status, index }: Props) {
  const teamStore = useTeamStore();
  function togglePresence() {
    teamStore.modifyPresence(index, status === "Absent" ? "Present" : "Absent");
  }

  return (
    <div className="flex justify-center h-20 border-2 border-gray-600 items-center px-1">
      <p className="mr-3">{index + 1}.</p>
      <div className="flex-grow">
        <p>{team.name1}</p>
        <p>{team.name2}</p>
      </div>
      <div>
        <p
          className={`text-center ${
            status === "Absent" ? "text-theme-red" : "text-green-500"
          }`}
        >
          {status}
        </p>
        <CustomButton
          styleOption={status === "Present" ? "primary" : "secondary"}
          onClick={togglePresence}
        >
          {status === "Present" ? "Mark Absent" : "Mark Present"}
        </CustomButton>
      </div>
    </div>
  );
}
