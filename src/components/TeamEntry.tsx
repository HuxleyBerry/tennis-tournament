import { MouseEventHandler, useState } from "react";
import CustomButton from "./CustomButton";

interface Props {
  handleClose: MouseEventHandler<HTMLButtonElement>;
  handleSave: (name1: string, name2: string) => void;
}

export default function TeamEntry({ handleSave, handleClose }: Props) {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");

  return (
    <>
      <p className="mb-2 text-center">New Team</p>
      <div className="flex mb-2 w-full">
        <input
          placeholder="Name 1"
          className="grow mr-2 border border-gray-600 pl-1 rounded-sm"
          onInput={(e: React.FormEvent<HTMLInputElement>) =>
            setName1(e.currentTarget.value)
          }
        />
        <div className="w-20 flex justify-end">
          <CustomButton
            styleOption="primary"
            onClick={() => handleSave(name1, name2)}
          >
            Save
          </CustomButton>
        </div>
      </div>
      <div className="flex w-full">
        <input
          placeholder="Name 1"
          className="grow mr-2 border border-gray-600 pl-1 rounded-sm"
          onInput={(e: React.FormEvent<HTMLInputElement>) =>
            setName2(e.currentTarget.value)
          }
        />
        <div className="w-20">
          <CustomButton styleOption="secondary" onClick={handleClose}>
            Cancel
          </CustomButton>
        </div>
      </div>
    </>
  );
}
