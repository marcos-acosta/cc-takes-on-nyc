import { CONSTRAINTS } from "../config";
import { PlacedConstraint, Team } from "../interfaces";
import styles from "./../page.module.css";
import ConstraintInfo from "./ConstraintInfo";

interface PlacedConstraintsProps {
  teams: Team[];
  constraint: PlacedConstraint;
}

export default function PlacedConstraints(props: PlacedConstraintsProps) {
  const constraintData = CONSTRAINTS[props.constraint.constraintId];
  const castByTeam = props.teams.findLast(
    (team) => team.teamId === props.constraint.placedByTeamId
  );

  return (
    constraintData && (
      <div className={styles.constraint}>
        <ConstraintInfo constraint={constraintData} />
        {castByTeam && (
          <div className={styles.placedByContainer}>
            Cast by {castByTeam.teamName} at{" "}
            {props.constraint.timestamp.toLocaleTimeString()}
          </div>
        )}
      </div>
    )
  );
}
