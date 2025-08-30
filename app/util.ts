import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { ConstraintId, Team } from "./interfaces";

export const combineClasses = (
  ...classes: (string | null | undefined | false)[]
) => classes.filter(Boolean).join(" ");

export const convertDbTeamDocToClientTeam = (
  doc: QueryDocumentSnapshot<DocumentData, DocumentData>
) => {
  const data = doc.data();
  const teamData = {
    ...data,
    constraints: data["constraints"].map((placedConstraint: any) => ({
      ...placedConstraint,
      timestamp: placedConstraint["timestamp"].toDate(),
    })),
  };
  return teamData as Team;
};

export const countTeamsWithConstraintId = (
  teamsData: Team[],
  constrantId: ConstraintId
) =>
  teamsData
    .map(
      (team) =>
        (team.constraints.find(
          (placedConstraint) => placedConstraint.constraintId === constrantId
        )
          ? 1
          : 0) as number
    )
    .reduce((acc, cur) => acc + cur, 0);

export const constraintsSetByThisTeam = (teamsData: Team[], teamId: string) =>
  teamsData
    .map((team) =>
      team.constraints.filter(
        (constraint) => constraint.placedByTeamId === teamId
      )
    )
    .reduce((acc, curr) => [...acc, ...curr], []);

export const formatTime = (time: Date) =>
  time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
