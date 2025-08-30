import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { ConstraintId, ItemId, Team } from "./interfaces";

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
