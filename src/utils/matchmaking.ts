import { PriorityQueueEntry } from "@/types.ts/teams";

function shuffleArray(array: Array<any>) {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function customComparator(
  entry1: PriorityQueueEntry,
  entry2: PriorityQueueEntry
) {
  return (
    entry1.gamesPlayed < entry2.gamesPlayed ||
    (entry1.gamesPlayed === entry2.gamesPlayed &&
      (entry1.timeOfLastGame === null ||
        (entry2.timeOfLastGame !== null &&
          entry1.timeOfLastGame < entry2.timeOfLastGame)))
  );
}
