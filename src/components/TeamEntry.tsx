import { Team } from "@/types.ts/teams";

interface Props {
  team: Team;
  status: "Present" | "Absent";
  index: number;
}

export default function TeamEntry({ team, status, index }: Props) {
  return (
    <div className="flex justify-center h-20 border-2 border-black">
      <p>{index + 1}.</p>
      <div className="flex-grow">
        <p>{team.name1}</p>
        <p>{team.name2}</p>
      </div>
      <div>
        <p
          className={`text-center ${
            status === "Present" ? "text-theme-red" : "text-green-500"
          }`}
        ></p>
        <button
          className={status === "Present" ? "bg-theme-red" : "bg-green-500"}
        >
          {status === "Present" ? "Mark Absent" : "Mark Present"}
        </button>
      </div>
    </div>
  );
}
