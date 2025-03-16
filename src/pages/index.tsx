import CustomButton from "@/components/CustomButton";
import TeamEntry from "@/components/TeamEntry";
import TeamListing from "@/components/TeamListing";
import { useTeamStore } from "@/stores.tsx/teams";
import { useState } from "react";

export default function Home() {
  const teamStore = useTeamStore();
  const [isAdding, setIsAdding] = useState<boolean>(false);

  function handleSave(name1: string, name2: string) {
    teamStore.addTeam({ team: { name1, name2 }, status: "Absent", points: 0 });
    setIsAdding(false);
  }

  function handleClose() {
    setIsAdding(false);
  }

  return (
    <>
      <p className="text-2xl text-center my-4">Manage Teams</p>
      <div className="mb-4">
        {teamStore.teamsInfo.map((teamInfo, index) => (
          <TeamListing index={index} {...teamInfo} key={index} />
        ))}
      </div>
      <div className="flex justify-center flex-col items-center">
        {isAdding ? (
          <TeamEntry handleSave={handleSave} handleClose={handleClose} />
        ) : (
          <CustomButton styleOption="primary" onClick={() => setIsAdding(true)}>
            Add Team!
          </CustomButton>
        )}
      </div>
    </>
  );
}
