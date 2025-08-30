import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import {
  ConstraintId,
  PlacedConstraint,
  ScavengerHuntItem,
  Team,
} from "./interfaces";
import { CONSTRAINTS, MAX_NUM_CONSTRAINTS } from "./config";

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

export const sortScavengerHuntItems = (
  itemA: ScavengerHuntItem,
  itemB: ScavengerHuntItem,
  constraintsFoundByThisTeam?: PlacedConstraint[]
) => {
  if (!constraintsFoundByThisTeam) {
    return 0;
  }
  const foundConstraintIds = constraintsFoundByThisTeam.map(
    (c) => c.constraintId
  );
  const foundItemA = foundConstraintIds.includes(itemA.constraintId);
  const foundItemB = foundConstraintIds.includes(itemB.constraintId);
  return +foundItemA - +foundItemB;
};

export const canApplyConstraint = (team: Team, constraintId: ConstraintId) => {
  const teamConstraintsData = team.constraints.map(
    (constraint) => CONSTRAINTS[constraint.constraintId]
  );
  if (teamConstraintsData.length >= MAX_NUM_CONSTRAINTS) {
    return [false, "they already have the maximum number of constraints"];
  } else if (
    teamConstraintsData.find(
      (teamConstraint) => teamConstraint.constraintId === constraintId
    )
  ) {
    return [false, "they already have this constraint"];
  } else if (
    teamConstraintsData.some(
      (constraint) =>
        constraint.incompatibleWith &&
        constraint.incompatibleWith.includes(constraintId)
    )
  ) {
    return [
      false,
      "they already have a constraint which is incompatible with this one",
    ];
  }
  return [true, null];
};

const compareTeamsByCanApply = (
  teamA: Team,
  teamB: Team,
  constraint: ConstraintId
) => {
  const canApplyToTeamA = canApplyConstraint(teamA, constraint);
  const canApplyToTeamB = canApplyConstraint(teamB, constraint);
  return +canApplyToTeamA - +canApplyToTeamB;
};

export const sortTeamsByCanApply = (teams: Team[], constraint: ConstraintId) =>
  teams.sort((teamA, teamB) =>
    compareTeamsByCanApply(teamA, teamB, constraint)
  );
