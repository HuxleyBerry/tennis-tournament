import TeamEntry from "@/components/TeamEntry";
import { useTeamStore } from "@/stores.tsx/teams";

export default function Home() {
  const teamStore = useTeamStore();

  return (
    <>
      <p className="text-2xl text-center my-4">Manage Teams</p>
      <div>
        {teamStore.teamsInfo.map((teamInfo, index) => (
          <TeamEntry index={index} {...teamInfo} key={index} />
        ))}
      </div>
      <button>Add Team</button>
    </>
  );
}
